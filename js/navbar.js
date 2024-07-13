let key = '$2a$10$oFTM9uqaBHpQjTjZZLIUauYv6mAMtPqAgdACQF7TE2jYo91EMBBti'
let bin = '668d8601e41b4d34e40f81e7'
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('products');
    window.location.href = "login.html";
    clearJSONBin()
  }

  async function clearJSONBin() {
    try {
      const response = await fetch(`https://api.jsonbin.io/v3/b/${bin}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Master-Key': key
        },
        body: JSON.stringify({ products: [] }) // Empty products array
      });
  
      if (!response.ok) {
        throw new Error('Failed to clear JSONBin');
      }
  
      console.log('JSONBin cleared successfully');
    } catch (error) {
      console.error('Error clearing JSONBin:', error.message);
    }
  }
