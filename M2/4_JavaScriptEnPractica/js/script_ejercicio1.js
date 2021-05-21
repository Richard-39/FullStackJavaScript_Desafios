// obtencion del formulario por el dom
var form = document.getElementById("formulario");

// adision de la funcion al submit
form.addEventListener("submit", function(event){

    // evitamos que el formulario reinicie la pagina
    event.preventDefault();

    // limpiamos los campos de mensaje de error
    clean();

    // obtenemos los valores de los campos del formulario
    var name = document.getElementById("nombre").value;
    var about = document.getElementById("asunto").value;
    var message = document.getElementById("mensaje").value;

    // usamos una funcion que valida si los campos son correctos
    if (validate (name, about, message)){
        document.querySelector(".resultado").innerHTML = "Mensaje enviado con exito !!!";
    } 
});


function validate (name, about, message){

    // handler que informa si el formulario esta validado o no
    var isValidate = true;

    // expresion regular de validacion de texto
    var regExp = /[a-zA-Z]/img;
    // curiosamente el atributo g me da error en algunos campos con pocos caracteres.

    //validadores por cada campo, en caso de error aparece mensaje correspondiente.
    if (!regExp.test(name)){
        document.querySelector(".errorNombre").innerHTML = "El nombre es requerido";
        isValidate = false;
    };

    if (!regExp.test(about)){
        document.querySelector(".errorAsunto").innerHTML = "El Asunto es requerido";
        isValidate = false;
    };

    if (!regExp.test(message)){
        document.querySelector(".errorMensaje").innerHTML = "El Mensaje es requerido";
        isValidate = false;
    };

    return isValidate;
};

function clean () {
    // se obtienen todos los elementos de información y se les borra el contenido.
    var p = document.getElementsByTagName("p");
    for (let i=0; i<p.length; i++) {
        p[i].innerHTML = "";
    }
    document.getElementsByClassName("resultado")[0].innerHTML = "";
}