require('dotenv').config();
const paypal = require('@paypal/checkout-server-sdk');

// Configuración de PayPal con credenciales del archivo .env
const environment = new paypal.core.SandboxEnvironment(
  process.env.PAYPAL_CLIENT_ID,
  process.env.PAYPAL_CLIENT_SECRET
);
const paypalClient = new paypal.core.PayPalHttpClient(environment);

module.exports = { paypalClient };
