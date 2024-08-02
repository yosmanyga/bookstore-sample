use bookstore;

create table books
(
    id               int auto_increment primary key,
    title            varchar(191) not null,
    author           varchar(191) not null,
    description      varchar(191) not null,
    publication_year int          not null,
    isbn             varchar(191) null
);

create table users
(
    id       int auto_increment primary key,
    username varchar(191) not null,
    password varchar(191) not null,
    salt     varchar(191) not null,
    is_admin tinyint(1) default 0 not null,
    constraint users_username_key
        unique (username)
);

create table favorites
(
    user_id int not null,
    book_id int not null,
    primary key (user_id, book_id),
    constraint favorites_book_id_fkey
        foreign key (book_id) references books (id)
            on update cascade on delete cascade,
    constraint favorites_user_id_fkey
        foreign key (user_id) references users (id)
            on update cascade on delete cascade
);

