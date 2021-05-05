CREATE TABLE airport
(
    id            SERIAL CONSTRAINT airport_pkey PRIMARY KEY,
    airport_uid      UUID         NOT NULL CONSTRAINT idx_airport_item_uid UNIQUE,
    airport_name             VARCHAR(255) NOT NULL,
    airport_location         VARCHAR(255) NOT NULL,
    airport_address          VARCHAR(255) NOT NULL,
    airport_webadress        VARCHAR(255) NOT NULL,
    airport_info             VARCHAR(255) NOT NULL
);