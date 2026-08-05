CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO users (name, email, password)
VALUES ('Mohammad Arik', 'arik@ardi.com', '113456'),
    ('Karim', 'karim@ardi.com', '654321');
SELECT *
FROM users;