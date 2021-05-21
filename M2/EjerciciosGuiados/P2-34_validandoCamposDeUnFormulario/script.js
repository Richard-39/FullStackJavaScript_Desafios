var form = document.getElementById("form");
form.addEventListener('submit', function (event){

    event.preventDefault();
    limpiarErrores();

    let textNombre = document.querySelector(".textNombre").value;
    let textTelefono = document.querySelector(".textTelefono").value;
    let textEmail = document.querySelector(".textEmail").value;

    let resultado = validar (textNombre, textTelefono, textEmail);

    if (resultado) {
        exito();
    }

});

function limpiarErrores(){
    document.querySelector(".errorNombre").innerHTML = "";
    document.querySelector(".errorTelefono").innerHTML = "";
    document.querySelector(".errorEmail").innerHTML = "";
    document.querySelector(".resultado").innerHTML = "";
};

function exito(){
    document.querySelector(".resultado").innerHTML = "Formulario pasó la validación.";
};

function validar(a,b,c){

    let pasamosLaValidacion = true;
    let validacionNombre = /[a-zA-Z]/gim;
    
    if (!validacionNombre.test(a)){
        document.querySelector(".errorNombre").innerHTML="Ingrese un Nombre válido";
        pasamosLaValidacion = false;
    };

    let validacionTelefono = /^[-]?[0-9]+[\.]?[0-9]+$/; 
    // /^[-]?[0-9]+[\.]?[0-9]+$/
    // /^[0-9]+$/gim

    if (!validacionTelefono.test(b)){
        document.querySelector(".errorTelefono").innerHTML="Ingrese un Teléfono válido";
        pasamosLaValidacion = false;
    };

    let validacionEmail = /[A-Z0-9._%+-]+@[A-Z0-9-]+.[A-Z]/gim;

    if (!validacionEmail.test(c)){
        document.querySelector(".errorEmail").innerHTML="Ingrese un Email válido";
        pasamosLaValidacion = false;
    };

    return pasamosLaValidacion;

};