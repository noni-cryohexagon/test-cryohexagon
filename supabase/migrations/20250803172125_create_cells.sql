create table public.cells (
  id            uuid default gen_random_uuid() primary key,
  letter        text check (letter in ('a', 'b', 'c', 'd')) not null,
  height        text check (height in ('short', 'tall')) not null,
  max_canes     int not null,
  tank_slot     text not null,
  is_in_tank    boolean default true not null,
  tank_id       uuid not null
);

create index cells_tank_id_idx on public.cells (tank_id);

-- Enable Row‑Level‑Security (then add policies as you need)
-- alter table public.cells enable row level security;

-- Then add the foreign key constraint to the cells table
alter table public.cells
  add constraint cells_tank_id_fkey
  foreign key (tank_id)
  references public.tanks (id)
  on delete restrict;
