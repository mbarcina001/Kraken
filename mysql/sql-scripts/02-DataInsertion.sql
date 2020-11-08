INSERT INTO user (id, name, password, email) VALUES 
    (1, 'admin', '$2y$12$DX7sOg0uxEZXHEWet0BwMebcgryS2dzLhG/vtMgB0Zx8sMUFa6xUq', 'admin@kraken.com'), 
    (2, 'test', '$2y$12$qIMTUuwS4AiPnw.jw3tmwOsB92tlOthORYWsoXQf1rYwvPHRmK0fm', 'test@kraken.com');

INSERT INTO role(id, name) VALUES
    (1, 'ROLE_ADMIN'),
    (2, 'ROLE_USER');

INSERT INTO user_role(user_id, role_id) VALUES
    (1, 1),
    (2, 2);

INSERT INTO oauth_client_details
    (client_id, client_secret, scope, authorized_grant_types,
        authorities, resource_ids)
VALUES
    ('krakenapp', '$2y$12$Ta4Fn9sgEMST/EL98Ujc/O5x35ip7hQUOzMECDEc4e5FLUrZj33cq', 'read,write', 'password,refresh_token,client_credentials,authorization_code', 
        'USER', 'krakenresource'); 
