const { FOREIGNKEYS } = require("sequelize/lib/query-types");
const Ventas = require("./Ventas");
const User = require("./User");
const Carrito = require("./Carrito");
const Productos = require("./productos");
const Carrito_detalles = require("./Carrito_detalles");
const Venta_detalles = require("./Venta_detalles");
const {Sequelize} = require('sequelize');

User.hasMany(Carrito, {FOREIGNKEYS: 'id_users'})
Carrito.belongsTo(User, {FOREIGNKEYS: 'id_users'})

Carrito.hasMany(Carrito_detalles, {FOREIGNKEYS: 'id_carrito'})
Carrito_detalles.belongsTo(Carrito, {FOREIGNKEYS: 'id_carrito'})

Productos.hasMany(Carrito_detalles, {FOREIGNKEYS: 'id_productos'})
Carrito_detalles.belongsTo(Productos, {FOREIGNKEYS: 'id_productos'})

User.hasMany(Ventas, {FOREIGNKEYS: 'id_users'})
Ventas.belongsTo(User, {FOREIGNKEYS: 'id_users'})

Ventas.hasMany(Venta_detalles, {FOREIGNKEYS: 'id_ventas'})
Venta_detalles.belongsTo(Ventas, {FOREIGNKEYS: 'id_ventas'})

Venta_detalles.hasMany(Productos, {FOREIGNKEYS: 'id_productos'})
Productos.belongsTo(Venta_detalles, {FOREIGNKEYS: 'id_productos'})