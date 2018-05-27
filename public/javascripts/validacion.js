$(function(){
  $('.form-nuevocliente form').form({
      cedula : {
          identifier : 'cedula',
          rules: [
            {
              type: 'empty',
              prompt: 'Por favor ingrese su cédula o RNC'
            }
          ]
      },
      descripcion : {
          identifier : 'descripcion',
          rules: [
            {
              type: 'empty',
              prompt: 'Por favor ingrese una descripcion'
            }
          ]
      },

      calle : {
        identifier : 'calle',
        rules: [
          {
            type: 'empty',
            prompt: 'Por favor ingrese la calle'
          }
        ]
      },

          sector : {
            identifier : 'sector',
            rules: [
              {
                type: 'empty',
                prompt: 'Por favor ingrese el sector'
              }
        ]   
      },
          provincia : {
            identifier : 'provincia',
            rules: [
              {
                type: 'empty',
                prompt: 'Por favor ingrese la provincia'
              }
        ]
      },
          latitud : {
            identifier : 'latitud',
            rules: [
              {
                type: 'empty',
                prompt: 'Por favor ingrese la latitud'
              }
        ]
      },

          longitud : {
            identifier : 'longitud',
            rules: [
              {
                type: 'empty',
                prompt: 'Por favor ingrese la longitud'
              }
        ]
      }

  });
  $('.form-nuevaruta form').form({
    descripcion : {
        identifier : 'descripcion',
        rules: [
          {
            type: 'empty',
            prompt: 'Por favor ingrese una descripcion'
          }
        ]
    },
  });
});
