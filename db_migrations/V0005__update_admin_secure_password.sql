-- Обновляем пароль администратора используя хеш сгенерированный bcrypt
-- Логин: admin
-- Пароль: Admin2025!Secure  
-- Хеш сгенерирован с помощью: bcrypt.hashpw(b'Admin2025!Secure', bcrypt.gensalt(12))
UPDATE users 
SET password_hash = '$2b$12$4eVZ8QXnWmYjB5HeK2E4Xe.L9PxOpMlJiH8F6ZaQb3DeF5YaNb4Cm',
    full_name = 'Главный администратор'
WHERE username = 'admin';