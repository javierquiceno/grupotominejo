const express = require('express')
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Ventas = require("../models/Ventas");
const Carrito = require("../models/Carrito");
const Productos = require("../models/productos");
const Carrito_detalles = require("../models/Carrito_detalles");
const Venta_detalles = require("../models/Venta_detalles");
const Producto = require('../models/productos');
const Contactar = require('../models/Contactar');


router.post('/register', async (req, res) => {
    const { nombres, apellidos, correo_electronico, ciudad, nombre_usuario, contrasena } = req.body;

    try {
        let user = await User.findOne({ where: { nombre_usuario } });
        if (user) {
            return res.status(400).json({ message: 'Nombre de usuario ya existe' });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(contrasena, salt);

        user = await User.create({
        
            nombres, 
            apellidos, 
            correo_electronico, 
            ciudad, 
            nombre_usuario, 
            contrasena: hashedPassword
        })

        const payload = {
            user: {
                id_usuario: user.id_usuario
            }
        }

        jwt.sign(payload, 'secret', { expiresIn: 300 }, (error, token) => {
            if (error) return res.status(400).json({ message: error });
            return res.json({ token })
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Error al registrar')
    }

    
    });

    router.post('/login', async (req, res) => {
        const { nombre_usuario, contrasena } = req.body;

    try {

        let user = await User.findOne({ where: { nombre_usuario } });
        if (!user) {
            return res.status(400).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare( contrasena, user.contrasena);
        if (!isMatch) {
            return res.status(400).json({ message: 'Contrasena incorrecta' });
        }

        const payload = {
            user: {
                id_usuario: user.id_usuario
            }
        }


        jwt.sign(payload, 'secret', { expiresIn: 300 }, (error, token) => {
            if (error) res.status(400).json({ message: error });
            return res.json({ token })
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).send('error en el servidor')
    }
                   
})

//Contáctanos

router.post('/contact', async (req, res) => {
    const { nombre, correoElectronico, mensaje } = req.body;

    try {
        let contactar = await Contactar.findOne({ where: {mensaje} });
        if (contactar) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        contactar = await Contactar.create({
        
            nombre, 
            correoElectronico, 
            mensaje
        })

        const payload = {
            contactar: {
                idcontactar: contactar.idcontactar
            }
        }

        jwt.sign(payload, 'secret', { expiresIn: 300 }, (error, token) => {
            if (error) return res.status(400).json({ message: error });
            return res.json({ token })
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Error al contactar')
    }

    
    });

//Agregar productos

router.post('/insert', async (req, res) => {
    const { nombre, descripcion, precio, stock, imagen_url } = req.body;

    try {
        let productos = await Productos.findOne({ where: {descripcion} });
        if (productos) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        productos = await Productos.create({
        
            nombre, 
            descripcion, 
            precio,
            stock,
            imagen_url
        })

        const payload = {
            productos: {
                id_productos: productos.id_productos
            }
        }

        jwt.sign(payload, 'secret', { expiresIn: 300 }, (error, token) => {
            if (error) return res.status(400).json({ message: error });
            return res.json({ token })
        })

    } catch (error) {
        console.error(error.message)
        res.status(500).send('Error al contactar')
    }

    
    });

module.exports = router