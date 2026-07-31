-- ========================================================
-- SHOPKEEPER 3D SPATIAL PLATFORM DATABASE SCHEMA
-- Execute this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/gkddsnllqwubtuoulcrh/sql/new
-- ========================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. STORES TABLE
create table if not exists public.stores (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid references auth.users(id) on delete cascade,
  name text not null,
  slug text unique not null,
  description text,
  logo_url text,
  theme_config jsonb default '{"primaryColor": "#7c3aed", "secondaryColor": "#06b6d4"}'::jsonb,
  is_published boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. PRODUCTS TABLE
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  store_id uuid references public.stores(id) on delete cascade,
  name text not null,
  description text,
  price numeric(10, 2) not null,
  original_price numeric(10, 2),
  stock_quantity integer default 10 not null,
  image_url text,
  model_3d_url text,
  category text default 'Electronics',
  colors text[] default array['#7c3aed', '#06b6d4', '#ec4899', '#18181b'],
  sizes text[] default array['Standard', 'Pro Foam'],
  is_active boolean default true,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. ORDERS TABLE
create table if not exists public.orders (
  id text primary key,
  store_id uuid references public.stores(id) on delete cascade,
  customer_name text not null,
  customer_email text not null,
  shipping_address jsonb default '{}'::jsonb,
  total_amount numeric(10, 2) not null,
  status text default 'Pending' check (status in ('Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled')),
  stripe_payment_id text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. ORDER ITEMS TABLE
create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id text references public.orders(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null,
  quantity integer not null,
  unit_price numeric(10, 2) not null,
  selected_color text,
  selected_size text
);

-- ========================================================
-- ENABLE ROW LEVEL SECURITY (RLS)
-- ========================================================
alter table public.stores enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- PUBLIC READ POLICIES (Storefront Customers)
create policy "Public stores are viewable by everyone" 
  on public.stores for select using (is_published = true);

create policy "Public products are viewable by everyone" 
  on public.products for select using (is_active = true);

create policy "Anyone can create an order" 
  on public.orders for insert with check (true);

create policy "Anyone can insert order items" 
  on public.order_items for insert with check (true);

-- MERCHANT AUTHENTICATED POLICIES (Store Owners)
create policy "Store owners can manage their own stores" 
  on public.stores for all using (auth.uid() = owner_id);

create policy "Store owners can manage products" 
  on public.products for all using (
    exists (
      select 1 from public.stores 
      where stores.id = products.store_id and stores.owner_id = auth.uid()
    )
  );

create policy "Store owners can view and update orders" 
  on public.orders for all using (
    exists (
      select 1 from public.stores 
      where stores.id = orders.store_id and stores.owner_id = auth.uid()
    )
  );

-- Enable Realtime subscriptions on Orders and Products
alter publication supabase_realtime add table public.orders;
alter publication supabase_realtime add table public.products;

-- ========================================================
-- SEED DEMO STORE & PRODUCTS
-- ========================================================
insert into public.stores (id, name, slug, description)
values (
  '00000000-0000-0000-0000-000000000001',
  'Demo Store',
  'demo-store',
  'Official 3D Spatial Demo Store for ShopKeeper Platform'
) on conflict (slug) do nothing;

insert into public.products (store_id, name, description, price, original_price, category, image_url)
values 
  ('00000000-0000-0000-0000-000000000001', 'Cyber-Spatial Headphones Pro', 'Next-gen spatial audio headset crafted with lightweight magnesium alloy.', 299.99, 349.99, 'Electronics', '/images/cyber_headphones.jpg'),
  ('00000000-0000-0000-0000-000000000001', 'Minimal Ergonomic Desk Lamp', 'Adjustable LED desk lamp with touch intensity controls.', 89.00, 110.00, 'Home & Living', '/images/desk_lamp.jpg'),
  ('00000000-0000-0000-0000-000000000001', 'Mechanical Wireless Keyboard', 'Hot-swappable RGB mechanical keyboard with custom switches.', 149.00, 179.00, 'Electronics', '/images/mechanical_keyboard.jpg')
on conflict do nothing;
