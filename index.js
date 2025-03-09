const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//Chave da API
const API_KEY = 'AIzaSyDOj9ZYQZjORRu8SRKwsv7MpIB5yWwfUMo';

// URL da API Gemini com o modelo gemini-1.5-pro
const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`;

// Rota para receber requisições do frontend
app.post('/chat', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(
      API_URL,
      {
        contents: [
          {
            parts: [
              {
                text: prompt // Texto de entrada
              }
            ]
          }
        ]
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Retorna a resposta da API para o frontend
    res.json({ response: response.data.candidates[0].content.parts[0].text });
  } catch (error) {
    console.error('Erro ao chamar a API:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Erro ao chamar a API Gemini' });
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});