var express = require('express');
var router = express.Router();
var controllers = require('.././controllers');

/* GET home page. */
router.get('/', controllers.homecontroller.index);

// route para clientes
router.get('/clientes',controllers.clientescontroller.getClientes);
router.post('/buscarcliente', controllers.clientescontroller.postBuscarClientes);
router.get('/nuevo', controllers.clientescontroller.getNuevoCliente);
router.post('/crearcliente', controllers.clientescontroller.postNuevoCliente);
router.post('/eliminarcliente', controllers.clientescontroller.eliminarCliente);
router.get('/modificarcliente/:id', controllers.clientescontroller.getModificarCliente);
router.post('/editar', controllers.clientescontroller.postModificarCliente);

// route para rutas
router.get('/rutas',controllers.rutascontroller.getRutas);
router.get('/nuevaruta', controllers.rutascontroller.getNuevaRuta);
router.post('/crearruta', controllers.rutascontroller.postNuevaRuta);
router.post('/eliminarruta', controllers.rutascontroller.eliminarRuta);
router.get('/modificarruta/:id', controllers.rutascontroller.getModificarRuta);
router.get('/asignarclienteruta/:id', controllers.rutascontroller.getAsignarRuta);
router.post('/editarruta', controllers.rutascontroller.postModificarRuta);
router.post('/editarasignarruta', controllers.rutascontroller.postAsignarRuta);
router.get('/validarclientes/:id', controllers.rutascontroller.getClientesRutas);
router.post('/eliminarrutacliente', controllers.rutascontroller.eliminarRutaCliente);



module.exports = router;
