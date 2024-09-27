const express = require('express');
const router = express.Router();
const { paypalClient } = require('../config/paypalConfig'); // Importar el cliente PayPal
const paypal = require('@paypal/checkout-server-sdk'); // Importa PayPal SDK
const Producto = require('../models/Producto'); // Importar el modelo de Producto para actualizar existencias
const pagoController = require('../controllers/pagoController');

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

router.post('/create-order', pagoController.crearOrden);

// Ruta para capturar el pago de PayPal
router.post('/capture-order', pagoController.capturarOrden);


// Ruta para capturar la orden de PayPal y actualizar el stock
router.post('/capture-order', async (req, res) => {
  const { orderID, carrito } = req.body; // Recibimos el carrito desde el frontend junto con el orderID
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const capture = await paypalClient.execute(request);

    // Si el pago es exitoso, descontamos las existencias
    if (capture.result.status === 'COMPLETED') {
      for (const item of carrito) {
        const producto = await Producto.findByPk(item.id);
        
        if (producto) {
          const nuevaExistencia = producto.existencias - item.cantidad;
          
          // Validar que la nueva existencia no sea menor a cero
          if (nuevaExistencia < 0) {
            return res.status(400).json({ error: `No hay suficiente stock para el producto ${producto.nombre}` });
          }

          // Actualizar las existencias en la base de datos
          producto.existencias = nuevaExistencia;
          await producto.save();
        } else {
          return res.status(404).json({ error: `Producto con id ${item.id} no encontrado` });
        }
      }
      return res.status(200).json({ message: 'Pago capturado y existencias actualizadas', capture: capture.result });
    } else {
      return res.status(400).json({ error: 'Pago no completado' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error capturando la orden en PayPal' });
  }
});

module.exports = router;
