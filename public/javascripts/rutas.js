$(document).ready(function () {
  $('#tbl-rutas').DataTable({
          "searching":true,
          "language": {
            "search": "Buscar registros:"
          }

        });

    });

$(function(){
  //Funcion ajax para buscar productos
  /*
  $('#btn-buscar').click(function(e){
    e.preventDefault();
    var nombreProducto = $('#nombre-producto').val();
    $('#nombre-producto').val('');
    var request = $.ajax({
        url : 'http://localhost:3000/buscarproducto',
        method: 'post',
        data: {nombre: nombreProducto}
    });

    request.done(function(msg){
      console.log(JSON.stringify(msg));
      var call = function(res){
        res.render('/productos/verProductos', {productos: JSON.stringify(msg)});
      }
      //request.render('/productos/verProductos',msg);
    });

    request.fail(function(xhr, msg){
       console.log('Falla: ' + msg);
    });
  });
*/

  //Funcion ajax para eliminarproducto
  $('#tbl-rutas #btn-eliminar').click(function(e){
      e.preventDefault();
      var elemento = $(this);
      var id = elemento.parent().parent().find('#id_ruta').text();

      var confirmar = confirm('Desea eliminar la ruta?');

      if(confirmar){

              $.ajax({
                  url : 'http://localhost:3000/eliminarruta',
                  method: 'post',
                  data: {id: id},
                  success: function(res){
                    //console.log(res);
                    if(res.res){
                      elemento.parent().parent().remove();
                    }
                  }

              });
      }


  });
});
