window.onload = function(){
    //Conexion a la BD de firebase Autenticacion:
    var firebaseConfig = {
        apiKey: "AIzaSyD6nw5xhwKcfSUatFUUI2UvHP_Sd778DTw",
        authDomain: "rutasarequipa.firebaseapp.com",
        databaseURL: "https://rutasarequipa.firebaseio.com",
        projectId: "rutasarequipa",
        storageBucket: "",
        messagingSenderId: "930515496626",
        appId: "1:930515496626:web:e8de807f7f5fe8b0"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    //Referencia A Usuarios.
    //var RefUsuario = firebase.database().ref("usuarios");
    let IniciarSession = ()=>{
        let email = $("#inputEmail").val().trim();
            let password = $("#inputPassword").val().trim();
            
            firebase.auth().signInWithEmailAndPassword(email, password)
            .then(()=>{
                console.log("Session ´perfect");
                
                $("#modalIniciarSesion").modal("hide");
            })
            .catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });
    }
    //Funcion Cerrar Funcion
    let CerraSession = (e) =>{
        e.preventDefault();
            firebase.auth().signOut()
                            .then(()=>{
                                //location = "./Login.html";
                                console.log("Session cerrada Perfectamente");
                                // redireccionar al index cuando la sesión se cierra
                            })
                            .catch(()=>{
                                console.log("Error Al Cerrar Session");    
                            });
    };
    let CrearCuenta = () =>{
        let email = $("#inputEmails").val().trim();
            let password = $("#inputPasswords").val().trim();
            firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(()=>{
                $("#modalCrearCuenta").modal("hide");
                alert("Cuenta Creada bien");
            }).catch(function(error){
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error);
            });
    };
    let validadSession = () =>{
        firebase.auth().onAuthStateChanged(function (user){
            if (user) {
                $("#btnUsuario").html(user.email);
            }
            else{

            }
        })
    }
    //abre el modal de inicio Session:
    let AbrirModalSession = (e)=>{
        e.preventDefault(e);
        $("#modalIniciarSesion").modal("show");
    };
    //Funcion abrir Mpdal Crear cuenta.
    let AbrirModalCrearCuenta = (e)=>{

        $("#modalCrearCuenta").modal("show");
    }
    //Boton Iniciar Session;
    $("#btnIniciarSession").click(AbrirModalSession);
    //boton Abrir Crear Cuenta
    $("#btnCrearCuenta").click(AbrirModalCrearCuenta);
    //boton ingreso Session:
    $("#btnIngresar").click(IniciarSession);
    //Boton cerrar Session.
    $("#btnCerrarSession").click(CerraSession);
    //boton crear Cuenta:
    $("#btnCuentaCreada").click(CrearCuenta);
    //llamando la funcion ValidarSession;
    validadSession();
};
