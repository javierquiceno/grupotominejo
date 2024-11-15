const {Sequelize, DataTypes} = require('sequelize');
const {sequelize} = require('../config/db');

const Contactar = sequelize.define('Contactar', {
    idcontactar: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },

    correoElectronico: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false
    },

    mensaje: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: false
    },

    fecha_mensaje: {
        type: DataTypes.DATE,
        defaultValue: sequelize.NOW
    }
   
},

{

    timestamps:false

})

module.exports = Contactar;