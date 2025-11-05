export async function getHash(password: string): Promise<string> {
  const response = await fetch('https://functions.poehali.dev/6edc8a3d-459a-4c1e-a2e1-7d81e1c64d0e', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ password })
  });
  
  const data = await response.json();
  return data.hash;
}

getHash('Admin2025!Secure').then(hash => {
  console.log('BCRYPT HASH FOR ADMIN:', hash);
}).catch(err => {
  console.error('Error generating hash:', err);
});
