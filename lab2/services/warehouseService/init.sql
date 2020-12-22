CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE items
(
    id              SERIAL CONSTRAINT items_pkey PRIMARY KEY,
    available_count INTEGER      NOT NULL,
    model           VARCHAR(255) NOT NULL,
    size            VARCHAR(255) NOT NULL
);

CREATE TABLE order_item
(
    id             SERIAL CONSTRAINT order_item_pkey PRIMARY KEY,
    canceled       BOOLEAN,
    order_item_uid UUID NOT NULL CONSTRAINT idx_order_item_order_item_uid UNIQUE,
    order_uid      UUID NOT NULL,
    item_id        INTEGER CONSTRAINT fk_order_item_item_id REFERENCES items
);

INSERT INTO items (available_count, model, size) VALUES (10000, 'Lego 8070', 'M');
INSERT INTO items (available_count, model, size) VALUES (10000, 'Lego 42070', 'L');
INSERT INTO items (available_count, model, size) VALUES (10000, 'Lego 8880', 'L');