var mysql = require('mysql');
var dateformat = require('dateformat')
//Productos controller
module.exports = {
  //funciones del controlador
  getRutas : function(req, res, next){
    var config = require('../database/config');
    var db = mysql.createConnection(config);
    db.connect();
    var rutas = null;
    db.query('SELECT * FROM ruta order by id_ruta',function(err, rows, fields){
      if(err) throw err;
      rutas = rows;
      db.end();
      res.render('rutas/verRutas',{rutas: rutas});
    });
  },

  getNuevaRuta : function(req, res, next){
      res.render('rutas/nuevo');
  },

  postNuevaRuta : function(req, res, next){
    //    console.log(req.body);
    var fecha_actual = new Date();
    var fecha = dateformat(fecha_actual, 'yyyy-mm-dd h:MM:ss');

    var ruta = {
      descripcion : req.body.descripcion,
      fecha_creacion: fecha
    }

    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();
    db.query('INSERT INTO ruta SET ?', ruta, function(err, rows, fields){
      if(err) throw err;

      db.end();

    });

    res.render('rutas/nuevo', {info: 'Ruta creada exitosamente'});
  },

  eliminarRuta : function(req, res, error){
    var id = req.body.id;
    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    var respuesta = {res: false};

    db.query('DELETE FROM ruta WHERE id_ruta=?', id, function(err,rows, fields){
      if(err)throw err;

      db.end();
      respuesta.res= true;
      res.json(respuesta);
    });

  },
  eliminarRutaCliente : function(req, res, error){
    var idCliente = req.body.idCliente;
    var idRuta = req.body.idRuta;

    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    var respuesta = {res: false};

    db.query('DELETE FROM rutaCliente WHERE cliente_idCliente = ? and ruta_idRuta=?', [idCliente, idRuta], function(err,rows, fields){
      if(err)throw err;

      db.end();
      respuesta.res= true;
      res.json(respuesta);
    });

  },

  getModificarRuta: function(req, res, next){
    var id = req.params.id;
    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    var ruta = null;

    db.query('SELECT * FROM ruta WHERE id_ruta = ?', id, function(err, rows, fields){
        if(err) throw err;

        ruta = rows;
        db.end();
        res.render('rutas/modificar', {ruta: ruta});
    });
  },

  getClientesRutas: function(req, res, next){
    var id = req.params.id;
    var config = require('.././database/config');
    var connection = mysql.createConnection(config);
  //  db.connect();

    var clientes = null;
    var ruta = null;


    connection.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
        console.log('connected as id ' + connection.threadId);
      });

    /* Begin transaction */
    connection.beginTransaction(function(err) {
        if (err) { throw err; }
        //connection.query('SELECT * FROM cliente order by id_cliente', function(err, result) {
        connection.query('select cliente.id_cliente, cliente.cedula, cliente.descripcion, cliente.sector, cliente.latitud, cliente.longitud from cliente left join rutacliente  on cliente.id_cliente = rutacliente.cliente_idCliente right join ruta on rutacliente.ruta_idRuta = ruta.id_ruta where ruta.id_ruta = ? and cliente.id_cliente IS NOT NULL order by cliente.id_cliente', id, function(err,result){
          if (err) {
            connection.rollback(function() {
              throw err;
            });
          }

          clientes = result;

          connection.query('SELECT * FROM ruta where id_ruta = ?', id, function(err, result) {
            if (err) {
              connection.rollback(function() {
                throw err;
              });
            }

            ruta= result;
            connection.commit(function(err) {
              if (err) {
                connection.rollback(function() {
                  throw err;
                });
              }
              console.log('Transaction Complete.');
              res.render('rutas/verClientesRuta', {clientes: clientes, ruta: ruta});
              connection.end();
            });
          });
        });
      });
      /* End transaction */

  },

  getAsignarRuta: function(req, res, next){
    var id = req.params.id;
    var config = require('.././database/config');
    var connection = mysql.createConnection(config);
  //  db.connect();

    var clientes = null;
    var ruta = null;


    connection.connect(function(err) {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
        console.log('connected as id ' + connection.threadId);
      });

    /* Begin transaction */
    connection.beginTransaction(function(err) {
        if (err) { throw err; }
        //connection.query('SELECT * FROM cliente order by id_cliente', function(err, result) {
        connection.query('select cliente.id_cliente, cliente.cedula, cliente.descripcion, cliente.sector from cliente where cliente.id_cliente not in (select cliente.id_cliente from cliente left join rutacliente  on cliente.id_cliente = rutacliente.cliente_idCliente right join ruta on rutacliente.ruta_idRuta = ruta.id_ruta where ruta.id_ruta = ? and cliente.id_cliente IS NOT NULL order by cliente.id_cliente )', id, function(err,result){
          if (err) {
            connection.rollback(function() {
              throw err;
            });
          }

          clientes = result;

          connection.query('SELECT * FROM ruta where id_ruta = ?', id, function(err, result) {
            if (err) {
              connection.rollback(function() {
                throw err;
              });
            }

            ruta= result;
            connection.commit(function(err) {
              if (err) {
                connection.rollback(function() {
                  throw err;
                });
              }
              console.log('Transaction Complete.');
              res.render('rutas/asignar', {clientes: clientes, ruta: ruta});
              connection.end();
            });
          });
        });
      });
      /* End transaction */

  },
  postAsignarRuta : function(req, res, error){
    var idCliente= req.body.idCliente;
    var idRuta = req.body.idRuta;

    console.log(idRuta);
    console.log(idCliente);

    var fecha_actual = new Date();
    var fecha = dateformat(fecha_actual, 'yyyy-mm-dd h:MM:ss');

    var rutaCliente = {
      ruta_idRuta: idRuta,
      cliente_idCliente: idCliente,
      fecha_creacion: fecha
    }
    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    var respuesta = {res: false};

    db.query('INSERT INTO rutacliente SET ?', rutaCliente, function(err, rows, fields){
      if(err)throw err;

      db.end();
      respuesta.res= true;
      res.json(respuesta);
    });

  },
  postModificarRuta : function(req, res, next){

    var ruta = {
      descripcion : req.body.descripcion
    };

    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    db.query('UPDATE ruta SET ? WHERE ?', [ruta, {id_ruta: req.body.id_ruta}], function(err, rows, fields){
      if(err) throw err;

      db.end();

    });

    res.redirect('/rutas');
  }

}
