// Obtencion de los elementos desde el dom
var result = document.querySelector(".resultado");
var value1 = document.getElementById("valor1");
var value2 = document.getElementById("valor2");

// se le da la funcionalidad a los botones de suma y resta
document.getElementById("btn-sumar").addEventListener("click", function(){
    result.innerHTML = parseInt(value1.value) + parseInt(value2.value);
});

document.getElementById("btn-restar").addEventListener("click", function(){
    let rest = parseInt(value1.value) - parseInt(value2.value);
    // si la resta es menor que cero, el resultado es cero.
    if (rest < 0) rest = 0;
    result.innerHTML = rest;
});