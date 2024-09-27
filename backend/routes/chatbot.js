// routes/chatbot.js
const express = require('express');
const router = express.Router();
const { enviarMensajeChatbot } = require('../controllers/chatbotController');

// Ruta para el chatbot
router.post('/enviar', enviarMensajeChatbot);

module.exports = router;
