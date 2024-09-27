const axios = require('axios');

const enviarMensajeChatbot = async (req, res) => {
    const { message } = req.body;
  
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message }],
          max_tokens: 150,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,  // Aquí debe estar la clave de API
            "Content-Type": "application/json",
          },
        }
      );
  
      res.json({ message: response.data.choices[0].message.content });
    } catch (error) {
      console.error('Error al conectar con la API de OpenAI:', error);
      res.status(500).json({ error: 'Error al conectar con la API de OpenAI' });
    }
  };
  

module.exports = { enviarMensajeChatbot };
