var mysql = require('mysql');
var dateformat = require('dateformat')
//Productos controller
module.exports = {
  //funciones del controlador
  getClientes : function(req, res, next){
    var config = require('../database/config');
    var db = mysql.createConnection(config);
    db.connect();
    var clientes = null;
    db.query('SELECT * FROM cliente order by id_cliente',function(err, rows, fields){
      if(err) throw err;
      clientes = rows;
      db.end();
      res.render('clientes/verClientes',{clientes: clientes});
    });
  },

  postBuscarClientes : function(req, res, next){
    var config = require('../database/config');

    var db = mysql.createConnection(config);
    db.connect();
    var descripcion = req.body.descripcion;
    //console.log(nombre);
    var sql = 'SELECT * FROM cliente WHERE descripcion LIKE ?';
    var param = [descripcion];
    sql = mysql.format(sql, '%'+param+'%');

    var clientes = null;
    db.query(sql, function(err, rows, fields){
      if(err) throw err;

      clientes = rows;
      //console.log(productos);

      db.end();
      res.render('clientes/verClientes',{clientes: clientes});
    });
  },

  getNuevoCliente : function(req, res, next){
      res.render('clientes/nuevo');
  },

  postNuevoCliente : function(req, res, next){
    //    console.log(req.body);
    var fecha_actual = new Date();
    var fecha = dateformat(fecha_actual, 'yyyy-mm-dd h:MM:ss');

    var cliente = {
      cedula : req.body.cedula,
      descripcion : req.body.descripcion,
      calle : req.body.calle,
      numero: req.body.numero,
      sector : req.body.sector,
      provincia  : req.body.provincia,
      latitud : req.body.latitud,
      longitud : req.body.longitud,
      fecha_creacion: fecha
    }
    //console.log(producto);

    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();
    db.query('INSERT INTO cliente SET ?', cliente, function(err, rows, fields){
      if(err) throw err;

      db.end();

    });

    res.render('clientes/nuevo', {info: 'Cliente creado exitosamente'});
  },

  eliminarCliente : function(req, res, error){
    var id = req.body.id;
    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    var respuesta = {res: false};

    db.query('DELETE FROM cliente WHERE id_cliente=?', id, function(err,rows, fields){
      if(err)throw err;

      db.end();
      respuesta.res= true;
      res.json(respuesta);
    });

  },

  getModificarCliente: function(req, res, next){
    var id = req.params.id;
    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    var cliente = null;

    db.query('SELECT * FROM cliente WHERE id_cliente = ?', id, function(err, rows, fields){
        if(err) throw err;

        cliente = rows;
        db.end();
        res.render('clientes/modificar', {cliente: cliente});
    });
  },

  postModificarCliente : function(req, res, next){

    var cliente = {
      cedula : req.body.cedula,
      descripcion : req.body.descripcion,
      calle : req.body.calle,
      numero : req.body.numero,
      sector : req.body.sector,
      provincia  : req.body.provincia,
      latitud : req.body.latitud,
      longitud : req.body.longitud
    };

    var config = require('.././database/config');
    var db = mysql.createConnection(config);
    db.connect();

    db.query('UPDATE cliente SET ? WHERE ?', [cliente, {id_cliente: req.body.id_cliente}], function(err, rows, fields){
      if(err) throw err;

      db.end();

    });

    res.redirect('/clientes');
  }

}
