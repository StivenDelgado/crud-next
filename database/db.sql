CREATE DATABASE product(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    price INT DECIMAL(19, 2) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
) 

ALTER TABLE  product ADD COLUMN image VARCHAR(200) AFTER description;