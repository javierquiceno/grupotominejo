const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Ventas = require("../models/Ventas");
const Carrito = require("../models/Carrito");
const Productos = require("../models/productos");
const Venta_detalles = require("../models/Venta_detalles");
const Carrito_detalles = require("../models/Carrito_detalles");
//obtener un producto
router.get('/productos', async (req, res) => {
    try {
        const productos = await Productos.findAll();
        res.json(productos)
    } catch (error) {
        console.error(error.message)
        res.status(500).send('error al obtener productos')
    }
})

/*
//Detalles del carrito
router.get('/Carrito/id_carrito/destalles', async (req, res) => {
    const {id_carrito} = req.params;
    try {
        const detalles = await Carrito_detalles.findAll(({ where: { id_carrito } }));
        res.json(detalles);
} catch (error) {
    console.error(error.message);
    res.status(500).send('Error al obtener detalles del carrito');
}

});
//Crear nuevo carrito - se esta duplicando la tabla
router.post('/Carrito', async (req, res) =>{
    const {id_users} = req.body;
    try {
        const Carrito = await Carrito.create({id_users});
        res.json(Carrito);
    } catch (error) {
        console.error(error.message);
    res.status(500).send('Error al crear carrito');
    }
});
    //Agregar un producto
    router.post('/Carrito/id_carrito/productos', async (req, res) =>{
        const {id_productos, cantidad} = req.body;
        const {id_carrito} = req.params;
        
        try {
            const Detalles = await Carrito_detalles.create({id_productos, id_carrito, cantidad});
            res.json(Detalles);
        } catch (error) {
            console.error(error.message);
        res.status(500).send('Error al agregar al carrito');
        }
});
//Ventas
//Pagos
module.exports = router

*/

// Ruta para crear un carrito
router.post('/carrito', async (req, res) => {
    try {
      const nuevoCarrito = await Carrito.create({ id_users: req.body.id_users });
      res.json({ id_carrito: nuevoCarrito.id_carrito });
    } catch (error) {
      console.error("Error al crear el carrito:", error);
      res.status(500).json({ error: true, mensaje: 'Error al crear el carrito' });
    }
  });
  
  // Ruta para agregar un producto a un carrito específico
  router.post('/carrito/:id_carrito/productos', async (req, res) => {
      const { id_producto, cantidad } = req.body;
      const { id_carrito } = req.params;
    
      try {
        const producto = await Productos.findByPk(id_producto);
    
        if (!producto) {
          return res.status(400).json({ error: true, mensaje: 'Producto no encontrado' });
        }
        if (producto.stock < cantidad) {
          return res.status(400).json({ error: true, mensaje: 'Stock insuficiente' });
        }
    
        // Agregar el producto al carrito en la base de datos
        await Venta_detalles.create({
          id_producto: id_producto,
          cantidad: cantidad,
          precio: producto.precio,
        });
    
        res.json({ error: false, mensaje: 'Producto agregado al carrito' });
      } catch (error) {
        console.error("Error al agregar producto al carrito:", error); // Muestra más detalles del error
        res.status(500).json({ error: true, mensaje: 'Error al agregar producto al carrito', detalle: error.message });
      }
    });
    
  
  module.exports = router;