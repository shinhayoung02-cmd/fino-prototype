-- 후보 화면: 내가 분실자 쪽인지(is_lost_owner) 추가 — 분실자 목록은 이 값이 true인 행만
create or replace view public.match_items as
  select m.id as match_id, m.status,
         l.category as lost_category, l.name as lost_name, l.lost_from, l.lost_to, l.area as lost_area,
         f.category as found_category, f.name as found_name, f.description as found_description,
         f.found_at, f.area as found_area, f.custody,
         case when m.status in ('confirmed', 'returned') then f.address end as found_address,
         m.score, m.lost_item_id, m.found_item_id, m.created_at, m.reasons,
         m.lost_owner_id = auth.uid() as is_lost_owner
  from public.matches m
  join public.lost_items l on l.id = m.lost_item_id
  join public.found_items f on f.id = m.found_item_id
  where auth.uid() in (m.lost_owner_id, m.finder_id) and m.status <> 'dismissed';

-- 제외한 후보 수(분실자 본인)
create or replace function public.my_dismissed_count() returns int
language sql stable security definer set search_path = '' as $$
  select count(*)::int from public.matches where lost_owner_id = auth.uid() and status = 'dismissed';
$$;
revoke execute on function public.my_dismissed_count() from public, anon;
grant execute on function public.my_dismissed_count() to authenticated;
grant execute on function public.dismiss_match(uuid) to authenticated;
