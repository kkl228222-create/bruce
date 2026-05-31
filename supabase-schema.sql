create table if not exists projects (
  id text primary key,
  name text not null,
  consultant text default '',
  designer text default '',
  engineer text default '',
  status text default '待確認',
  help text default '',
  archived boolean default false,
  updated_at timestamptz default now()
);

alter table projects add column if not exists consultant text default '';
alter table projects add column if not exists designer text default '';
alter table projects add column if not exists engineer text default '';

create table if not exists team_members (
  id text primary key,
  name text not null,
  role text default '',
  active boolean default true,
  updated_at timestamptz default now()
);

create table if not exists project_tasks (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  stage_id text not null,
  title text not null,
  done boolean default false,
  owner text default '',
  due_date date,
  note text default '',
  updated_at timestamptz default now()
);

create table if not exists documents (
  id text primary key,
  project_id text not null references projects(id) on delete cascade,
  name text not null,
  type text default '',
  url text default '',
  note text default '',
  updated_at timestamptz default now()
);

alter table projects enable row level security;
alter table team_members enable row level security;
alter table project_tasks enable row level security;
alter table documents enable row level security;

drop policy if exists "anon can read projects" on projects;
drop policy if exists "anon can write projects" on projects;
drop policy if exists "anon can read team members" on team_members;
drop policy if exists "anon can write team members" on team_members;
drop policy if exists "anon can read project tasks" on project_tasks;
drop policy if exists "anon can write project tasks" on project_tasks;
drop policy if exists "anon can read documents" on documents;
drop policy if exists "anon can write documents" on documents;

create policy "anon can read projects" on projects for select to anon using (true);
create policy "anon can write projects" on projects for all to anon using (true) with check (true);

create policy "anon can read team members" on team_members for select to anon using (true);
create policy "anon can write team members" on team_members for all to anon using (true) with check (true);

create policy "anon can read project tasks" on project_tasks for select to anon using (true);
create policy "anon can write project tasks" on project_tasks for all to anon using (true) with check (true);

create policy "anon can read documents" on documents for select to anon using (true);
create policy "anon can write documents" on documents for all to anon using (true) with check (true);
