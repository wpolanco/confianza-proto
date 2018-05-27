$(document).ready(function () {
  $('#tbl-clientes').DataTable({
          "searching":true,
          "language": {
            "search": "Buscar registros:"
          }

        });

    });

$(function(){
  //Funcion ajax para asignar rutas cliente
  $('#tbl-clientes #btn-asignar').click(function(e){
      e.preventDefault();
      var elemento = $(this);
      var idCliente = elemento.parent().parent().find('#id_cliente').text();
      var idRuta = $('#id_ruta').val();
      //console.log(idCliente);
      //console.log(idRuta);

      var confirmar = confirm('Desea asignar este cliente a la ruta?');

      if(confirmar){

              $.ajax({
                  url : 'http://localhost:3000/editarasignarruta',
                  method: 'post',
                  data: {idCliente: idCliente, idRuta: idRuta},
                  success: function(res){

                    if(res.res){
                      elemento.parent().parent().remove();
                    }
                  },
                  error: function(XMLHttpRequest, textStatus, errorThrown) {
                      alert("Status: " + textStatus); alert("Error: " + errorThrown); 
  }

              });
      }


  });
});
