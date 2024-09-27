const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'Gmail', // O el servicio de correo que estés utilizando
  auth: {
    user: process.env.EMAIL_USER, // Configurado en tu .env
    pass: process.env.EMAIL_PASS  // Contraseña de aplicación de Gmail u otro servicio
  }
});

const sendMail = (to, subject, htmlContent) => {
  const mailOptions = {
    from: process.env.EMAIL_USER, // Tu correo configurado
    to,                           // Correo destino
    subject,                      // Asunto del correo
    html: htmlContent             // Contenido en formato HTML
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error al enviar el correo:', error);
    } else {
      console.log('Correo enviado:', info.response);
    }
  });
};

module.exports = sendMail;
