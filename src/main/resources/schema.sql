CREATE TABLE Users (
    id INT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    gender VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    created_on DATETIME
);
