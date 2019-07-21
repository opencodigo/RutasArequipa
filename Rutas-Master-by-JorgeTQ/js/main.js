import { firebaseConfig } from "./myFireBD.js";
import { comparador } from "./utilitarios.js"
import { paginas } from "./paginas.js"

firebase.initializeApp(firebaseConfig);
let refUsuarios = firebase.database().ref("usuarios");
console.log(refUsuarios)

//-------------------------------INICIO DE SESION---------------------------------------//

let abrirModalInicioSesion = (e) => {
    e.preventDefault();
    $("#modalIniciarSesion").modal("show");

    console.log("se hizo click en iniciar Sesion")
}

let abrirModalCrearCuenta = (a) => {
    a.preventDefault();
    $("#modalCrearCuenta").modal("show")
}

let cerrarSesion = (e) => {
    e.preventDefault();
    firebase.auth().signOut()
        .then(() => {
            // redireccionar al index cuando la sesión se cierra
            location = "./index.html";
        })
        .catch(() => {

        });
}

let iniciarSesion = () => {
    let email = $("#inputEmail").val().trim();
    let password = $("#inputPassword").val().trim();

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            $("#modalIniciarSesion").modal("hide");
        })
        .catch(function (error) {
            // Handle Errors here.
            alert("Ud. no esta rEgistrado aún,disculpe")
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        });
}


let verificarSesion = () => {
    firebase.auth().onAuthStateChanged(function (user) {
        //me devuelve el usuario en el cual se encuentra , y este usuario esta con id, emil, ..etc
        if (user) {
            console.log("Habia una sesion iniciada");
            // HAy una sesion los botones deben ser habilitados---------------------------;

            $("#btnPagCrear").removeAttr('disabled');
            $("#btnPagVer").removeAttr('disabled');


            $("#pestaña_Crear").show();
            $("#pestaña_Ver").show();
            //-----------------------------------------------------------------------------//

            $("#btnUsuario").html(user.email);
            $("#btnRegistrar").hide();
            $("#btnIniciarSesion").hide();
            $("#btnCerrarSesion").show();

            //Esta en la realtime BD? sino crealo:
            refUsuarios.on("value", dataSnapshot => {
                //"existe" traera si exixte o no

                //user.uid es el KEY el cual se agregaral BD, osea esta funcion 
                let existe = dataSnapshot.hasChild(user.uid);
                // console.log(user.uid)
                if (!existe) {
                    // crear al usuario en la realtimeDatabase
                    refUsuarios.child(user.uid).set({
                        email: user.email,
                        admin: $("#checkAdmin").prop('checked')
                    }).then(() => {
                        // $.notify("Usuario REGISTRADO correctamente", "success");
                    })
                }
                else {
                    let cliente = dataSnapshot.val();
                    //porque snapshot esta poicionado en el id de interez?
                    console.log(cliente[user.uid].admin); // FORMA 1 PARA CONSUMIR LOS DATOS de dataSnapshot
                    let refAdmin = cliente[user.uid].admin //refAdmin es booleano
                    console.log(refAdmin)
                    if (refAdmin === true) {
                        //habilitar las ventanas

                    }
                    else {
                        //no es admin 
                        //las ventasn se muestranh pero no pueden ser tocadas
                        $("#btnCrearEmpresas").attr('disabled', 'disabled');

                    }

                }
            })



        } else {
            console.log("No habia una sesion iniciada o el usuario cerró sesion");
            $("#btnUsuario").html("Iniciar Sesión");

            $("#btnRegistrar").show();
            $("#btnIniciarSesion").show();
            $("#btnCerrarSesion").hide();

            // console.log("NADIE AH INICIADO DEBERIA ESTAR TODO DESABILITADO")
            // $("#contenedor_de_botones").prop('disabled', false);

            $("#btnPagCrear").attr('disabled', 'disabled');
            $("#btnPagVer").attr('disabled', 'disabled');
            //---------------------------------------//
            
            $("#pestaña_Crear").hide();
            $("#pestaña_Ver").hide();
        }


    })
}

let crearCuenta = () => {
    let email = $("#inputEmailCrear").val().trim();
    let password = $("#inputPasswordCrear1").val().trim();
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            $("#modalCrearCuenta").modal("hide");
        })
        .catch(function (error) {
            console.log(error);
        });

}

verificarSesion();
paginas();

$("#btnUsuario").click(abrirModalInicioSesion);
$("#btnIniciarSesion").click(abrirModalInicioSesion);
$("#btnRegistrar").click(abrirModalCrearCuenta);
$("#btnIngresar").click(iniciarSesion);
$("#btnCrearCuenta").click(crearCuenta);

$("#btnCerrarSesion").click(cerrarSesion);
$("#inputPasswordCrear2").keyup(function (e) {
    let iguales = comparador($("#inputPasswordCrear1").val().trim(),
        $(this).val().trim());
    console.log(iguales);

    if (!iguales) {
        $("#helpPassword").html("Las Contraseñas no coinciden");
        $("#helpPassword").removeAttr("hidden");
        $("#helpPassword").attr("class", "form-text text-danger");

        $(this).attr("class", "form-control is-invalid");
        $("#btnCrearCuenta").attr("disabled", true);
    } else {
        $("#helpPassword").attr("hidden", true);
        $("#btnCrearCuenta").removeAttr("disabled");
        $(this).attr("class", "form-control is-valid");
    }
});



















