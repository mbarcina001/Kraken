INSERT INTO User (id, name, password, email) VALUES 
    (1, 'admin', '$2y$12$DX7sOg0uxEZXHEWet0BwMebcgryS2dzLhG/vtMgB0Zx8sMUFa6xUq', 'admin@kraken.com'), 
    (2, 'test', '$2y$12$qIMTUuwS4AiPnw.jw3tmwOsB92tlOthORYWsoXQf1rYwvPHRmK0fm', 'test@kraken.com');

INSERT INTO Role(id, name) VALUES
    (1, 'admin'),
    (2, 'user');

INSERT INTO User_Role(user_id, role_id) VALUES
    (1, 1),
    (2, 2);
