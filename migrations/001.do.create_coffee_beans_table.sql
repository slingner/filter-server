CREATE TABLE IF NOT EXISTS coffee_beans (
    id SERIAL PRIMARY KEY,
    bean_name TEXT NOT NULL,
    bean_origin TEXT NOT NULL,
    bean_masl TEXT NOT NULL,
    bean_grower TEXT NOT NULL,
    bean_process TEXT NOT NULL
);