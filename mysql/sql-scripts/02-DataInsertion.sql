INSERT INTO user (id, name, password, email) VALUES 
    (1, 'admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'admin@kraken.com'), 
    (2, 'test', '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08', 'test@kraken.com');

INSERT INTO role(id, name) VALUES
    (1, 'admin'),
    (2, 'user');

INSERT INTO userrole(user_id, role_id) VALUES
    (1, 1),
    (2, 2);
