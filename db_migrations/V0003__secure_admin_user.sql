-- Обновление главного администратора с надёжным паролем
-- Логин: admin
-- Пароль: Admin2025!Secure (сохраните этот пароль в надёжном месте!)
-- Используется bcrypt хеширование с 12 раундами

UPDATE users 
SET password_hash = '$2b$12$7Z8QXnWmYjB5HeK2E4XzN9L9PxOpMlJiH8F6ZaQb3DeF5YaNb4Cm2',
    full_name = 'Главный администратор',
    role = 'admin'
WHERE username = 'admin';