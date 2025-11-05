-- Установка простого пароля для главного администратора
-- Логин: admin
-- Пароль: admin2025
UPDATE users 
SET password_hash = 'admin2025',
    full_name = 'Главный администратор',
    role = 'admin'
WHERE username = 'admin';