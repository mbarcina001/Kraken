CREATE TABLE User(
    id int NOT NULL AUTO_INCREMENT,
    email varchar(50),
    password varchar(64),
    name varchar(50),
    PRIMARY KEY(id)
);

CREATE TABLE Role(
    id int NOT NULL AUTO_INCREMENT,
    name varchar(20),
    PRIMARY KEY(id)
);

CREATE TABLE User_Role(
    user_id int,
    role_id int,
    FOREIGN KEY (user_id) REFERENCES User (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (role_id) REFERENCES Role (id) ON DELETE CASCADE ON UPDATE CASCADE
);
