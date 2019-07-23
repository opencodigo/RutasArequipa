window.onload = () => {
  let refRutas = firebase.database().ref();
  let refRutasIda = refRutas.child("ida");

  let centroPorDefecto = { lat: -16.389696234120294, lng: -71.5470286520632 };
  var bounds = new google.maps.LatLngBounds();

  //----------------------------------REPLICA 3------------------------------------------------//

  function initMapIda() {
    let mapaGoogleVista = new google.maps.Map(
      document.getElementById("mapaVista"),
      {
        center: centroPorDefecto,
        zoom: 14
      }
    );

    let listRutaIda = [];
    let refIda = firebase
      .database()
      .ref("rutas")
      .once("value", function (snapshot) {
        let datos = snapshot.val();
        console.log(datos);

        for (const key in datos) {
            console.log("Ida de la clave " + key);
            console.log("Ida de la clave " + datos[key].nombre);
            
            for (const clave in datos[key].ida) {
                console.log("lat"+datos[key].ida[clave].lat);
                console.log("lng"+datos[key].ida[clave].lng);
            }
            
        }


        // snapshot.forEach(child => {
        //   listRutaIda.push({
        //     lat: child.val().ida.child.lat,
        //     lng: child.val().ida.child.lng
        //   });
        // });
        // console.log(listRutaIda);
      });

    let getRutasIda = () => {
      refIda.on();
    };
  }

  initMapIda();
  /**
   * recibiendo datos desde Firebase
   */

  //-----------------------------VISTA DE MAPAS------------------------------------------------------------------------------------------------------------------------//
  let configurarListenersVista = () => {
    // asignando evento click a un mapa de google
    mapaGoogleVista.addListener("click", e => {
      //$.notify("se hizo click en el mapa", "success");
      // imprimiendo las coordenadas de donde se
      // ha efectuado el click en el mapa
      console.log(e.latLng.lat());
      console.log(e.latLng.lng());

      // colocando un marcador en el mapa
      let marcadorNuevo = new google.maps.Marker({
        position: {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        },
        map: mapaGoogleVista,
        icon: "./icons/neddles.png"
      });

      // Dibujando el polyline entre la coordenada anterior y el nuevo
      // punto
      // en el primer click, "coordenadaAnterior", será [undefined]
      // es por ello que deberá entrar a la zona de "else"
      // del segundo en adelante, "coordenadaAnterior" tendra un valor
      // definido y entrará a la zona de "if"
      // en ambos casos en necesario guardar el valor de la variable
      // coordenadaAnterior,
      if (coordenadaAnterior2) {
        // console.log("ya existía una coord anterior");

        // uusare la logica con la coordenadAnterior
        // coordenadas guardará el valor de la nueva y la antigua coordenada
        let coordenadas = [
          {
            //  nueva
            lat: e.latLng.lat(),
            lng: e.latLng.lng()
          },
          {
            // antigua
            lat: coordenadaAnterior2.lat,
            lng: coordenadaAnterior2.lng
          }
        ];

        // creando el polyline o la linea blanca
        let lineaBlanca = new google.maps.Polyline({
          path: coordenadas,
          geodesic: true,
          strokeColor: "#1654E1",
          strokeOpacity: 1.0,
          strokeWeight: 2
        });

        lineaBlanca.setMap(mapaGoogleVista);

        // GUARDAR LA NUEVA COORDENADA COMO ANTERIOR
        coordenadaAnterior2 = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        };
        //coordenadasVUELTA.push(coordenadaAnterior2);
        console.log("coordenadasVUELTA");
        console.log(coordenadasVUELTA);
      } else {
        // console.log("Es el primer click");
        coordenadaAnterior2 = {
          lat: e.latLng.lat(),
          lng: e.latLng.lng()
        };
        // coordenadasVUELTA.push(coordenadaAnterior2);
      }
    });
  };
  //configurarListenersVista();
};
