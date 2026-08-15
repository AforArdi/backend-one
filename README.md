# Rise Together - Backend

Backend API for Rise Together built with Express, TypeScript, Prisma ORM, and PostgreSQL (Neon DB).

## ✨ Recent Implementations

- **Cloudflare R2 Object Storage:** Implemented secure image uploads and deletions using `Multer` for memory storage, `Sharp` for image resizing and WebP optimization, and the `@aws-sdk/client-s3` (S3-compatible API) for interacting with Cloudflare R2. A detailed implementation guide: [Cloudflare R2](obsidian://open?vault=RiseTogether%20Backend%20Classes&file=Cloudflare%20R2).
- **CI/CD Pipeline:** Configured continuous integration using GitHub Actions to automatically run TypeScript builds, Prisma schema generation, and Docker containerization to ensure production readiness before deployment.

## 🚀 Live Deployment (Render)

The backend is containerized and deployed on Render:
- **Base URL:** `https://rise-together-backend-latest.onrender.com`
- **Get All Users Endpoint:**
  ```http
  GET https://rise-together-backend-latest.onrender.com/api/v1/auth/get-users
  ```
  *(Instead of hitting `http://localhost:5000/api/v1/auth/get-users`, you can query the live Render deployment).*

---

## 🐳 Docker & Docker Compose Setup

This project is fully containerized using Docker and Docker Compose, configured to connect to remote cloud **Neon DB** using environment variables.

### 1. Dockerfile
The [Dockerfile](Dockerfile) provides an optimized Node.js Alpine build:
- **Package Manager:** Uses `pnpm` to install dependencies.
- **Prisma Client:** Copies schema and runs `pnpm prisma generate` to create the Linux-compatible Prisma Client.
- **TypeScript Build:** Compiles TypeScript source to `./dist` via `tsc`.
- **Production Execution:** Starts the server with `pnpm run start` (`node dist/server.js`).

### 2. Docker Compose
The [docker-compose.yaml](docker-compose.yaml) manages the application lifecycle and loads database & SMTP credentials from `.env`:

```yaml
services:
  app:
    container_name: rise-together-backend
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "${PORT:-5000}:${PORT:-5000}"
    env_file:
      - .env
    restart: unless-stopped
```

---

## 🛠️ Docker Commands

### Local Execution with Compose
```bash
# Build and run container in background
docker compose up -d --build

# Follow logs
docker compose logs -f

# Stop container
docker compose down
```

### Push to Docker Hub (for Render Deployment)
```bash
# 1. Build and tag image
docker build -t <your-dockerhub-username>/rise-together-backend:latest .

# 2. Login to Docker Hub
docker login

# 3. Push image
docker push <your-dockerhub-username>/rise-together-backend:latest
```

---

## 🔐 Auth API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API Status / Welcome |
| `POST` | `/api/v1/auth/register` | Register a new user |
| `POST` | `/api/v1/auth/login` | User login |
| `GET` | `/api/v1/auth/get-users` | Fetch all users |
| `PATCH` | `/api/v1/auth/update` | Update user details |
| `DELETE` | `/api/v1/auth/delete` | Delete user |

---

# Database Schema & Reference

# Simple Single Vendor ERD
<img width="1028" height="650" alt="practice" src="https://github.com/user-attachments/assets/5799b4e6-a6b3-43a4-839f-2fcd4aaf1d99" />
<img width="1065" height="650" alt="practice (1)" src="https://github.com/user-attachments/assets/59f7e9bf-fda9-4fbc-85d4-3d147ebaf307" />


# 1. PostgreSQL Data Types (Important Ones)

You don't need every type.
These are the ones you will use 95% of the time.

---

# Numbers

## INTEGER

Whole numbers:

```
age INTEGER
```

Example:

```
20
50
100
```

---

## BIGINT

Large numbers.

Used for:

- huge user counts
- analytics

---

## SERIAL

Auto increment.

Example:

```
id SERIAL PRIMARY KEY
```

Automatically:

```
1
2
3
4
```

---

# Text

## TEXT

Most common.

```
name TEXT
```

No length limit.

---

## VARCHAR

```
username VARCHAR(50)
```

Maximum 50 characters.

Difference:

```
TEXT
=
unlimited

VARCHAR(50)
=
maximum 50
```

In modern PostgreSQL, TEXT is usually preferred.

---

# Boolean

True/false:

```
is_admin BOOLEAN
```

Values:

```
true
false
```

---

# Date and Time

## DATE

Only date:

```
2026-08-08
```

---

## TIMESTAMP

Date + time:

```
2026-08-08 00:30:22
```

Usually:

```
created_at TIMESTAMP DEFAULT NOW()
```

---

# UUID

Modern apps use this.

Instead of:

```
1
2
3
```

you get:

```
550e8400-e29b-41d4-a716
```

Good for:

- APIs
- security
- distributed systems

Prisma uses UUID often.

---

# JSONB

Very important.

Store JSON:

```
metadata JSONB
```

Example:

```
{
 "color":"black",
 "size":"XL"
}
```

Used for flexible data.

---

# NUMERIC

For money.
Never use FLOAT for money.

Bad:

```
19.999999
```

Good:

```
price NUMERIC(10,2)
```

Example:

```
1999.99
```

---

# 2. Constraints

Constraints = rules for your data.

---

## PRIMARY KEY

Unique identifier.

Example:

```
id SERIAL PRIMARY KEY
```

Rules:

- unique
- cannot be empty

---

## FOREIGN KEY

Connects tables.

Example:

Users:

```
users
---------
id
name
```

Orders:

```
orders
---------
id
user_id
```

Connection:

```
FOREIGN KEY(user_id)
REFERENCES users(id)
```

Meaning:

> Every order must belong to an existing user.

---

## UNIQUE

No duplicates.

Example:

```
email TEXT UNIQUE
```

Impossible:

```
john@gmail.com
john@gmail.com
```

---

## NOT NULL

Required field:

```
name TEXT NOT NULL
```

Cannot be:

```
NULL
```

---

## DEFAULT

Automatic value:

```
created_at TIMESTAMP DEFAULT NOW()
```

---

## CHECK

Custom validation:

```
age INT CHECK(age >= 18)
```

---

# 3. SQL Operations You Need

## WHERE

Filtering:

```
SELECT *
FROM users
WHERE age > 20;
```

---

## AND

Both conditions:

```
WHERE age > 20
AND is_admin=true
```

---

## OR

Either:

```
WHERE role='ADMIN'
OR role='SELLER'
```

---

## LIKE

Search pattern:

Starts with A:

```
WHERE name LIKE 'A%'
```

Example:

```
Alex
Adam
Andrew
```

---

Contains:

```
WHERE name LIKE '%lex%'
```

---

## IN

Multiple values:

```
WHERE id IN (1,2,3)
```

---

## IS NULL

Find missing values:

```
WHERE phone IS NULL
```

---

# 4. ORDER BY + LIMIT

Sort:

```
ORDER BY created_at DESC
```

Newest first.

---

Limit:

```
LIMIT 10
```

First 10 results.
Used for pagination.

---

# 5. Aggregation

Functions that calculate.

Example:
How many users?

```
SELECT COUNT(*)
FROM users;
```

---

Average:

```
SELECT AVG(age)
FROM users;
```

---

Maximum:

```
MAX(price)
```

---

# 6. GROUP BY

Group similar data.

Example:
Count products by category.

categories:

```
Electronics
Clothing
Books
```

Query:

```
SELECT category_id,
COUNT(*)
FROM products
GROUP BY category_id;
```

Result:

```
Electronics 50
Clothing    30
Books       20
```

---

# 7. HAVING

HAVING filters groups.
WHERE filters rows.
HAVING filters grouped results.

Example:
Only categories with more than 20 products:

```
SELECT category_id,
COUNT(*)
FROM products
GROUP BY category_id
HAVING COUNT(*) > 20;
```

---

# 8. Aliases

Rename temporarily.

```
SELECT
name AS customer_name
FROM users;
```

Output:

```
customer_name
--------------
John
```

---

# 9. JOINS (Very Important)

Database tables are separated.
JOIN combines them.

---

Imagine:

## users

|id|name|
|---|---|
|1|John|
|2|Alex|

---

## orders

|id|user_id|amount|
|---|---|---|
|1|1|500|
|2|1|200|
|3|2|300|

---

## INNER JOIN

Only matching data:

```
SELECT *
FROM users
INNER JOIN orders
ON users.id = orders.user_id;
```

Result:

```
John 500
John 200
Alex 300
```

---

## LEFT JOIN

Everything from left table.

```
SELECT *
FROM users
LEFT JOIN orders
ON users.id=orders.user_id;
```

If someone has no order:

```
Bob NULL
```

---

# 10. Relations

This is VERY important for Prisma.

---

# One-to-One

One user has one profile.
Example:

```
users

id
name


profiles

id
user_id
phone
address
```

Relationship:

```
User
 |
 |
Profile
```

Example:

```
John
 |
 +-- phone: 123456
```

---

# One-to-Many

Most common.
One user has many orders.

```
User

1
|
|
many

Orders
```

Database:

users:

```
id
name
```

orders:

```
id
user_id
```

One:

```
John
```

Many:

```
Order 1
Order 2
Order 3
```

---

# Many-to-Many

Many products belong to many orders.
Example:

Order:

```
Order #1
```

contains:

```
Laptop
Mouse
Keyboard
```

Another order:

```
Order #2
```

contains:

```
Mouse
Keyboard
```

Problem:
A normal foreign key cannot do this.

Solution:

## Junction Table

Middle table:

```
order_items
----------------
order_id
product_id
quantity
```

Now:

```
orders

   |
   |
order_items

   |
   |
products
```

Example:

order_items:

|order_id|product_id|
|---|---|
|1|10|
|1|20|
|2|20|

Meaning:
Order 1:

```
Laptop
Mouse
```

Order 2:

```
Mouse
```

---

# 11. Self Relationship

A table connects to itself.
Example:

Employees.

```
employees

id
name
manager_id
```

Data:

|id|name|manager_id|
|---|---|---|
|1|CEO|null|
|2|John|1|
|3|Alex|2|

Meaning:

```
CEO
 |
 John
 |
 Alex
```

Very common for:

- managers
- categories
- comments
- folders

---

# 12. Indexing

Think of a book.
Without index:
You scan every page.
Database without index:

```
1 million users
```

Search:

```
WHERE email='john@gmail.com'
```

Postgres checks everything.

---

With index:

```
CREATE INDEX idx_email
ON users(email);
```

Postgres creates a lookup structure.
Search becomes much faster.

---

Use indexes on:
✅ emails  
✅ usernames  
✅ foreign keys  
✅ frequently searched columns

Do NOT index everything because:
- takes storage
- slows inserts/updates
