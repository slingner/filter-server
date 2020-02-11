CREATE TABLE IF NOT EXISTS coffee_beans_flavor_notes (
    id SERIAL PRIMARY KEY,
    coffee_bean_id INTEGER
        REFERENCES coffee_beans(id) ON DELETE CASCADE NOT NULL,
    flavor_note_id INTEGER
        REFERENCES flavor_notes(id) ON DELETE CASCADE NOT NULL
);