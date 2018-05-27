$(document).ready(function () {
  $('#tbl-clientes').DataTable({
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
  $('#tbl-clientes #btn-eliminar').click(function(e){
      e.preventDefault();
      var elemento = $(this);
      var id = elemento.parent().parent().find('#id_cliente').text();

      var confirmar = confirm('Desea eliminar el cliente?');

      if(confirmar){

              $.ajax({
                  url : 'http://localhost:3000/eliminarcliente',
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
  $('#tbl-clientes #btn-eliminar-asignado').click(function(e){
      e.preventDefault();
      var elemento = $(this);
      var idCliente = elemento.parent().parent().find('#id_cliente').text();
      var idRuta = $('#id_ruta').val();

      var confirmar = confirm('Desea eliminar este cliente de la ruta?');

      if(confirmar){

              $.ajax({
                  url : 'http://localhost:3000/eliminarrutacliente',
                  method: 'post',
                  data: {idCliente: idCliente, idRuta: idRuta},
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
