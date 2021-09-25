CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users
(
    id                  SERIAL CONSTRAINT users_pkey PRIMARY KEY,
    name                VARCHAR(255) NOT NULL CONSTRAINT idx_user_name UNIQUE,
    user_uid UUID       NOT NULL CONSTRAINT idx_user_user_uid UNIQUE,
    password_hash       TEXT NOT NULL,
    user_role           VARCHAR(10) NOT NULL
);

insert into users (name, user_uid, password_hash, user_role) values ('vika', 'b6324823-47f1-4358-8264-5590f6eb6630', MD5('3037'), 'admin');
