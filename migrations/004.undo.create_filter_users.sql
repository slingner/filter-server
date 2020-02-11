ALTER TABLE filter_users
  DROP COLUMN IF EXISTS user_id;

DROP TABLE IF EXISTS filter_users;
