CREATE DATABASE sistema_academia OWNER postgres;
DROP TABLE exercise;
CREATE TABLE exercise (
    id bigserial primary key not null,
    nome text not null,
    description text not null,
    imagem bytea null,
    deleted_at timestamptz
);
DROP TABLE category;
CREATE TABLE category (
    id bigserial primary key not null,
    nome text not null,
    description text not null,
    imagem bytea null,
    deleted_at timestamptz
);
CREATE TABLE exercise_category (
    id bigserial not null,
    exercise_id bigint not null references exercise,
    category_id bigint not null references category(id)
);