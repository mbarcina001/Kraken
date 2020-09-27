CREATE TABLE user(
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    email varchar(50),
    password varchar(60),
    name varchar(50),
    accountNonExpired TINYINT NOT NULL DEFAULT 1,
    accountNonLocked TINYINT NOT NULL DEFAULT 1,
    credentialsNonExpired TINYINT NOT NULL DEFAULT 1
);

CREATE TABLE role(
    id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name varchar(20)
);

CREATE TABLE user_role(
    user_id int,
    role_id int,
    FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (role_id) REFERENCES role (id) ON DELETE CASCADE ON UPDATE CASCADE
);
