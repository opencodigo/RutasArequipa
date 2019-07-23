//import { firebaseConfig } from "./myFireBD.js";

let refRutas = firebase.database().ref("rutas");
let refStorage = firebase.storage();

let coordenadaAnterior;
let coordenadaAnterior2;
let coordenadasIDA = [];
let coordenadasVUELTA = [];
let centroPorDefecto = { lat: -16.389696234120294, lng: -71.5470286520632 };
var bounds = new google.maps.LatLngBounds();
//----------------------------------REPLICA 1------------------------------------------------//
let mapaGoogle1 = new google.maps.Map(document.getElementById("mapaIda"), {
  center: centroPorDefecto,
  zoom: 14
});
//----------------------------------REPLICA 2------------------------------------------------//
let mapaGoogle2 = new google.maps.Map(document.getElementById("mapaVuelta"), {
  center: centroPorDefecto,
  zoom: 14
});
//-------------------------------------------------------------------------------------------//

//-------------------------------------------------------------------------------------------//

//--------------------------------------FUNCIONALIDAD 1--------------------------------------//

let configurarListeners = () => {
  // asignando evento click a un mapa de google
  mapaGoogle1.addListener("click", e => {
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
      map: mapaGoogle1,
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
    if (coordenadaAnterior) {
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
          lat: coordenadaAnterior.lat,
          lng: coordenadaAnterior.lng
        }
      ];

      // creando el polyline o la linea blanca
      var lineaBlanca1 = new google.maps.Polyline({
        path: coordenadas,
        geodesic: true,
        strokeColor: "#ff00c1",
        strokeOpacity: 1.0,
        strokeWeight: 2
      });

      lineaBlanca1.setMap(mapaGoogle1);
      // console.log("esto es linea blanca1 : ")
      // console.log(lineaBlanca1)

      // GUARDAR LA NUEVA COORDENADA COMO ANTERIOR
      coordenadaAnterior = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      coordenadasIDA.push(coordenadaAnterior);
      console.log("Coordenadas de ida");
      console.log(coordenadasIDA);
    } else {
      // console.log("Es el primer click");
      coordenadaAnterior = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      coordenadasIDA.push(coordenadaAnterior);
    }
  });
};

// posicionActual();
configurarListeners();

//----------------------------------------------------------------------------//

//--------------------------------------FUNCIONALIDAD 2--------------------------------------//

let configurarListeners2 = () => {
  // asignando evento click a un mapa de google
  mapaGoogle2.addListener("click", e => {
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
      map: mapaGoogle2,
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

      lineaBlanca.setMap(mapaGoogle2);

      // GUARDAR LA NUEVA COORDENADA COMO ANTERIOR
      coordenadaAnterior2 = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      coordenadasVUELTA.push(coordenadaAnterior2);
      console.log("coordenadasVUELTA");
      console.log(coordenadasVUELTA);
    } else {
      // console.log("Es el primer click");
      coordenadaAnterior2 = {
        lat: e.latLng.lat(),
        lng: e.latLng.lng()
      };
      coordenadasVUELTA.push(coordenadaAnterior2);
    }
  });
};

// posicionActual();
configurarListeners2();



//----------------funcionSbirCoordenadas-----//
let subirCoordenadas = key => {
  //let refRutas = firebase.database().ref("rutas")

  //posicionamiento en id  con valor key
  let agregandoElmento = refRutas.child(key);
  agregandoElmento.update({ ida: `` });
  agregandoElmento.update({ vuelta: `` });

  for (var i = 0; i < coordenadasIDA.length; i++) {
    //obtener un id unico
    //entrar a id:
    let refIDA = agregandoElmento.child("ida");
    //console.log(refIDA)
    let key2 = refIDA.push().key;
    let referenciaKey2 = refIDA.push(key2);
    referenciaKey2
      .set({
        lat: coordenadasIDA[i].lat,
        lng: coordenadasIDA[i].lng
      })
      .then(llego => {
        console.log("llego la respuesta");
        //console.log(i)
      })
      .catch(error => {
        console.log("ah ocurrido un error");
      });
  }

  for (var i = 0; i < coordenadasVUELTA.length; i++) {
    //obtener un id unico
    //entrar a id:
    let refVUELTA = agregandoElmento.child("vuelta");
    //console.log(refVUELTA)
    let key2 = refVUELTA.push().key;
    let referenciaKey2 = refVUELTA.push(key2);
    referenciaKey2
      .set({
        lat: coordenadasVUELTA[i].lat,
        lng: coordenadasVUELTA[i].lng
      })
      .then(llego => {
        console.log("llego la respuesta");
        //console.log(i)
      })
      .catch(error => {
        console.log("ah ocurrido un error");
      });
  }
}; //-------------//-funcionSbirCoordenadas-----//

let SubirFoto = key => {
  let foto = document.getElementById("inputFoto").files[0];
  let refStorageEmpresa = refStorage.ref().child("ImgEmpresa");
  let nombre = foto.name;
  let nombreFinal = key + "-" + nombre;
  let metadata = { contentType: foto.type };

  refStorageEmpresa
    .child(nombreFinal)
    .put(foto, metadata)
    .then(respuesta => {
      return respuesta.ref.getDownloadURL();
    })
    .then(url => {
      console.log(url);
      let refRutaCreada = refRutas.child(key);
      return refRutaCreada.update({ imagen: url });
    })
    .then(() => {
      alert("SE ha subido con exxito");
      $("#formCrearEmpresa").trigger("reset");

      coordenadasIDA = [];
      coordenadasVUELTA = [];

      location.reload(true);

      //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    })
    .catch(error => {
      console.log(error);
    });
};

let mandaraBD = () => {
  let key = refRutas.push().key;
  let referenciaKey = refRutas.child(key);

  referenciaKey
    .set({
      nombre: $("#inputNombre")
        .val()
        .trim()
    })
    .then(() => {
      subirCoordenadas(key);
      SubirFoto(key);
      console.log("ya se subio xd");
    })
    .catch(error => {
      console.log(error);
    });
};

$("#btnCrearEmpresas").click(e => {
  e.preventDefault();
  console.log("muy pronmto vamos a enviar");
  mandaraBD();
});
