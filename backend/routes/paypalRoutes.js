const express = require('express');
const router = express.Router();
const { paypalClient } = require('../config/paypalConfig'); // Importar el cliente PayPal
const paypal = require('@paypal/checkout-server-sdk'); // Importa PayPal SDK

// Ruta para crear la orden de PayPal
router.post('/create-order', async (req, res) => {
  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: req.body.total, // El total que envías desde el frontend
      },
    }],
  });

  try {
    const order = await paypalClient.execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error creando la orden en PayPal' });
  }
});

// Ruta para capturar la orden de PayPal
router.post('/capture-order', async (req, res) => {
  const { orderID } = req.body;
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const capture = await paypalClient.execute(request);
    res.json(capture.result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error capturando la orden en PayPal' });
  }
});

module.exports = router;
