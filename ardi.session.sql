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
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public';
CREATE TABLE persons (
    id SERIAL,
    name text NOT NULL,
    age int NOT NULL
)
INSERT INTO persons (name, age)
VALUES ('Ardi', 24),
    ('Arik', 12),
    ('Mohammad', 20) \
SELECT *
FROM persons
WHERE age > 12
SELECT *
FROM persons
WHERE age > 12
    and name = 'Ardi'
SELECT *
FROM persons
WHERE name ilike '%a%'
SELECT *
FROM persons
WHERE id in (1, 2)
SELECT count(*)
FROM persons
SELECT name as user_name
FROM persons CREATE TABLE customers(
        id SERIAL PRIMARY KEY,
        name text NOT NULL
    ) drop table customers cascade CREATE TABLE orders(
        id SERIAL PRIMARY KEY,
        customer_id INT REFERENCES customers(id),
        amount numeric(10, 2)
    );
insert into customers(name)
VALUES ('Amin'),
    ('Karim'),
    ('Abdul')
insert into orders(customer_id, amount)
VALUES (1, 800),
    (2, 400),
    (3, 600)
SELECT *
FROM orders
WHERE amount > 200 -- inner join
SELECT *
FROM customers
    inner join orders on customers.id = orders.customer_id -- left join
SELECT *
FROM customers
    left join orders on customers.id = orders.customer_id -- how many products in category specific example
    CREATE TABLE categories(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL
    );
INSERT INTO categories(name)
VALUES ('Electronics'),
    ('Clothing'),
    ('Books');
SELECT *
FROM categories CREATE TABLE products(
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        price numeric(10, 2),
        category_id INT,
        FOREIGN KEY(category_id) REFERENCES categories(id)
    );
INSERT INTO products(name, price, category_id)
VALUES ('iPhone', 1000, 1),
    ('Laptop', 1500, 1),
    ('T-Shirt', 50, 2),
    ('Jeans', 80, 2),
    ('SQL Book', 30, 3);
SELECT *
FROM products
SELECT categories.name,
    COUNT(*) AS total_products
FROM products
    INNER JOIN categories ON products.category_id = categories.id
GROUP BY categories.name;