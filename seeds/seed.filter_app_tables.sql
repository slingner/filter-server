BEGIN;

TRUNCATE
  coffee_beans,
  flavor_notes,
  coffee_beans_flavor_notes,
  filter_users

  RESTART IDENTITY CASCADE;

INSERT INTO coffee_beans
    (bean_name, bean_origin, bean_masl, bean_grower, bean_process, flavor_notes)
    VALUES
        (
            'COSTA RICA BLACK HONEY LOS CIPRESES', 
            'Costa Rica',
            '1600 Meters',
            'Ureña Rojas Family',
            'Honey',
            'FRUIT, CARAMEL, CITRUS'
        ),
        (
            'ETHIOPIA HARU',
            'Ethiopia',
            '1750-2300 Meters',
            'Haru Cooperative',
            'Washed',
            'FLORAL, SPICE, CITRUS'
        ),
        (
            'GUATEMALA FINCA PEREZ',
            'Guatemala',
            '1550-1610 Meters',
            'Nicolas Perez',
            'Washed',
            'CARAMEL, BERRY, CITRUS'
        ),
        (
            'ETHIOPIA NATURAL BEDHATU JIBICHO', 
            'Ethiopia',
            '1800-1900 Meters',
            'Bedhatu Jibicho',
            'Natural',
            'FRUIT, BERRY, CITRUS'
        ),
        (
            'MEXICO BELLA VISTA', 
            'Mexico',
            '1700 Meters',
            '38 Small Lot Producers(Mayan Harvest Coffee Exports)',
            'Washed',
            'FRUIT, CHOCOLATE, NUT'
        ),
        (
            'HONDURAS SULMA SIOMARA CATRACHA', 
            'Honduras',
            '1400-1640 Meters',
            'Sulma Siomara Lopez',
            'Washed',
            'FRUIT, CARAMEL, CITRUS'
        ),
        (
            'MAKENA', 
            'Kenya',
            '1700 Meters',
            'Japheth Mwaura',
            'Washed',
            'FRUIT, EARTHY, CITRUS'
        ),
        (
            'ARMANDO PINEDA', 
            'Honduras',
            '1250 Meters',
            'Armando Pineda',
            'Washed',
            'FRUIT, CHOCOLATE, SPICE'
        ),
        (
            'LA FOLIE', 
            'Guatemala',
            '1570 Meters',
            'Mary Louise and Mary-Anne Penny',
            'Washed',
            'FRUIT, CHOCOLATE, NUT'
        ),
        (
            'LA BANDERA', 
            'Costa Rica',
            '1551 Meters',
            'Diego Hidalgo',
            'Honey',
            'FRUIT, CARAMEL, NUT'
        ),
        (
            'LOS ANONOS', 
            'Costa Rica',
            '1750 Meters',
            'Marvin Rodriguez',
            'Washed',
            'FRUIT, SAVORY, CARAMEL'
        ),
        (
            'EL CIPRES', 
            'Costa Rica',
            '1685 Meters',
            'Osvaldo Gonzalez',
            'Washed',
            'CITRUS, NUT, CARAMEL'
        ),
        (
            'LOS GIGANTES', 
            'Colombia',
            '1500-1900 Meters',
            'Osvaldo Gonzalez',
            'Washed',
            'CITRUS, BERRY, CHOCOLATE'
        ),
        (
            'NUEVA ESPERANZA', 
            'Honduras',
            '1550-1600 Meters',
            'David Muñoz',
            'Washed',
            'BERRY, CARAMEL, CHOCOLATE'
        ),
        (
            'Las Terrazas', 
            'Guatemala',
            '1700-2050 Meters',
            'Maria Elena Vides de Ovalle & Renardo Ovalle',
            'Washed',
            'CITRUS, SAVORY, CHOCOLATE'
        ),
        (
            'BAROIDA ESTATE', 
            'Papua New Guinea',
            '1700-1850 Meters',
            'Maria Elena Vides de Ovalle & Renardo Ovalle',
            'Washed',
            'FRUIT, EARTHY, CARAMEL'
        ),
        (
            'FINCA EL HOSPITAL', 
            'Colombia',
            '1900-2000 Meters',
            'Mercedez López',
            'Washed',
            'FRUIT, NUT, CARAMEL'
        ),
        (
            'SALVADOR DAVILA RUIZ AMAZONAS', 
            'Peru',
            '1889 Meters',
            'Salvador Davila',
            'Washed',
            'FLORAL, CITRUS, CHOCOLATE'
        ),
        (
            'FINCA LA JOYA', 
            'Colombia',
            '1800-1850 Meters',
            'Hermógenes Hernández',
            'Washed',
            'NUT, CHOCOLATE, CITRUS'
        ),
        (
            'KARAMBI STATION NYAMASHEKE', 
            'Rwanda',
            '1700-2000 Meters',
            'KARAMBI STATION(Local crops)',
            'Washed',
            'FRUIT, FLORAL, CARAMEL'
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
    (3, 11),
    (4, 1),
    (4, 10),
    (4, 11),
    (5, 1),
    (5, 7),
    (5, 10),
    (6, 1),
    (6, 8),
    (6, 11),
    (7, 1),
    (7, 3),
    (7, 11),
    (8, 1),
    (8, 5),
    (8, 9),
    (9, 1),
    (9, 7),
    (9, 9),
    (10, 1),
    (10, 7),
    (10, 8),
    (11, 1),
    (11, 4),
    (11, 8),
    (12, 7),
    (12, 8),
    (12, 11),
    (13, 9),
    (13, 10),
    (13, 11),
    (14, 8),
    (14, 9),
    (14, 10),
    (15, 4),
    (15, 9),
    (15, 11),
    (16, 1),
    (16, 3),
    (16, 8),
    (17, 1),
    (17, 7),
    (17, 8),
    (18, 2),
    (18, 9),
    (18, 11),
    (19, 7),
    (19, 9),
    (19, 11),
    (20, 1),
    (20, 2),
    (20, 8);

INSERT INTO filter_users (user_name, full_name, nickname, password)
VALUES
  ('dunder', 'Dunder Mifflin', 'du', '$2a$12$lHK6LVpc15/ZROZcKU00QeiD.RyYq5dVlV/9m4kKYbGibkRc5l4Ne'),
  ('b.deboop', 'Bodeep Deboop',' bu', '$2a$12$VQ5HgWm34QQK2rJyLc0lmu59cy2jcZiV6U1.bE8rBBnC9VxDf/YQO'),
  ('c.bloggs', 'Charlie Bloggs','cu', '$2a$12$2fv9OPgM07xGnhDbyL6xsuAeQjAYpZx/3V2dnu0XNIR27gTeiK2gK'),
  ('s.smith', 'Sam Smith','su',  '$2a$12$/4P5/ylaB7qur/McgrEKwuCy.3JZ6W.cRtqxiJsYCdhr89V4Z3rp.'),
  ('lexlor', 'Alex Taylor','au',  '$2a$12$Hq9pfcWWvnzZ8x8HqJotveRHLD13ceS7DDbrs18LpK6rfj4iftNw.'),
  ('wippy', 'Ping Won In','pu', '$2a$12$ntGOlTLG5nEXYgDVqk4bPejBoJP65HfH2JEMc1JBpXaVjXo5RsTUu');

COMMIT;