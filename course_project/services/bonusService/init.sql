CREATE TABLE miles
(
    id            SERIAL CONSTRAINT bonus_pkey PRIMARY KEY,
    user_uid      UUID         NOT NULL CONSTRAINT idx_bonus_item_uid UNIQUE,
    balance       INTEGER      NOT NULL
);