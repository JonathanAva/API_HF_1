const nodemailer = require('nodemailer'); // Importar nodemailer
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const Role = require('../models/Role');
const bcrypt = require('bcryptjs');

// Configurar el transportador de Nodemailer
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, // Tu correo de Gmail
    pass: process.env.EMAIL_PASS  // Contraseña de aplicación de Gmail generada
  }
});

// Crear un nuevo usuario y devolver un token JWT
const crearUsuario = async (req, res) => {
  try {
    const { nombre, correo, contraseña, id_roles } = req.body;

    // Almacenar la contraseña ingresada en una variable temporal
    const contraseñaIngresada = contraseña;  // Esta es la contraseña que se enviará por correo

    // Encriptar la contraseña para almacenarla en la base de datos
    const salt = await bcrypt.genSalt(10);
    const contraseñaEncriptada = await bcrypt.hash(contraseñaIngresada, salt);

    // Crear el nuevo usuario en la base de datos con la contraseña encriptada
    const nuevoUsuario = await Usuario.create({
      nombre,
      correo,
      contraseña: contraseñaEncriptada,
      id_roles
    });

    
    const token = jwt.sign(
      { id: nuevoUsuario.id_usuario, rol: nuevoUsuario.id_roles }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } 
    );

    
    const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; background-color: #f9f9f9;">
      <div style="text-align: center;">
       
      </div>
      <h2 style="color: #333; text-align: center;">¡Bienvenido a Huellitas Felices, ${nombre}!</h2>
      <p style="color: #555;">Tu cuenta ha sido creada exitosamente. A continuación, te proporcionamos tus credenciales de acceso:</p>
      <ul style="list-style: none; padding: 0;">
        <li style="color: #333;"><strong>Correo:</strong> ${correo}</li>
        <li style="color: #333;"><strong>Contraseña:</strong> ${contraseñaIngresada}</li>
      </ul>
      <p style="color: #555;">Puedes iniciar sesión en nuestra plataforma con tus credenciales.</p>
      <p style="color: #333; text-align: center; margin-top: 40px;">
        
      </p>
      <div style="text-align: center; margin-top: 20px;">
        
      </div>
      <p style="color: #999; text-align: center; font-size: 12px;">Saludos cordiales,<br>El equipo de Huellitas Felices</p>
    </div>
  `;

  
    const mailOptions = {
      from: process.env.EMAIL_USER,        // Correo desde el que se envía
      to: correo,                          // Correo del nuevo usuario
      subject: 'Credenciales de Acceso - Huellitas Felices',  // Asunto del correo
      html: htmlContent                    // Contenido del correo en HTML
    };

    // Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error al enviar el correo:', error);
        return res.status(500).json({ error: 'Error al enviar el correo' });
      } else {
        console.log('Correo enviado:', info.response);
        return res.status(201).json({ usuario: nuevoUsuario, token });
      }
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar un solo usuario por su ID
const eliminarUsuarioPorId = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await usuario.destroy();  // Eliminar el usuario
    res.status(200).json({ mensaje: 'Usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Eliminar todos los usuarios
const eliminarTodosLosUsuarios = async (req, res) => {
  try {
    await Usuario.destroy({ where: {}, truncate: true });
    res.status(200).json({ mensaje: "Todos los usuarios han sido eliminados." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Iniciar sesión y devolver un token JWT
const iniciarSesion = async (req, res) => {
  const { correo, contraseña } = req.body;

  try {
    const usuario = await Usuario.findOne({
      where: { correo },
      include: { model: Role }  // Incluir el rol del usuario
    });
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const esContraseñaCorrecta = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!esContraseñaCorrecta) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    // Generar el token JWT, incluyendo el rol
    const token = jwt.sign(
      { id: usuario.id_usuario, rol: usuario.Role.nombre },  // Incluir el nombre del rol
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ usuario, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const obtenerClientes = async (req, res) => {
  try {
    const clientes = await Usuario.findAll({
      where: { id_roles: 3 }  // Solo los usuarios con rol id_roles = 3
    });
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los clientes', detalles: error.message });
  }
};



// Obtener todos los usuarios
const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({ include: Role });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



const obtenerDoctores = async (req, res) => {
  try {
    const doctores = await Usuario.findAll({
      where: { id_roles: 2 } // Filtra los usuarios que son doctores
    });

    if (!doctores.length) {
      return res.status(404).json({ mensaje: "No se encontraron doctores" });
    }

    res.status(200).json(doctores);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los doctores', detalles: error.message });
  }
};

module.exports = {
  crearUsuario,
  iniciarSesion,
  obtenerUsuarios,
  eliminarUsuarioPorId,
  eliminarTodosLosUsuarios,
  obtenerClientes,
  obtenerDoctores
};
