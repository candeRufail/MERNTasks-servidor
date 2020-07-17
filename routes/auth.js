//rutas para autenticar usuarios
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const authController = require('../controllers/authController');
const auth = require('../middleware/auth');


//crea un usuario
// su endpoint es  api/usuarios.
// api/auth

router.get('/',
    auth,
    authController.usuarioAutenticado);


router.post('/',
authController.autenticarUsuario
);


// obtiene el usuario autenticado




module.exports = router;