BEGIN;

DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS inventory CASCADE;
DROP TABLE IF EXISTS ownership CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  gold_pieces INTEGER DEFAULT 20
);

CREATE TABLE inventory (
  id SERIAL PRIMARY KEY,
  item_name VARCHAR(80) NOT NULL,
  item_quantity INTEGER DEFAULT 0,
  item_description VARCHAR(200),
  item_price INTEGER DEFAULT 20,
  item_available BOOLEAN,
  item_power INTEGER DEFAULT 0
);

CREATE TABLE ownership (
  id SERIAL PRIMARY KEY,
  owner_id INTEGER REFERENCES users(id),
  item_id INTEGER REFERENCES inventory(id)
);

INSERT INTO users (name)
VALUES ('Jon'), ('Aria'), ('Hodor'), ('Kevin');

INSERT INTO inventory
(item_name, item_quantity, item_description, item_price, item_available, item_power)
VALUES ('Dagger', 3, 'Stick them with the pointy end.', 8, TRUE, 10),
('Cape', 5, 'It will keep you warm. And capes are so in right now.', 3, TRUE, 1),
('Walking stick', 10, 'For old people to walk. Can also be used to beat people.', 2, TRUE, 2),
('Toothbrush', 2, '79% of medieval dentists believe dental hygiene can keep you alive.', 10, TRUE, 20);


INSERT INTO ownership (owner_id, item_id)
VALUES (1, 2), (1, 2), (2, 1), (3, 3), (4, 4), (4, 4);

COMMIT;
