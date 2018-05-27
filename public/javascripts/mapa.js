var clientes = '!{JSON.stringify(clientes)}';
console.log(clientes);
var divMapa = document.getElementById('mapa');
navigator.geolocation.getCurrentPosition(fn_ok, fn_mal);
function fn_mal(){}
function fn_ok(rta){
  //var lat = rta.coords.latitude;
  //var lon = rta.coords.longitude;
  var lat = clientes[0].latitud
  var lon = clientes[0].longitud
  var gLatLon = new google.maps.LatLng(lat, lon);
  var objConfig = {
      zoom : 17,
      center: gLatLon
  }
  var gMapa = new google.maps.Map( divMapa, objConfig);
  var objConfigMarker = {
    position: gLatLon,
    animation: google.maps.Animation.DROP,
    map: gMapa,
    draggable: true,
    title: "Usted está acá"
  }/*
  var gMarker = new google.maps.Marker(objConfigMarker);
  var gCoder = new google.maps.Geocoder();
  var objInformacion ={
    address: 'La Locanda, Patio Colombia'
  }
    gCoder.geocode(objInformacion, fn_coder);
  function fn_coder(datos){
    var coordenadas = datos[0].geometry.location;
    var config = {
      map: gMapa,
      animation: google.maps.Animation.DROP,
      position: coordenadas,
      title: 'La Locanda'
    }
    var gMarkerDV = new google.maps.Marker(config);
        gMarkerDV.setIcon('https://cdn0.iconfinder.com/data/icons/isometric-city-basic-buildings/128/restaurant-32.png');

    var objHTML = {
      content : '<div style="width:150px; height: 50px"><h2>Ejemplo</h2></div>'
    }
    var gInfoW = new google.maps.InfoWindow(objHTML);
    google.maps.event.addListener(gMarkerDV, 'click', function(){
        gInfoW.open(gMapa, gMarkerDV);
    });
  }*/
}
