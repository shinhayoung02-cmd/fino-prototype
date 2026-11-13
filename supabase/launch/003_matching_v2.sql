-- FINO 매칭 v2 (2026-11-14, 발표자료 6·11장 기준): 특징(브랜드·색상·형태·흠집) + 실제 거리(m) + 추천 근거 문장
-- 바뀐 점과 이유는 Obsidian 기획/매칭 기준.md 에 기록. 기준 변경은 사용자 확인 후에만(feedback_fino_matching_change_confirm).
--
-- 통과 조건(하나라도 어기면 0): 종류 같음 · 같은 시·도 · 분실 1일 전~14일 후 사이 습득 · 내 물건끼리 아님 · 브랜드가 둘 다 있으면 같아야 함
-- 점수(0~1, 0.4 이상 후보):
--   장소 .35  — 좌표 있으면 분실 반경 안 .35 / 반경 2배 안 .25 / 3km 안 .1, 좌표 없으면 같은 동 .35 / 같은 구 .15 / 모름 .1
--   시간 .2   — 하루 안 .2 / 14일 안 .1 / 모름 .05
--   특징 .3   — 브랜드 같음 .15 · 색상 같음 .1(다르면 -.1) · 형태 같음 .05 · 특징(흠집 등) 비슷함 최대 +.1
--   글자 .15  — 이름+설명 글자 유사도
alter table public.lost_items add column if not exists attrs jsonb;     -- { color, brand, material, form, features[] } (Gemini)
alter table public.found_items add column if not exists attrs jsonb;
alter table public.storage_items add column if not exists attrs jsonb;
alter table public.matches add column if not exists reasons jsonb not null default '[]';

-- 두 좌표 사이 거리(m), 하버사인
create or replace function public.distance_m(lat1 float8, lng1 float8, lat2 float8, lng2 float8) returns float8
language sql immutable set search_path = '' as $$
  select 2 * 6371000 * asin(sqrt(
    power(sin(radians(lat2 - lat1) / 2), 2) + cos(radians(lat1)) * cos(radians(lat2)) * power(sin(radians(lng2 - lng1) / 2), 2)))
$$;

-- '50분' / '3시간' / '2일'
create or replace function public.human_gap(i interval) returns text
language sql immutable set search_path = '' as $$
  select case
    when i < interval '1 hour' then greatest(1, floor(extract(epoch from i) / 60))::int || '분'
    when i < interval '1 day' then floor(extract(epoch from i) / 3600)::int || '시간'
    else floor(extract(epoch from i) / 86400)::int || '일' end
$$;

drop function if exists public.match_score(public.lost_items, public.found_items);

create or replace function public.match_eval(l public.lost_items, f public.found_items, out score real, out reasons jsonb)
language plpgsql stable set search_path = '' as $$
declare
  la jsonb := coalesce(l.attrs, '{}'); fa jsonb := coalesce(f.attrs, '{}');
  d float8; r float8; s float8 := 0; feat float8 := 0; fl text; ff text; best_feat text;
  out_reasons text[] := '{}';
begin
  score := 0; reasons := '[]';
  -- 통과 조건
  if l.category <> f.category or l.owner_id = f.finder_id then return; end if;
  if l.area is not null and f.area is not null and split_part(l.area, ' ', 1) <> split_part(f.area, ' ', 1) then return; end if;
  if l.lost_from is not null and f.found_at is not null
     and (f.found_at < l.lost_from - interval '1 day' or f.found_at > l.lost_from + interval '14 days') then return; end if;
  if la->>'brand' is not null and fa->>'brand' is not null and lower(la->>'brand') <> lower(fa->>'brand') then return; end if;

  -- 장소
  if l.lat is not null and f.lat is not null then
    d := public.distance_m(l.lat, l.lng, f.lat, f.lng);
    r := coalesce(l.radius_m, 500);
    if d <= r then s := s + .35; elsif d <= 2 * r then s := s + .25; elsif d <= 3000 then s := s + .1; end if;
    if d <= 3000 then out_reasons := out_reasons || ('예상 분실 장소 ' || (round(d / 10) * 10)::int || 'm 이내'); end if;
  elsif l.area is null or f.area is null then s := s + .1;
  elsif l.area = f.area then s := s + .35; out_reasons := out_reasons || ('같은 동네(' || split_part(l.area, ' ', 3) || ')');
  elsif split_part(l.area, ' ', 2) = split_part(f.area, ' ', 2) then s := s + .15; out_reasons := out_reasons || ('같은 구(' || split_part(l.area, ' ', 2) || ')');
  end if;

  -- 시간
  if l.lost_from is null or f.found_at is null then s := s + .05;
  else
    s := s + case when abs(extract(epoch from f.found_at - l.lost_from)) <= 86400 then .2 else .1 end;
    if f.found_at >= l.lost_from then out_reasons := out_reasons || ('분실 추정 후 ' || public.human_gap(f.found_at - l.lost_from) || ' 뒤 발견'); end if;
  end if;

  -- 특징
  if la->>'brand' is not null and fa->>'brand' is not null then s := s + .15; end if; -- 다르면 위에서 이미 제외
  if la->>'color' is not null and fa->>'color' is not null then
    s := s + case when la->>'color' = fa->>'color' then .1 else -.1 end;
  end if;
  if la->>'form' is not null and la->>'form' = fa->>'form' then s := s + .05; end if;
  if (la->>'brand' is not null and fa->>'brand' is not null) or (la->>'color' = fa->>'color') or (la->>'form' = fa->>'form') then
    out_reasons := array_prepend(
      concat_ws(' · ',
        case when la->>'brand' is not null and fa->>'brand' is not null then '동일 브랜드(' || (fa->>'brand') || ')' end,
        case when la->>'color' = fa->>'color' then '같은 색상(' || (fa->>'color') || ')' end,
        case when la->>'form' = fa->>'form' then '같은 형태(' || (fa->>'form') || ')' end),
      out_reasons);
  end if;
  -- 흠집·로고 같은 특징: 가장 비슷한 한 쌍
  for fl in select jsonb_array_elements_text(coalesce(la->'features', '[]')) loop
    for ff in select jsonb_array_elements_text(coalesce(fa->'features', '[]')) loop
      if extensions.similarity(fl, ff) > feat then feat := extensions.similarity(fl, ff); best_feat := ff; end if;
    end loop;
  end loop;
  if feat >= .3 then s := s + least(.1, feat * .15); out_reasons := out_reasons || ('특징 비슷함: ' || best_feat); end if;

  -- 글자
  s := s + .15 * extensions.similarity(coalesce(l.name, '') || ' ' || coalesce(l.description, ''),
                                       coalesce(f.name, '') || ' ' || coalesce(f.description, ''));

  score := greatest(0, least(1, s))::real;
  reasons := to_jsonb(out_reasons);
end $$;

create or replace function public.find_matches() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  if tg_table_name = 'lost_items' then
    insert into public.matches (lost_item_id, found_item_id, lost_owner_id, finder_id, score, reasons)
      select new.id, f.id, new.owner_id, f.finder_id, e.score, e.reasons
      from public.found_items f, lateral public.match_eval(new, f) e
      where f.status = 'open' and e.score >= 0.4
    on conflict (lost_item_id, found_item_id) do nothing;
  else
    insert into public.matches (lost_item_id, found_item_id, lost_owner_id, finder_id, score, reasons)
      select l.id, new.id, l.owner_id, new.finder_id, e.score, e.reasons
      from public.lost_items l, lateral public.match_eval(l, new) e
      where l.status = 'open' and e.score >= 0.4
    on conflict (lost_item_id, found_item_id) do nothing;
  end if;
  return new;
end $$;

-- 후보 화면용: 추천 근거 포함
create or replace view public.match_items as
  select m.id as match_id, m.status,
         l.category as lost_category, l.name as lost_name, l.lost_from, l.lost_to, l.area as lost_area,
         f.category as found_category, f.name as found_name, f.description as found_description,
         f.found_at, f.area as found_area, f.custody,
         case when m.status in ('confirmed', 'returned') then f.address end as found_address,
         m.score, m.lost_item_id, m.found_item_id, m.created_at, m.reasons
  from public.matches m
  join public.lost_items l on l.id = m.lost_item_id
  join public.found_items f on f.id = m.found_item_id
  where auth.uid() in (m.lost_owner_id, m.finder_id) and m.status <> 'dismissed';
