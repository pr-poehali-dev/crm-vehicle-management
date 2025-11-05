import bcrypt

password = "Admin2025!Secure"
salt = bcrypt.gensalt(rounds=12)
hashed = bcrypt.hashpw(password.encode('utf-8'), salt)

print(f"Password: {password}")
print(f"Hash: {hashed.decode('utf-8')}")
