-- ============================================================
-- Vendorzo Supabase Migration
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. Profiles (extends auth.users)
create table public.profiles (
  id         uuid primary key references auth.users(id) on delete cascade,
  full_name  text not null default '',
  role       text not null default 'cashier' check (role in ('admin', 'manager', 'cashier')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Auto-create a profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', '')
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();


-- 2. Products
create table public.products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  category    text not null default 'Drinks',
  price       numeric(10,2) not null default 0,
  stock       integer not null default 0,
  sku         text not null default '',
  rating      numeric(3,1) not null default 0,
  prep_time   text not null default 'Ready',
  description text not null default '',
  icon        text not null default 'coffee',
  image_url   text,
  created_at  timestamptz not null default now()
);

alter table public.products enable row level security;

create policy "Authenticated users can read products"
  on public.products for select to anon, authenticated using (true);

create policy "Authenticated users can insert products"
  on public.products for insert to anon, authenticated with check (true);

create policy "Authenticated users can update products"
  on public.products for update to anon, authenticated using (true);

create policy "Authenticated users can delete products"
  on public.products for delete to anon, authenticated using (true);


-- 3. Orders
create table public.orders (
  id              uuid primary key default gen_random_uuid(),
  order_number    serial,
  customer        text not null default '',
  items           integer not null default 0,
  payment         text not null default 'Card' check (payment in ('Card', 'Cash', 'Wallet')),
  subtotal        numeric(10,2) not null default 0,
  tax             numeric(10,2) not null default 0,
  total           numeric(10,2) not null default 0,
  status          text not null default 'Pending' check (status in ('Completed', 'Pending', 'Refunded')),
  created_at      timestamptz not null default now()
);

alter table public.orders enable row level security;

create policy "Authenticated users can read orders"
  on public.orders for select to anon, authenticated using (true);

create policy "Authenticated users can insert orders"
  on public.orders for insert to anon, authenticated with check (true);

create policy "Authenticated users can update orders"
  on public.orders for update to anon, authenticated using (true);


-- 4. Order Items
create table public.order_items (
  id            uuid primary key default gen_random_uuid(),
  order_id      uuid not null references public.orders(id) on delete cascade,
  product_id    uuid references public.products(id),
  product_name  text not null,
  quantity      integer not null default 1,
  unit_price    numeric(10,2) not null default 0
);

alter table public.order_items enable row level security;

create policy "Authenticated users can read order items"
  on public.order_items for select to anon, authenticated using (true);

create policy "Authenticated users can insert order items"
  on public.order_items for insert to anon, authenticated with check (true);


-- 5. Storage bucket for product images
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;

create policy "Anyone can view product images"
  on storage.objects for select
  using (bucket_id = 'product-images');

create policy "Authenticated users can upload product images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'product-images');


-- 6. Seed data (matches current mock products)
insert into public.products (name, category, price, stock, sku, rating, prep_time, description, icon) values
  ('Espresso Shot',          'Drinks',   3.50, 62, 'DR-1001', 4.8, '2 min',  'Double espresso with a rich crema and clean finish.',         'coffee'),
  ('Iced Cola',              'Drinks',   2.80, 45, 'DR-1002', 4.5, '1 min',  'Classic chilled cola served over ice.',                       'cup-soda'),
  ('Citrus Cooler',          'Drinks',   4.20, 31, 'DR-1003', 4.6, '3 min',  'Sparkling citrus mix with mint and crushed ice.',              'cup-soda'),
  ('Chocolate Cookie',       'Snacks',   2.40, 77, 'SN-2001', 4.7, 'Ready',  'Soft baked cookie with dark chocolate chunks.',                'cookie'),
  ('Sea Salt Crackers',      'Snacks',   1.90, 83, 'SN-2002', 4.3, 'Ready',  'Light and crisp crackers with sea salt finish.',               'cookie'),
  ('Chicken Club Sandwich',  'Meals',    8.90, 24, 'ML-3001', 4.9, '8 min',  'Grilled chicken, lettuce, tomato, and house spread.',          'sandwich'),
  ('Tomato Basil Soup',      'Meals',    6.50, 19, 'ML-3002', 4.4, '6 min',  'Slow simmered tomato soup with basil oil.',                    'soup'),
  ('Cheesecake Slice',       'Desserts', 5.10, 17, 'DS-4001', 4.8, 'Ready',  'Creamy New York style cheesecake with crumb base.',            'cake-slice'),
  ('Carrot Cake',            'Desserts', 4.80, 13, 'DS-4002', 4.5, 'Ready',  'Moist carrot cake topped with cream cheese frosting.',         'cake-slice');
