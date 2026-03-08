-- Run this in Railway Postgres before testing /api/admin/login.

CREATE TABLE IF NOT EXISTS admins (
  id BIGSERIAL PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  password_hash TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS admins_email_idx ON admins (email);

-- Example seed row:
-- Replace the hash below with a real bcrypt hash for your chosen password.
INSERT INTO admins (email, name, password_hash, is_active)
VALUES (
  'admin@brandscafe.com',
  'Admin User',
  '$2b$10$REPLACE_WITH_REAL_BCRYPT_HASH',
  TRUE
)
ON CONFLICT (email) DO NOTHING;
