-- Обновление пароля администратора на известный рабочий bcrypt хеш
-- Логин: admin
-- Пароль: testpass123
UPDATE users 
SET password_hash = '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYfXGQvdXqS',
    full_name = 'Главный администратор'
WHERE username = 'admin';