const express = require('express');
const path = require('path');
const {connectDB} = require('./config/db');
const bodyParser = require('body-parser');
require('dotenv').config()
const cors = require('cors')

const app = express();
connectDB()
app.use(cors())
app.use(bodyParser.json())

app.use(express.static(path.join(__dirname, 'public')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/html', 'te.html'));
})

app.use('/api/auth', require('./routes/auth'));
app.use('/api/Carrito', require('./routes/Carrito'));

const PORT = process.env.PORT || 5000;

app.use((req, res)=>{
    res.status(404).send('pagina no encontrada')
})

app.listen(PORT, async()=>{
    console.log(`servidor escuchando en el puerto http://localhost:${PORT}`)
    const {sequelize} = require('./config/db')
    try{
        await sequelize.sync();
        console.log('Base de datos sincronizada')
    }catch(error){
        console.error('Error connecting to database', error)
    }
})

