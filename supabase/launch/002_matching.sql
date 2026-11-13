-- FINO 매칭 v1 (2026-11-14): 물건이 등록되면 DB가 반대쪽 물건과 비교해 matches에 후보를 넣는다.
-- 점수(0~1, 0.4 이상만 후보): 종류 일치·같은 시도 필수 + 장소(같은 동 .4 / 같은 구 .2 / 모름 .1)
--   + 시간(분실 후 14일 내 습득 .3 / 모름 .1 / 분실 전 습득은 제외) + 설명 글자 유사도 × .3
-- ponytail: 좌표 없이 동 이름 비교 — 정확도 부족하면 lat/lng 받아서 거리로 교체
create extension if not exists pg_trgm with schema extensions;

create or replace function public.match_score(l public.lost_items, f public.found_items) returns real
language sql immutable set search_path = '' as $$
  select case
    when l.category <> f.category or l.owner_id = f.finder_id then 0
    -- 시·도가 다르면 제외(서울 지갑이 부산 습득물과 매칭되지 않게)
    when l.area is not null and f.area is not null and split_part(l.area, ' ', 1) <> split_part(f.area, ' ', 1) then 0
    when l.lost_from is not null and f.found_at is not null
         and (f.found_at < l.lost_from - interval '1 day' or f.found_at > l.lost_from + interval '14 days') then 0
    else
      (case
         when l.area is null or f.area is null then 0.1
         when l.area = f.area then 0.4
         when split_part(l.area, ' ', 1) = split_part(f.area, ' ', 1)
          and split_part(l.area, ' ', 2) = split_part(f.area, ' ', 2) then 0.2
         else 0 end)
      + (case when l.lost_from is null or f.found_at is null then 0.1 else 0.3 end)
      + 0.3 * extensions.similarity(coalesce(l.name, '') || ' ' || coalesce(l.description, ''),
                                    coalesce(f.name, '') || ' ' || coalesce(f.description, ''))
  end::real
$$;

create or replace function public.find_matches() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if tg_table_name = 'lost_items' then
    insert into public.matches (lost_item_id, found_item_id, lost_owner_id, finder_id, score)
      select new.id, f.id, new.owner_id, f.finder_id, public.match_score(new, f)
      from public.found_items f
      where f.status = 'open' and public.match_score(new, f) >= 0.4
    on conflict (lost_item_id, found_item_id) do nothing;
  else
    insert into public.matches (lost_item_id, found_item_id, lost_owner_id, finder_id, score)
      select l.id, new.id, l.owner_id, new.finder_id, public.match_score(l, new)
      from public.lost_items l
      where l.status = 'open' and public.match_score(l, new) >= 0.4
    on conflict (lost_item_id, found_item_id) do nothing;
  end if;
  return new;
end $$;

create trigger match_new_lost after insert on public.lost_items for each row execute function public.find_matches();
create trigger match_new_found after insert on public.found_items for each row execute function public.find_matches();

-- 후보 화면: 분실자는 매칭된 습득물 사진을 볼 수 있다(습득자는 분실물 사진 못 봄 — 비공개 특징 노출 방지)
create policy "lost owner sees matched found photos" on public.item_photos for select to authenticated
  using (item_kind = 'found' and exists (
    select 1 from public.matches m
    where m.found_item_id = item_photos.item_id and m.lost_owner_id = auth.uid() and m.status <> 'dismissed'));

create policy "lost owner reads matched found photo files" on storage.objects for select to authenticated
  using (bucket_id = 'item-photos' and exists (
    select 1 from public.item_photos p join public.matches m on m.found_item_id = p.item_id
    where p.item_kind = 'found' and p.path = storage.objects.name
      and m.lost_owner_id = auth.uid() and m.status <> 'dismissed'));

-- 분실자가 후보를 '내 물건 아니에요'로 넘기기 (그 외 상태 변경은 서버만)
create function public.dismiss_match(m uuid) returns void
language sql security definer set search_path = '' as $$
  update public.matches set status = 'dismissed'
  where id = m and lost_owner_id = auth.uid() and status = 'candidate';
$$;
revoke execute on function public.dismiss_match(uuid) from public, anon;

-- match_items 뷰에 점수 노출(후보 정렬용)
create or replace view public.match_items as
  select m.id as match_id, m.status,
         l.category as lost_category, l.name as lost_name, l.lost_from, l.lost_to, l.area as lost_area,
         f.category as found_category, f.name as found_name, f.description as found_description,
         f.found_at, f.area as found_area, f.custody,
         case when m.status in ('confirmed', 'returned') then f.address end as found_address,
         m.score, m.lost_item_id, m.found_item_id, m.created_at
  from public.matches m
  join public.lost_items l on l.id = m.lost_item_id
  join public.found_items f on f.id = m.found_item_id
  where auth.uid() in (m.lost_owner_id, m.finder_id) and m.status <> 'dismissed';
