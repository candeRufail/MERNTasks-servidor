const express = require('express');
const conectarDB = require('./config/db');
const cors = require('cors');

//CREAR EL SERVIDOR!!!!!!!!

const app = express();

//conectar a la base de datos
conectarDB();

app.use(cors());

//habilitar express.json
app.use(express.json({ extended: true }));
//puerto de la app
const port = process.env.port || 4000;

// importar rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/proyectos', require('./routes/proyectos'));
app.use('/api/tareas', require('./routes/tareas'));


//arrancar la app
app.listen(port, '0.0.0.0',  () => {
    console.log(`el servidor esta funcionando en el puerto ${port}`);
});

//holaaaaaaaaaaaa