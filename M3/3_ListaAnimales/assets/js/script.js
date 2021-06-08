$(document).ready(function(){
    $('form').click(function(element){
        element.preventDefault();
        
        var nombrePropietario = $('#propietario').val();
        var telefono = $('#telefono').val();
        var direccion = $('#direccion').val();
        var nombreAnimal = $('#nombreMascota').val();
        var tipo = $('#tipo').children("option:selected").val();
        var enfermedad =$('#enfermedad').val();

        var mascota = new Mascota(nombrePropietario, direccion, telefono, tipo, nombreAnimal, enfermedad);

        $('#resultado').html("");
        $(`<ul>
            <li>${mascota.datosPropietario()}</li>
            <li>${mascota.tipo}, mientras que el nombre de la mascota es: ${mascota.nombreAnimal} y la enfermedad es: ${mascota.enfermedad}</li>
            </ul>`
        ).appendTo('#resultado');
    });
});


class Propietario{

    constructor(nombrePropietario, direccion, telefono){
        this.nombrePropietario = nombrePropietario;
        this.direccion = direccion;
        this.telefono = telefono;
    }

    datosPropietario() {
        return `El nombre del dueño es: ${this.nombrePropietario}, el domicilio es: ${this.direccion}, y el número telefónico de contacto es: ${this.telefono}`;
    }
}

class Animal extends Propietario {
    constructor(nombrePropietario, direccion, telefono, tipo){
        super(nombrePropietario, direccion, telefono);
        this._tipo = tipo;
    }

    get tipo(){
        return `El tipo de animal es: ${this._tipo}`;
    }

    set tipo (tipo) {
        this._tipo = tipo;
    }
}

class Mascota extends Animal {

    constructor (nombrePropietario, direccion, telefono, tipo, nombreAnimal, enfermedad){
        super(nombrePropietario, direccion, telefono, tipo);
        this._nombreAnimal = nombreAnimal;
        this._enfermedad = enfermedad;
    }

    get nombreAnimal () {
        return this._nombreAnimal;
    }
    set nombreAnimal (nombreAnimal) {
        this._nombreAnimal = nombreAnimal;
    }

    get enfermedad () {
        return this._enfermedad;
    }
    set enfermedad (enfermedad) {
        this._enfermedad = enfermedad;
    }
}