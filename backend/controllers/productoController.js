const Producto = require('../models/Producto');

// Crear un nuevo producto
const crearProducto = async (req, res) => {
  const { nombre, precio, existencias, descripcion } = req.body;
  try {
    const nuevoProducto = await Producto.create({
      nombre,
      precio,
      existencias,
      descripcion,
      image_url: req.file ? `/uploads/${req.file.filename}` : null
    });
    res.status(201).json({ mensaje: 'Producto creado con éxito', producto: nuevoProducto });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el producto' });
  }
};

// Obtener todos los productos
const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    res.json(productos);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

// Actualizar stock
const actualizarStock = async (req, res) => {
  const { id } = req.params;
  const { existencias } = req.body;
  
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    producto.existencias = existencias;
    await producto.save();
    
    res.json(producto);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el stock' });
  }
};

// Eliminar un producto
const eliminarProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }

    await producto.destroy(); // Eliminar el producto
    res.json({ mensaje: 'Producto eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};

module.exports = {
  crearProducto,
  obtenerProductos,
  actualizarStock,
  eliminarProducto
};
