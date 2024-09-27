const paypal = require('@paypal/checkout-server-sdk');
const { paypalClient } = require('../config/paypalConfig'); 
const Producto = require('../models/Producto');
const Pedido = require('../models/Pedido');
const sendMail = require('../utils/sendMail'); // Importar la función sendMail

// Crear la orden de pago
const crearOrden = async (req, res) => {
  const { total } = req.body;

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer('return=representation');
  request.requestBody({
    intent: 'CAPTURE',
    purchase_units: [{
      amount: {
        currency_code: 'USD',
        value: total,  // El total que envías desde el frontend
      },
    }],
  });

  try {
    const order = await paypalClient.execute(request);
    res.json({ id: order.result.id });
  } catch (err) {
    console.error('Error al crear la orden:', err);
    res.status(500).json({ error: 'Error al crear la orden de PayPal' });
  }
};

// Capturar el pago y enviar el correo
const capturarOrden = async (req, res) => {
  const { orderID, carrito, correoUsuario } = req.body;  // Recibir el correo del usuario
  const request = new paypal.orders.OrdersCaptureRequest(orderID);
  request.requestBody({});

  try {
    const capture = await paypalClient.execute(request);

    if (capture.result.status === 'COMPLETED') {
      // Actualizar el stock de los productos
      await actualizarStock(carrito);

      // Preparar contenido del correo
      let contenidoCorreo = '<h1>Confirmación de Compra</h1>';
      contenidoCorreo += '<p>Gracias por tu compra. Los detalles de tu pedido son los siguientes:</p>';
      contenidoCorreo += '<ul>';
      carrito.forEach(item => {
        contenidoCorreo += `<li>Producto: ${item.nombre} - Cantidad: ${item.cantidad} - Precio: ${item.precio}</li>`;
      });
      contenidoCorreo += `</ul><p>Total: $${carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0).toFixed(2)}</p>`;
      contenidoCorreo += '<p>Puedes pasar a recoger tus artículos en una semana en nuestro local.</p>';

      // Enviar el correo de confirmación
      sendMail(correoUsuario, 'Confirmación de tu compra en Huellitas Felices', contenidoCorreo);

      res.json({ message: 'Pago completado', detalles: capture.result });
    } else {
      res.status(400).json({ error: 'Pago no completado', detalles: capture.result });
    }
  } catch (err) {
    console.error('Error al capturar el pago:', err);
    res.status(500).json({ error: 'Error capturando la orden en PayPal', detalles: err });
  }
};

// Función auxiliar para actualizar el stock
const actualizarStock = async (carrito) => {
  for (let item of carrito) {
    const producto = await Producto.findByPk(item.id);
    if (producto) {
      producto.existencias -= item.cantidad;  // Restar la cantidad comprada del stock
      await producto.save();  // Guardar los cambios
    }
  }
};

module.exports = {
  crearOrden,
  capturarOrden,
};
