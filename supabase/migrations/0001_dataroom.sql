-- HeyMeister investor data room: schema, private storage bucket and locked-down access.
--
-- Run once in the Supabase SQL editor (Project → SQL Editor → New query → paste → Run).
--
-- Security model: Row Level Security is enabled on every table WITHOUT any policies, so the
-- browser (anon/publishable key) can read or write nothing. All reads and writes happen on the
-- server with the secret key after the app has checked the user's role and access rights.

-- Profiles: one row per auth user, with role and status.
create table if not exists public.dataroom_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  full_name text not null,
  company text,
  role text not null default 'investor' check (role in ('admin', 'investor')),
  active boolean not null default true,
  expires_at timestamptz,
  note text,
  created_at timestamptz not null default now(),
  last_login_at timestamptz
);

-- Documents stored in the private "dataroom" bucket.
create table if not exists public.dataroom_documents (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text not null default 'Sonstiges',
  storage_path text not null unique,
  file_name text not null,
  mime_type text not null,
  size_bytes bigint not null,
  -- 'all' = every active investor, 'selected' = only investors listed in dataroom_document_access
  visibility text not null default 'all' check (visibility in ('all', 'selected')),
  sort_order integer not null default 0,
  created_by uuid references public.dataroom_profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

-- Per-investor access for documents with visibility = 'selected'.
create table if not exists public.dataroom_document_access (
  document_id uuid not null references public.dataroom_documents (id) on delete cascade,
  profile_id uuid not null references public.dataroom_profiles (id) on delete cascade,
  primary key (document_id, profile_id)
);

-- Activity log (no IP addresses stored).
create table if not exists public.dataroom_events (
  id bigint generated always as identity primary key,
  profile_id uuid references public.dataroom_profiles (id) on delete set null,
  document_id uuid references public.dataroom_documents (id) on delete set null,
  action text not null check (action in ('login', 'view', 'download', 'upload', 'delete', 'invite', 'reset', 'block', 'unblock')),
  created_at timestamptz not null default now()
);

create index if not exists dataroom_events_created_at_idx on public.dataroom_events (created_at desc);
create index if not exists dataroom_events_profile_idx on public.dataroom_events (profile_id);

alter table public.dataroom_profiles enable row level security;
alter table public.dataroom_documents enable row level security;
alter table public.dataroom_document_access enable row level security;
alter table public.dataroom_events enable row level security;

-- Private bucket. Files are only reachable through short-lived signed URLs created by the server.
insert into storage.buckets (id, name, public, file_size_limit)
values ('dataroom', 'dataroom', false, 52428800) -- 50 MB, the Supabase free-plan maximum
on conflict (id) do update set public = false;
