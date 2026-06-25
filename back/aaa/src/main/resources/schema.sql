create table if not exists employees (
    id bigserial primary key,
    name varchar(100) not null,
    department varchar(100) not null,
    position varchar(100) not null,
    email varchar(255) not null unique,
    hire_date date not null default current_date,
    created_at timestamp not null default current_timestamp
);
