INSERT INTO user (id, name, password, email) VALUES 
    (1, 'admin', '$2y$12$Y.sySM0y6PPPDz4918TOqOi6IHuOS9RNYpsZcX1HJz91mZV2y0GOe', 'admin@kraken.com'), 
    (2, 'user', '$2y$12$5Obu2CgOvdAGk7aHChzvDOtMMk8ds10lTzLJxvXpiM7aJv39XQcgm ', 'user@kraken.com');

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
