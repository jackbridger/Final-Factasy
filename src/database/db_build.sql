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
VALUES ('Jon'),('Aria');

INSERT INTO inventory
(item_name, item_quantity, item_description, item_price, item_available, item_power)
VALUES ('Dagger', 3, 'Stick them with the pointy end', 8, TRUE, 10), ('Cape', 5, 'It will keep you warm', 3, TRUE, 1);


INSERT INTO ownership (owner_id, item_id)
VALUES (1, 2), (2, 1);

COMMIT;
