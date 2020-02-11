CREATE TABLE bean_reviews (
    id SERIAL PRIMARY KEY,
    text TEXT NOT NULL,
    rating INTEGER NOT NULL,
    date_created TIMESTAMP DEFAULT now() NOT NULL,
    coffee_bean_id INTEGER
        REFERENCES coffee_beans(id) ON DELETE CASCADE NOT NULL,
    user_id INTEGER
        REFERENCES filter_users(id) ON DELETE CASCADE NOT NULL
);
