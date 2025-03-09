document.getElementById('sendButton').addEventListener('click', async () => {
    const inputText = document.getElementById('inputText').value;
    const responseDiv = document.getElementById('response');
  
    if (!inputText) {
      alert('Por favor, digite uma mensagem.');
      return;
    }
  
    try {
      const response = await fetch('http://localhost:3000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prompt: inputText })
      });
  
      const data = await response.json();
      responseDiv.innerText = data.response;
    } catch (error) {
      console.error('Erro ao chamar a API:', error);
      responseDiv.innerText = 'Erro ao processar a requisição.';
    }
  });