-- FINO v2: 분실물/습득물 등록 저장용. Supabase SQL Editor에서 한 번 실행.
create table if not exists public.items (
  id bigint generated always as identity primary key,
  kind text not null check (kind in ('lost', 'found')),
  flow text,                 -- found: keep(보관 중) | left(두고 옴) | station(지구대 맡김)
  name text,
  description text,
  item_key text,
  time_range jsonb,
  location jsonb,
  extra jsonb,               -- featureAnswers, lost112Number 등
  created_at timestamptz not null default now()
);

alter table public.items enable row level security;

-- 데모용: 로그인 없이 누구나 등록/조회 가능
create policy "anon insert" on public.items for insert to anon with check (true);
create policy "anon select" on public.items for select to anon using (true);
