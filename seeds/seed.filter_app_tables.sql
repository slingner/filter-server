BEGIN;

TRUNCATE
  coffee_beans,
  flavor_notes,
  coffee_beans_flavor_notes
  RESTART IDENTITY CASCADE;


INSERT INTO coffee_beans
    (bean_name, bean_origin, bean_masl, bean_grower, bean_process)
    VALUES
        (
            'COSTA RICA BLACK HONEY LOS CIPRESES', 
            'Costa Rica',
            '1600 Meters',
            'Ureña Rojas Family',
            'Honey'
        ),
        (
            'ETHIOPIA HARU',
            'Ethiopia',
            '1750-2300 Meters',
            'Haru Cooperative',
            'Washed'
        ),
        (
            'GUATEMALA FINCA PEREZ',
            'Guatemala',
            '1550-1610 Meters',
            'Nicolas Perez',
            'Washed'
        );

INSERT INTO flavor_notes
    (flavor_name)
    VALUES
        (
            'FRUIT'
        ), 
        (
            'FLORAL'
        ), 
        (
            'EARTHY'
        ), 
        (
            'SAVORY'
        ), 
        (
            'SPICE'
        ), 
        (
            'GRAIN & CEREAL'
        ), 
        (
            'NUT'
        ), 
        (
            'SWEET & SUGARY'
        ), 
        (
            'CHOCOLATE'
        ), 
        (
            'BERRY'
        ), 
        (
            'CITRUS'
        );

INSERT INTO coffee_beans_flavor_notes
    (coffee_bean_id, flavor_note_id)
    VALUES
    (1, 1), 
    (1, 8),
    (1, 11),
    (2, 2),
    (2, 5),
    (2, 11),
    (3, 8),
    (3, 10),
    (3, 11);


INSERT INTO filter_users (user_name, full_name, nickname, password)
VALUES
  ('dunder', 'Dunder Mifflin', null, '$2a$12$lHK6LVpc15/ZROZcKU00QeiD.RyYq5dVlV/9m4kKYbGibkRc5l4Ne'),
  ('b.deboop', 'Bodeep Deboop', 'Bo', '$2a$12$VQ5HgWm34QQK2rJyLc0lmu59cy2jcZiV6U1.bE8rBBnC9VxDf/YQO'),
  ('c.bloggs', 'Charlie Bloggs', 'Charlie', '$2a$12$2fv9OPgM07xGnhDbyL6xsuAeQjAYpZx/3V2dnu0XNIR27gTeiK2gK'),
  ('s.smith', 'Sam Smith', 'Sam', '$2a$12$/4P5/ylaB7qur/McgrEKwuCy.3JZ6W.cRtqxiJsYCdhr89V4Z3rp.'),
  ('lexlor', 'Alex Taylor', 'Lex', '$2a$12$Hq9pfcWWvnzZ8x8HqJotveRHLD13ceS7DDbrs18LpK6rfj4iftNw.'),
  ('wippy', 'Ping Won In', 'Ping', '$2a$12$ntGOlTLG5nEXYgDVqk4bPejBoJP65HfH2JEMc1JBpXaVjXo5RsTUu');


INSERT INTO bean_reviews (text, rating, coffee_bean_id, user_id) 
VALUES
  (
    'This thing is amazing.',
    4,
    1,
    2
  ),
  (
    'Put a bird on it!',
    4,
    1,
    3
  ),
  (
    'All the other reviewers are obviously insane, but this thing is actually pretty amazing.',
    5,
    1,
    4
  );

COMMIT;