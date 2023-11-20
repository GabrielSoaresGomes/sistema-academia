CREATE DATABASE sistema_academia OWNER postgres;
DROP TABLE IF EXISTS exercise;
DROP TABLE IF EXISTS category;
CREATE TABLE IF NOT EXISTS category (
    id bigserial primary key not null,
    name text not null,
    description text not null,
    image bytea null,
    deleted_at timestamptz
);

CREATE TABLE IF NOT EXISTS exercise (
    id bigserial primary key not null,
    name text not null,
    description text not null,
    image bytea null,
    category_id bigint references category(id) not null ,
    deleted_at timestamptz
);