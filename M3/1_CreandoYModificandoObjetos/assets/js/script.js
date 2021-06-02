// almacenar y/o modificar los datos de sus pacientes 
// Así como filtrar y mostrar los pacientes
/* por nombre para poder hacer una búsqueda más rápida y ubicar la historia médica de cada
persona. En el siguiente diagrama UML se puede observar cual es la cardinalidad de los
objetos y las propiedades que tiene cada uno. */

/* Primeramente se deben mostrar todos los pacientes con sus datos personales, luego
mediante un método de búsqueda, mostrar los datos del paciente que concuerden con el
nombre que se envíe al método como argumento. Igualmente se deben proteger los datos y
evitar modificaciones directas, por lo que se debe implementar getters y setters. Todo esto
se puede mostrar en la consola del navegador web de tu preferencia. */

/* 1. Crear todo el código usando ES5.
2. Crear una función constructora para cada objeto.
3. Implementar métodos getters y setters para poder acceder y modificar los datos de
los pacientes.
4. Crear un método mediante la propiedad prototype que permita buscar los datos de
los usuarios por nombre y otro método que permita mostrar todos los datos de los
usuarios registrados.
5. Instanciar cada objeto utilizando la instrucción new. */

function Paciente (nombre, edad, rut, diagnostico){

    // creacion de variables y sus correspondientes getter y setter
    var _nombre = nombre;
    Object.defineProperty(this, "nombre", {value:_nombre, configurable: true});
    this.getNombre = function (){
        return this.nombre;
    }
    this.setNombre = function(nombre) {
        _nombre = nombre;
        Object.defineProperty(this, "nombre", {value:_nombre, configurable: true});
    }

    var _edad = edad;
    Object.defineProperty(this, "edad", {value: _edad, configurable: true});
    this.getEdad = function(){
        return this.edad;
    }
    this.setEdad = function(edad) {
        _edad = edad;
        Object.defineProperty(this, "edad", {value: _edad, configurable: true});
    }

    var _rut = rut;
    Object.defineProperty(this, "rut", {value: _rut, configurable: true});
    this.getRut = function (){
        return this.rut;
    }
    this.setRut = function(rut){
        _rut = rut;
        Object.defineProperty(this, "rut", {value: _rut, configurable: true});
    }

    var _diagnostico = diagnostico;
    Object.defineProperty(this, "diagnostico", {value: _diagnostico, configurable: true});
    this.getDiagnostico = function (){
        return this.diagnostico;
    }
    this.setDiagnostico = function(diagnostico) {
        _diagnostico = diagnostico;
        Object.defineProperty(this, "diagnostico", {value: _diagnostico, configurable: true});
    }
}

// funcion contructora de consultorio

function Consultorio (nombre, pacientes){
    
    // asignacion de variables, encapsulamiento con getter y setters
    var _nombre = nombre;
    Object.defineProperty(this, "nombre", {value: _nombre, configurable: true});
    this.getNombre = function (){
        return this.nombre;
    }
    this.setNombre = function(nombre) {
        _nombre = nombre;
        Object.defineProperty(this, "nombre", {value:_nombre, configurable: true});
    }

    var _pacientes = pacientes;
    Object.defineProperty(this, "pacientes", {value: _pacientes});
    this.getPacientes = function(){
        return this.pacientes;
    }
    this.setPacientes = function(pacientes){
        _pacientes = pacientes;
        Object.defineProperty(this, "pacientes", {value: _pacientes});
    }
    // funcion de agregar pacientes al array
    this.addPaciente = function(paciente){
        _pacientes.push(paciente);
        Object.defineProperty(this, "pacientes", {value: _pacientes});
    };
}

// metodo para encontrar pacientes por nombre
Consultorio.prototype.find = function(nombre){
    let result = this.pacientes.filter(function (element) {
        return element.nombre.toLowerCase() == nombre.toLowerCase();
    });

    for (paciente of result){
        console.log("Nombre: " + paciente.getNombre());
        console.log("Edad: " + paciente.getEdad());
        console.log("Rut: " + paciente.getRut());
        console.log("Diagnostico: " + paciente.getDiagnostico());
    };

    if (result.length == 0){
        console.log("Sin pacientes con ese nombre.")
    }
}

// funcion para listar los pacientes en el consultorio
Consultorio.prototype.list = function(){
    for (paciente of this.pacientes){
        console.log("Nombre: " + paciente.getNombre());
        console.log("Edad: " + paciente.getEdad());
        console.log("Rut: " + paciente.getRut());
        console.log("Diagnostico: " + paciente.getDiagnostico());
    };
}


// instancias de pacientes y consultorio
var p1 = new Paciente("Ricardo", 29, "18115480-2", true);
var p2 = new Paciente("Sebastian", 20, "20114789-2", false);
var p3 = new Paciente("Felipe", 30, "17854632-8", false);
var p4 = new Paciente("Ricardo", 52, "7854632-8", true);

var c1 = new Consultorio("Metropolitano", [p1, p2, p3, p4]);