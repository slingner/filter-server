CREATE TABLE filter_users (
  id SERIAL PRIMARY KEY,
  user_name TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  password TEXT NOT NULL,
  nickname TEXT,
  date_created TIMESTAMP NOT NULL DEFAULT now(),
  date_modified TIMESTAMP
);

ALTER TABLE coffee_beans
  ADD COLUMN
    user_id INTEGER REFERENCES filter_users(id)
    ON DELETE SET NULL;
