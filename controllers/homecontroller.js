//Home controller
module.exports = {
  //funciones del controlador
  index : function(req, res, next){
    res.render('index',{title: 'Demo para empresa LA CONFIANZA'});
  }

}
