import Animal from "./Animal.js";
import Leon from "./Leon.js";
import Lobo from "./Lobo.js";
import Oso from "./Oso.js";
import Serpiente from "./Serpiente.js";
import Aguila from "./Aguila.js";
import animalesData from "./animalesJson.js";

var animalitos = [];

var img, sonido, nomAnimal;

$('#animal').change(async(e)=>{
    nomAnimal = $('#animal option:selected').val();
    const {animales} = await animalesData;
    const animalObject = animales.find((item)=>item.name == nomAnimal);
    img = `/assets/imgs/${animalObject.imagen}`;
    sonido = `/assets/sounds/${animalObject.sonido}`;
    $('#preview').css({"background-image": `url(${img})`, "background-size": "cover"});
});

$('#btnRegistrar').click( async (e) =>{

    var edad = $('#edad option:selected').val();
    var comentarios = $('#comentarios').val();

    if(edad && comentarios && nomAnimal && $('select#edad').prop('selectedIndex') != 0){

        var newAnimal;
    
        switch (nomAnimal) {
            case "Leon": 
                newAnimal = new Leon(nomAnimal, edad, img, comentarios, sonido);
                break;
            case "Lobo": 
                newAnimal = new Lobo(nomAnimal, edad, img, comentarios, sonido);
                break;
            case "Oso": 
                newAnimal = new Oso(nomAnimal, edad, img, comentarios, sonido);
                break;
            case "Serpiente": 
                newAnimal = new Serpiente(nomAnimal, edad, img, comentarios, sonido);
                break;
            case "Aguila": 
                newAnimal = new Aguila(nomAnimal, edad, img, comentarios, sonido);
                break;
            default: alert("debe elegir un animal.");
        }
    
        animalitos.push(newAnimal);
        $('#comentarios').val("");
        $('select#animal').prop('selectedIndex', 0);
        $('select#edad').prop('selectedIndex', 0);
        nomAnimal = "";
        edad = "";

        refreshPanel();
    } else {
        alert("Complete todos los campos");
    }

});

function setUp(){
    $('#Animales').html("");
    $('<div id="animalesContent" class="row">' +
    '</div>').appendTo('#Animales');
}

function refreshPanel() {
    $('#animalesContent').html("");
    if (animalitos.length > 0) {
        animalitos.forEach((animalito, index) => {
            $(`<div class="col">
                    <div class="card mx-auto my-3" style="width: 10rem;">
                    <img src="${animalito.img}" onclick="openModal(${index})" style="width: 100%;height: 12rem;" class="card-img-top" alt="...">
                        <div class="bg-secondary">
                            <btn id="animalito_${index}" class="btn btn-link d-block">
                            <img src="/assets/imgs/audio.svg" style="width: 2rem;" class="card-img-top" alt="...">
                            </btn>
                        </div>
                    </div>
                    <audio id="Soundanimalito_${index}">
                        <source src="${animalito.sonido}" type="audio/mpeg">
                    </audio>
                </div>
            `).appendTo('#animalesContent');
            $(`#animalito_${index}`).click((element)=>{
                playAudio(element.delegateTarget.id);
            })
        });
    }
}

function playAudio(id){
    var audio = document.getElementById("Sound" + id); 
    audio.play();
}

$( document ).ready(function() {
    setUp();
});


window.openModal = (index)=>{
    let animalito = animalitos[index];
    $('#exampleModal .modal-body').html(`
    <div class="card mx-auto" style="width: 18rem;">
        <img src="${animalito.img}" style="width: 100%;height: 20rem;" class="card-img-top" alt="...">
        <ul class="list-group list-group-flush">
            <li class="list-group-item">${animalito.edad}</li>
            <li class="list-group-item"><strong>Comentarios</strong> <br> ${animalito.comentarios}</li>
        </ul>
    </div>
    `);
    $('#exampleModal').modal();
}
