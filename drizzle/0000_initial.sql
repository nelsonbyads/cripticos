DO $$ BEGIN
  CREATE TYPE challenge_status AS ENUM ('draft', 'scheduled', 'published', 'archived');
EXCEPTION WHEN duplicate_object THEN NULL;
END $$;

CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email varchar(255) NOT NULL UNIQUE,
  name varchar(120) NOT NULL,
  password_hash text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS challenges (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  number integer NOT NULL UNIQUE CHECK (number > 0),
  slug varchar(160) NOT NULL UNIQUE,
  clue text NOT NULL,
  answer varchar(100) NOT NULL,
  definition text NOT NULL,
  technique varchar(80) NOT NULL,
  mechanism_hint text NOT NULL,
  explanation text NOT NULL,
  author varchar(120),
  status challenge_status NOT NULL DEFAULT 'draft',
  publish_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS challenges_publication_idx ON challenges (status, publish_at DESC);
