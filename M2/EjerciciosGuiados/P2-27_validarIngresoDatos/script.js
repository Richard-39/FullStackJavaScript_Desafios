
var buscar = document.getElementById("buscar");
buscar.addEventListener("click",validar);

function validar(){
    var animal = document.querySelector(".animal").value;
    var patron1 = /gato/i;
    var patron2 = /perro/i;
    if (animal.match(patron1) || animal.match(patron2)) {
        alert("palabra ingresada permitida");
    } else {
        alert("avispate!");
    };
}