CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users
(
    id       SERIAL CONSTRAINT users_pkey PRIMARY KEY,
    name     VARCHAR(255) NOT NULL CONSTRAINT idx_user_name UNIQUE,
    user_uid UUID         NOT NULL CONSTRAINT idx_user_user_uid UNIQUE,
    password_hash TEXT NOT NULL,
    token char(32) NOT NULL CONSTRAINT idx_user_token UNIQUE
);

insert into users (name, user_uid, password_hash, token) values ('vika', '6d2cb5a0-943c-4b96-9aa6-89eac7bdfd1b', MD5('3037'), 'qwertyuiopasdfghjklzxcvbnm123457');