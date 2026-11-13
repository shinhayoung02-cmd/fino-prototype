-- FINO 출시용 스키마 v1
-- 새 Supabase 프로젝트 SQL Editor에서 한 번 실행.
-- 원칙: 모든 테이블 RLS. 매칭·채점·감사 결제처럼 조작되면 안 되는 쓰기는
--       Edge Function(service_role)만 한다 → 해당 테이블엔 insert/update 정책을 두지 않는다.
-- 결정 (2026-11-13):
--   위치 공개 = 상대에겐 동네(area)까지만, 정확한 주소·좌표는 소유권 확인(confirmed) 뒤에만
--   보관 기간 = 반환 완료 6개월 뒤 물건·채팅·증빙 삭제, 통계(return_stats)만 남김
--   로그인 = 카카오 + 애플 + 구글 (Supabase Auth 대시보드에서 provider 설정, SQL 없음)

-- ───────── 계정 ─────────
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  nickname text not null,
  avatar_url text,
  region text,                         -- 대략 동네 (예: 서울 마포구)
  created_at timestamptz not null default now()
);

-- 가입하면 프로필 자동 생성 (카카오 nickname / 구글 name·picture / 애플 full_name)
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, nickname, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'name', new.raw_user_meta_data->>'nickname',
             new.raw_user_meta_data->>'full_name', '피노 사용자'),
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture')
  );
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

create table public.devices (
  token text primary key,              -- APNs/FCM 푸시 토큰
  user_id uuid not null default auth.uid() references auth.users on delete cascade,
  platform text not null check (platform in ('ios', 'android', 'web')),
  updated_at timestamptz not null default now()
);

-- ───────── 물건 ─────────
create table public.lost_items (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users on delete cascade,
  category text not null,
  name text not null,
  description text,
  private_features jsonb not null default '[]',   -- 비공개 특징 (본인만)
  lost_from timestamptz,
  lost_to timestamptz,
  lat double precision,
  lng double precision,
  radius_m int,
  area text,                           -- 동네 (예: 서울 마포구 서교동) — 상대에게 보이는 위치
  address text,                        -- 정확한 주소 — 본인, 확인 완료 뒤 상대만
  status text not null default 'open' check (status in ('open', 'matched', 'returned', 'closed')),
  created_at timestamptz not null default now()
);

create table public.found_items (
  id uuid primary key default gen_random_uuid(),
  finder_id uuid not null default auth.uid() references auth.users on delete cascade,
  category text not null,
  name text not null,
  description text,
  found_at timestamptz,
  lat double precision,
  lng double precision,
  area text,                           -- 동네 — 매칭 후보에게 보이는 위치
  address text,                        -- 정확한 주소 — 소유권 확인 뒤에만 공개
  custody text not null check (custody in ('keep', 'left', 'station')),  -- 보관 중 / 두고 옴 / 지구대 맡김
  lost112_number text,
  status text not null default 'open' check (status in ('open', 'matched', 'returned', 'closed')),
  created_at timestamptz not null default now()
);

create table public.storage_items (       -- 내 보관함 (사전 등록)
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users on delete cascade,
  category text not null,
  name text not null,
  description text,
  private_features jsonb not null default '[]',
  created_at timestamptz not null default now()
);

create table public.item_photos (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references auth.users on delete cascade,
  item_kind text not null check (item_kind in ('lost', 'found', 'storage')),
  item_id uuid not null,
  path text not null,                  -- Storage 'item-photos' 버킷 경로: {owner_id}/...
  created_at timestamptz not null default now()
);

-- ───────── 매칭과 소유권 확인 ─────────
create table public.matches (
  id uuid primary key default gen_random_uuid(),
  lost_item_id uuid not null references public.lost_items on delete cascade,
  found_item_id uuid not null references public.found_items on delete cascade,
  lost_owner_id uuid not null references auth.users on delete cascade,   -- RLS용 비정규화
  finder_id uuid not null references auth.users on delete cascade,
  score real,
  status text not null default 'candidate'
    check (status in ('candidate', 'dismissed', 'verifying', 'confirmed', 'returned')),
  returned_at timestamptz,             -- 반환 완료 시각 (6개월 보관 기준)
  created_at timestamptz not null default now(),
  unique (lost_item_id, found_item_id)
);

create function public.is_match_party(m uuid) returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.matches
    where id = m and auth.uid() in (lost_owner_id, finder_id)
  );
$$;

create table public.quizzes (            -- 습득자가 등록하는 퀴즈 (정답 포함 → 습득자만)
  found_item_id uuid primary key references public.found_items on delete cascade,
  finder_id uuid not null default auth.uid() references auth.users on delete cascade,
  questions jsonb not null,            -- [{ question, answer, feature }]
  created_at timestamptz not null default now()
);

create table public.quiz_attempts (      -- 분실자 답변 + AI 채점 (Edge Function이 기록)
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches on delete cascade,
  answers jsonb not null,
  score real,
  passed boolean,
  created_at timestamptz not null default now()
);

create table public.evidence (           -- 2차 증빙 (구매내역 사진 등)
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches on delete cascade,
  uploader_id uuid not null default auth.uid() references auth.users on delete cascade,
  path text not null,
  note text,
  created_at timestamptz not null default now()
);

-- ───────── 전달과 대화 ─────────
create table public.messages (           -- 채팅방 = 매칭 1건
  id bigint generated always as identity primary key,
  match_id uuid not null references public.matches on delete cascade,
  sender_id uuid not null default auth.uid() references auth.users on delete cascade,
  body text not null check (length(body) between 1 and 2000),
  created_at timestamptz not null default now()
);

create table public.handovers (
  match_id uuid primary key references public.matches on delete cascade,
  method text not null check (method in ('in_person', 'parcel', 'convenience')),  -- 대면 / 일반 택배 / 편의점 택배
  place text,
  scheduled_at timestamptz,
  address text,                        -- 택배 받을 주소 (두 사람만)
  tracking_number text,
  status text not null default 'planned' check (status in ('planned', 'sent', 'done', 'cancelled')),
  updated_at timestamptz not null default now()
);

create table public.thanks (             -- 사례 (결제 확인 후 Edge Function이 기록)
  id uuid primary key default gen_random_uuid(),
  match_id uuid not null references public.matches on delete cascade,
  kind text not null check (kind in ('coffee', 'gifticon', 'point')),
  amount int,
  status text not null default 'pending' check (status in ('pending', 'paid', 'sent', 'failed')),
  created_at timestamptz not null default now()
);

-- ───────── 운영 ─────────
create table public.reports (
  id uuid primary key default gen_random_uuid(),
  reporter_id uuid not null default auth.uid() references auth.users on delete cascade,
  target_user_id uuid references auth.users on delete set null,
  match_id uuid references public.matches on delete set null,
  reason text not null,
  created_at timestamptz not null default now()
);

create table public.blocks (
  blocker_id uuid not null default auth.uid() references auth.users on delete cascade,
  blocked_id uuid not null references auth.users on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blocker_id, blocked_id)
);

create table public.notifications (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users on delete cascade,
  type text not null,
  payload jsonb not null default '{}',
  read_at timestamptz,
  created_at timestamptz not null default now()
);

-- ───────── RLS ─────────
alter table public.profiles enable row level security;
alter table public.devices enable row level security;
alter table public.lost_items enable row level security;
alter table public.found_items enable row level security;
alter table public.storage_items enable row level security;
alter table public.item_photos enable row level security;
alter table public.matches enable row level security;
alter table public.quizzes enable row level security;
alter table public.quiz_attempts enable row level security;
alter table public.evidence enable row level security;
alter table public.messages enable row level security;
alter table public.handovers enable row level security;
alter table public.thanks enable row level security;
alter table public.reports enable row level security;
alter table public.blocks enable row level security;
alter table public.notifications enable row level security;

-- 프로필: 로그인한 사람은 닉네임·사진 조회, 수정은 본인만
create policy "read profiles" on public.profiles for select to authenticated using (true);
create policy "update own profile" on public.profiles for update to authenticated
  using (id = auth.uid()) with check (id = auth.uid());

-- 본인 소유 데이터: 전부 본인만
create policy "own devices" on public.devices for all to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own lost" on public.lost_items for all to authenticated
  using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "own found" on public.found_items for all to authenticated
  using (finder_id = auth.uid()) with check (finder_id = auth.uid());
create policy "own storage" on public.storage_items for all to authenticated
  using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "own photos" on public.item_photos for all to authenticated
  using (owner_id = auth.uid()) with check (owner_id = auth.uid());
create policy "own quiz" on public.quizzes for all to authenticated
  using (finder_id = auth.uid()) with check (finder_id = auth.uid());
create policy "own blocks" on public.blocks for all to authenticated
  using (blocker_id = auth.uid()) with check (blocker_id = auth.uid());
create policy "file report" on public.reports for insert to authenticated
  with check (reporter_id = auth.uid());
create policy "read own reports" on public.reports for select to authenticated
  using (reporter_id = auth.uid());
create policy "read own notifications" on public.notifications for select to authenticated
  using (user_id = auth.uid());
create policy "mark read" on public.notifications for update to authenticated
  using (user_id = auth.uid()) with check (user_id = auth.uid());

-- 매칭 당사자만 (쓰기는 Edge Function)
create policy "parties read match" on public.matches for select to authenticated
  using (auth.uid() in (lost_owner_id, finder_id));
create policy "parties read attempts" on public.quiz_attempts for select to authenticated
  using (public.is_match_party(match_id));
create policy "parties read thanks" on public.thanks for select to authenticated
  using (public.is_match_party(match_id));
create policy "parties evidence" on public.evidence for select to authenticated
  using (public.is_match_party(match_id));
create policy "upload evidence" on public.evidence for insert to authenticated
  with check (uploader_id = auth.uid() and public.is_match_party(match_id));
create policy "parties read messages" on public.messages for select to authenticated
  using (public.is_match_party(match_id));
create policy "parties send messages" on public.messages for insert to authenticated
  with check (
    sender_id = auth.uid()
    and exists (select 1 from public.matches m
                where m.id = match_id and auth.uid() in (m.lost_owner_id, m.finder_id)
                  and m.status in ('verifying', 'confirmed'))
  );
create policy "parties handover" on public.handovers for all to authenticated
  using (public.is_match_party(match_id)) with check (public.is_match_party(match_id));

-- 매칭된 분실자에게만 퀴즈 질문 공개 (정답 제외)
create view public.quiz_questions as
  select q.found_item_id, m.id as match_id,
         jsonb_path_query_array(q.questions, '$[*].question') as questions
  from public.quizzes q
  join public.matches m on m.found_item_id = q.found_item_id
  where m.lost_owner_id = auth.uid() and m.status = 'verifying';
grant select on public.quiz_questions to authenticated;

-- 매칭 상대 물건은 대략 정보만 (비공개 특징·좌표 제외, 위치는 동네까지)
-- 정확한 주소는 소유권 확인(confirmed) 뒤에만. 뷰는 소유자 권한으로 돌아 상대 행을 읽음 → where로 당사자만.
create view public.match_items as
  select m.id as match_id, m.status,
         l.category as lost_category, l.name as lost_name, l.lost_from, l.lost_to, l.area as lost_area,
         f.category as found_category, f.name as found_name, f.description as found_description,
         f.found_at, f.area as found_area, f.custody,
         case when m.status in ('confirmed', 'returned') then f.address end as found_address
  from public.matches m
  join public.lost_items l on l.id = m.lost_item_id
  join public.found_items f on f.id = m.found_item_id
  where auth.uid() in (m.lost_owner_id, m.finder_id) and m.status <> 'dismissed';
grant select on public.match_items to authenticated;

-- 실시간 채팅
alter publication supabase_realtime add table public.messages;

-- ───────── 사진 Storage ─────────
-- 비공개 버킷. 경로 첫 폴더 = 본인 uid
insert into storage.buckets (id, name, public) values ('item-photos', 'item-photos', false);
create policy "own photo files" on storage.objects for all to authenticated
  using (bucket_id = 'item-photos' and (storage.foldername(name))[1] = auth.uid()::text)
  with check (bucket_id = 'item-photos' and (storage.foldername(name))[1] = auth.uid()::text);

-- ───────── 보관 기간: 반환 6개월 뒤 삭제 ─────────
create table public.return_stats (       -- 개인정보 없는 통계만 남김
  id bigint generated always as identity primary key,
  category text not null,
  area text,
  days_to_return int,
  returned_at timestamptz not null
);
alter table public.return_stats enable row level security;   -- 정책 없음 = 운영자(service_role)만

create function public.purge_returned() returns void
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.return_stats (category, area, days_to_return, returned_at)
    select f.category, f.area, extract(day from m.returned_at - f.created_at)::int, m.returned_at
    from public.matches m join public.found_items f on f.id = m.found_item_id
    where m.status = 'returned' and m.returned_at < now() - interval '6 months';

  -- ponytail: 사진 파일은 SQL로 못 지움(Storage API 필요) → item_photos 행만 지움. 파일 삭제는 Edge Function 크론으로 추가
  delete from public.item_photos p using public.matches m
    where m.status = 'returned' and m.returned_at < now() - interval '6 months'
      and ((p.item_kind = 'lost' and p.item_id = m.lost_item_id) or (p.item_kind = 'found' and p.item_id = m.found_item_id));

  -- 물건을 지우면 matches → 채팅·퀴즈 답변·증빙·전달·사례가 cascade로 같이 지워짐
  delete from public.lost_items l using public.matches m
    where m.lost_item_id = l.id and m.status = 'returned' and m.returned_at < now() - interval '6 months';
  delete from public.found_items f
    where f.status = 'returned' and f.id not in (select found_item_id from public.matches);  -- 위에서 매칭이 지워져 남은 것
end $$;
revoke execute on function public.purge_returned() from public, anon, authenticated;

create extension if not exists pg_cron;
select cron.schedule('purge-returned', '0 4 * * *', 'select public.purge_returned()');  -- 매일 새벽 4시
