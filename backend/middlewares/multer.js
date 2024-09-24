// backend/middleware/multer.js
const multer = require('multer');
const path = require('path');

// Configurar el almacenamiento con un nombre de archivo único
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const cleanFileName = file.originalname.replace(/\s+/g, '-'); // Reemplazar espacios por guiones
    cb(null, uniqueSuffix + '-' + cleanFileName);
  }
});

// Filtro de archivos para limitar los tipos a imágenes
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true); // Aceptar el archivo
  } else {
    cb(new Error('Tipo de archivo no válido. Solo se permiten imágenes JPEG, JPG y PNG.'), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 1024 * 1024 * 5 } // Limitar el tamaño del archivo a 5MB
});

module.exports = upload;
