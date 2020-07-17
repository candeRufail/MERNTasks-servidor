const Usuario = require('../models/Usuario')
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req, res) => {

    const errores = validationResult(req);
    if ( !errores.isEmpty()) {
        return res.status(400).json({errores: errores.array()})
    }

    //extraer email y password
    const { email, password } = req.body;


    try {
        // revisar que el usuario registrado sea unico
        let usuario = await Usuario.findOne({ email });

        if(usuario) {
            return res.status(400).json({ msg :'el usuario ya existe'});
        }
        

        //crea el nuevo ususario
          usuario = new Usuario(req.body);

         //hashear el password 
         const salt = await bcryptjs.genSalt(10);
         usuario.password = await bcryptjs.hash(password, salt);

          //guardar usuario
          await usuario.save();

          //crear y firmar el JWT
          const payload = {
                usuario: {
                    id: usuario.id
                }
          };

          jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // eso significa 1 hora
          }, (error, token) => {
              if(error) throw error;

              //mensaje de confirmacion
                //mensaje 
          res.json({ token });
             
          });
          
        

        } catch (error) {
            console.log(error);
            res.status(400).send('Hubo un error');
        }
    };

