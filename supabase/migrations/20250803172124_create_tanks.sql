create table public.tanks (
  id            uuid default gen_random_uuid() primary key,
  model         text check (model in ('MVE1426', 'MVE616', 'Phase_Two_HC14', 'IC_Biomedical_10K', 'S1500_AB-CBS', 'MVE510')) not null,
  name          text not null,
  serology      text check (serology in ('positive', 'negative')) not null,
  sample_types  text[] not null,
  room          text not null,
  is_available  boolean default true not null,
  clinic_id     uuid not null
);

-- Create index for clinic_id
create index tanks_clinic_id_idx on public.tanks (clinic_id);

-- Create check constraint for sample_types
alter table public.tanks 
  add constraint tanks_sample_types_check 
  check (array_length(sample_types, 1) > 0 AND 
         sample_types <@ ARRAY['oocyte', 'embryo', 'sperm']::text[]);

