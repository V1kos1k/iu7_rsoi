CREATE TABLE miles
(
    id            SERIAL CONSTRAINT bonus_pkey PRIMARY KEY,
    user_uid      UUID         NOT NULL CONSTRAINT idx_bonus_item_uid UNIQUE,
    balance       INTEGER      NOT NULL
);

INSERT INTO miles (id, user_uid, balance) values ('1', 'b6324823-47f1-4358-8264-5590f6eb6630', 50);