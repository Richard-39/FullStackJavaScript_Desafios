class Animal {    

    constructor(nombre, edad, img, comentarios, sonido){
        var nombre = nombre;
        var edad = edad;
        var img = img;
        var comentarios = comentarios;
        var sonido = sonido;

        this.getNombre = () => nombre;
        this.getEdad = () => edad;
        this.getImg = () => img;
        this.getComentarios = () => comentarios;
        this.getSonido = () => sonido;

        this.setComentarios = (comentario) => (comentarios = comentario);

    }

    get nombre () {
        return this.getNombre();
    }

    get edad () {
        return this.getEdad();
    }

    get img () {
        return this.getImg();
    }

    get comentarios () {
        return this.getComentarios();
    }

    get sonido () {
        return this.getSonido();
    }

    set comentarios(comentarios) {
        this.setComentarios(comentarios);
    }

}

export default Animal;
