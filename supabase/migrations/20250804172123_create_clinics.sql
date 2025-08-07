create table public.clinics (
  id            uuid default gen_random_uuid() primary key,
  name          text not null,
  address       text not null,
  city          text not null,
  country       text not null,
  phone         text not null,
  email         text not null,
  website       text,
  logo_url      text,
  is_active     boolean default true not null,
  created_at    timestamptz default now() not null
);

-- Create index for common lookup patterns
create index clinics_name_idx on public.clinics (name);
create index clinics_city_idx on public.clinics (city);
create index clinics_is_active_idx on public.clinics (is_active);

-- Then add the foreign key constraint to the tanks table
alter table public.tanks
  add constraint tanks_clinic_id_fkey
  foreign key (clinic_id)
  references public.clinics (id)
  on delete restrict;
