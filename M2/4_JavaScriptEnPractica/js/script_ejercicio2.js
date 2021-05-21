// se obtienen los elementos a trabajar desde el dom
var box = document.getElementById("caja");
var buttons = document.getElementsByTagName("button");

// a cada boton se le da la funcionalidad que cuando se le 
// haga click cambie el color de la caja grande por el color que tiene
for (let i=0; i< buttons.length; i++){
    buttons[i].addEventListener("click", function(){
        box.style.backgroundColor = buttons[i].style.backgroundColor;
    });
};


