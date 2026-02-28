CREATE DATABASE IF NOT EXISTS nhk_haven;
USE nhk_haven;

CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    avatar VARCHAR(255) DEFAULT 'default-avatar.png',
    type ENUM('Admin', 'Customer') DEFAULT 'Customer',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

SELECT email, type FROM users;
UPDATE users SET type = 'Admin' WHERE email = 'ppp2@gmail.com';

CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image VARCHAR(255) DEFAULT 'default-product.png',
    categoryId INT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categoryId) REFERENCES categories(id) ON DELETE SET NULL
);

USE nhk_haven;
INSERT INTO categories (name) VALUES 
('Monitores'),
('Notebooks'),
('Placas de video'),
('Procesadores'),
('Otros');

USE nhk_haven;
INSERT INTO products (name, description, price, image, categoryId) VALUES
('Monitor 25" Arkham 320hz', 'Panel IPS, 1ms, Full HD', 354742, 'monitor-1.jpg', 1),
('Monitor Noblex 22 Fhd', 'VA Antirreflejo Adaptative', 188217, 'monitor-2.jpg', 1),
('Monitor 27 Asus Va27ehf', 'IPS 100hz 1ms', 223151, 'monitor-3.jpg', 1),
('Gigabyte Notebook I7', '16gb DDR5 RTX 5050 512gb', 2374157, 'nb-1.jpg', 2),
('Lenovo Notebook V15 I5', '8gb 256ssd Free Dos', 1173262, 'nb-2.jpg', 2),
('Exo Notebook Smart R41', 'N4020 4+128gb', 392028, 'nb-3.jpg', 2),
('Gigabyte RTX 5060ti', 'WF2 OC 8gb', 880711, 'placa-5060.jpg', 3),
('Gigabyte RTX 5070', 'Eagle OC 12gb', 1388878, 'placa-5070.jpg', 3),
('Gigabyte RTX 5090', 'Aorus M Ice 32gb', 5852928, 'placa-5090.jpg', 3),
('Ryzen 7 9800x3d', 'AM5 Sin cooler', 828767, 'procesador-1.jpg', 4),
('Ryzen 7 5700', 'Con Cooler nuevo', 280200, 'procesador-2.jpg', 4),
('Ryzen 5 3500x', 'AM4 OEM sin caja', 92548, 'procesador-3.jpg', 4);