-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- USERS Table
create type user_role as enum ('admin', 'architect', 'site_manager', 'client');

create table users (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  full_name text,
  role user_role not null default 'client',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- PROJECTS Table
create type project_status as enum ('planning', 'execution', 'delivered');

create table projects (
  id uuid primary key default uuid_generate_v4(),
  name text not null,
  location text not null, -- Could be JSON for more detail
  client_id uuid references users(id) not null,
  status project_status not null default 'planning',
  budget_total numeric(12, 2) default 0.00,
  start_date date,
  end_date date,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- PARAMETRIC RULES Table
create table parametric_rules (
  id uuid primary key default uuid_generate_v4(),
  material_type text not null unique, -- e.g., 'Pladur', 'Paint_X'
  consumption_rate text not null, -- e.g., '1L_per_10m2', parsed by backend
  waste_factor numeric(4, 2) default 0.10, -- 10%
  base_unit_price numeric(10, 2),
  created_at timestamp with time zone default now()
);

-- INVENTORY Table
create type inventory_location_type as enum ('warehouse', 'site_leftover');

create table inventory (
  id uuid primary key default uuid_generate_v4(),
  material_id uuid references parametric_rules(id), -- Optional link, or use separate catalog
  sku text not null,
  quantity numeric(10, 2) not null default 0,
  location_type inventory_location_type not null,
  project_id uuid references projects(id), -- Null if in warehouse, set if site_leftover
  unit_price numeric(10, 2),
  updated_at timestamp with time zone default now()
);

-- QUALITY CHECKLISTS Table
create table quality_checklists (
  id uuid primary key default uuid_generate_v4(),
  phase_name text not null,
  steps jsonb not null, -- Array of steps
  required_photo_evidence boolean default false,
  created_at timestamp with time zone default now()
);

-- Triggers for updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language 'plpgsql';

create trigger update_users_updated_at before update on users for each row execute procedure update_updated_at_column();
create trigger update_projects_updated_at before update on projects for each row execute procedure update_updated_at_column();
create trigger update_inventory_updated_at before update on inventory for each row execute procedure update_updated_at_column();
