create table public.cases (
  id          uuid default gen_random_uuid() primary key,
  avatar      text                 not null,
  name        text                 not null,
  national_id varchar(20) unique   not null,
  case_no     varchar(20)          not null,
  cpu_sc       date                 not null,      -- cycle‑start date
  partner     text,
  timer       interval,                           -- e.g. '1 hour 7 minutes'
  embryos     int default 0,
  oocytes     int default 0,
  more_count  int default 0,
  created_at  timestamptz default now()
);

-- Enable Row‑Level‑Security (then add policies as you need)
-- alter table public.cases enable row level security;
