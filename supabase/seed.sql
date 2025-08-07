insert into public.cases
  (avatar,            name,            national_id, case_no, cpu_sc,    partner,
   timer,           embryos, oocytes, more_count)
values
  ('patient-1.png',    'Yael Mor-Cohen', '312538592',  '4295714',
   '2025-06-22',    'Moshe Cohen',   '1 hour 7 minutes',
    0,               12,        9),
  ('patient-2.png',    'Dvir Shimshon',  '312538595',  '7382910',
   '2025-06-22',    null,            '1 hour 5 minutes',
    1,               0,        9),
  ('patient-3.png', 'Dalia Shimon', '312538596', '8463725',
   '2025-06-22',    'Meny Shimon',   '50 minutes',
    4,               0,        0),
  ('patient-4.png', 'Alina Beker',  '312538597', '6528391',
   '2025-06-22',    null,            '41 minutes',
    0,               16,        9),
  ('patient-5.png', 'Sarah Luiz',   '512639874', '1948273',
   '2025-06-25',    'David Luiz',    '31 minutes',
    0,               4,        12);
  -- ('/patient-6.png', 'Tal Rivlin-Amit', '413728964', '6728910',
  --  '2025-06-30',    'Roni Rivlin',   '25 minutes',
  --   8,               0,        7);

-- Create clinics first (for foreign key relationship)
insert into public.clinics (
  id, name, address, city, country, phone, email, website, logo_url, is_active
)
values 
  (
    'a4b9c2d1-e5f6-4a8b-9d0e-1f2a3b4c5d6e', 
    'IVF Center', 
    '123 Fertility Lane', 
    'Tel Aviv', 
    'Israel', 
    '+972-3-555-1234', 
    'contact@ivfcenter.com', 
    'https://www.ivfcenter.com', 
    '/logo.png', 
    true
  ),
  (
    'b5c0d3e2-f6a7-4b8c-9d0e-1f2a3b4c5d6f', 
    'Fertility Clinic', 
    '456 Reproductive Road', 
    'Jerusalem', 
    'Israel', 
    '+972-2-555-6789', 
    'info@fertilityclinic.com', 
    'https://www.fertilityclinic.com', 
    '/logo.png', 
    true
  ),
  (
    'c6d1e2f3-a7b8-4c9d-8e0f-1a2b3c4d5e6f',
    'Reproductive Health Center',
    '789 IVF Boulevard',
    'Haifa',
    'Israel',
    '+972-4-555-9876',
    'support@reprohealth.com',
    'https://www.reprohealth.com',
    '/logo.png',
    false
  );

-- Seed data for tanks
insert into public.tanks (id, model, name, serology, sample_types, room, is_available, clinic_id)
values 
  ('b5a0d1c3-e8f9-4a6b-8d2e-7c3b4f5a6d8e', 'MVE1426', 'Tank A', 'negative', ARRAY['embryo', 'oocyte'], 'Room 101', true, 'a4b9c2d1-e5f6-4a8b-9d0e-1f2a3b4c5d6e'),
  ('c6b1e2d4-f9a0-5b7c-9e3f-8d4c5e6f7a8b', 'MVE616', 'Tank B', 'positive', ARRAY['sperm'], 'Room 102', true, 'a4b9c2d1-e5f6-4a8b-9d0e-1f2a3b4c5d6e'),
  ('d7c2f3e5-0b1a-6c8d-9e0f-1a2b3c4d5e6f', 'Phase_Two_HC14', 'Tank C', 'negative', ARRAY['embryo', 'oocyte', 'sperm'], 'Room 103', false, 'b5c0d3e2-f6a7-4b8c-9d0e-1f2a3b4c5d6f'),
  ('e8d3f4e6-1c2d-7e8f-2a3b-0c1d2e3f4a5b', 'MVE510', 'Tank D', 'negative', ARRAY['embryo'], 'Room 101', true, 'b5c0d3e2-f6a7-4b8c-9d0e-1f2a3b4c5d6f'),
  ('f9e4d5c6-2f3e-8d9c-3b4a-1c2d3e4f5a6b', 'S1500_AB-CBS', 'Tank E', 'positive', ARRAY['sperm', 'embryo'], 'Room 105', true, 'c6d1e2f3-a7b8-4c9d-8e0f-1a2b3c4d5e6f');

-- Seed data for cells
insert into public.cells
  (letter, height, max_canes, tank_slot, is_in_tank, tank_id)
values
  ('a', 'short', 6, '1', true, 'b5a0d1c3-e8f9-4a6b-8d2e-7c3b4f5a6d8e'),
  ('b', 'tall', 8, '2', true, 'b5a0d1c3-e8f9-4a6b-8d2e-7c3b4f5a6d8e'),
  ('c', 'short', 6, '3', true, 'b5a0d1c3-e8f9-4a6b-8d2e-7c3b4f5a6d8e'),
  ('d', 'tall', 8, '4', true, 'b5a0d1c3-e8f9-4a6b-8d2e-7c3b4f5a6d8e'),
  ('a', 'short', 6, '1a', false, 'c6b1e2d4-f9a0-5b7c-9e3f-8d4c5e6f7a8b'),
  ('b', 'tall', 10, '2b', true, 'c6b1e2d4-f9a0-5b7c-9e3f-8d4c5e6f7a8b');
