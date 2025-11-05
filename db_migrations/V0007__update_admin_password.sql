-- Обновление пароля главного администратора
-- Логин: admin
-- Пароль: ruBhfCjl
UPDATE users 
SET password_hash = 'ruBhfCjl'
WHERE username = 'admin';