class Multimedia {
    
    constructor(url){
        let _url = url;
        this.getUrl = () => _url;
    };

    get url(){
        return this.getUrl();
    }

    setInicio(){
        return "Este método es para realizar un cambio en la URL del video";
    }
}

class Reproductor extends Multimedia {

    constructor(url, id){
        super(url);
        let _id = id;
        this.getId = () => _id;
    }

    get id(){
        return this.getId();
    }

    playMultimedia(){
        miEspacio.funcionPublica(this.url, this.id);
    }

    setInicio(tiempo){
        
        $(`#${this.id} iframe`).prop("src", `${this.url}?start=${tiempo}`);

    }
}

const miEspacio = (()=>{

    funcionPrivada = (url, id) => {
        $(`#${id} iframe`).attr("src", `${url}`);
    }

    return {
        funcionPublica: (url, id) => {
            funcionPrivada(url, id);
        }
    }

})();

var musica = new Reproductor("https://www.youtube.com/embed/5PSNL1qE6VY", "musica");
var pelicula = new Reproductor("https://www.youtube.com/embed/MG3uHCxZujA", "peliculas");
var serie = new Reproductor("https://www.youtube.com/embed/TR_AsvuvXNc", "series");

musica.playMultimedia();
pelicula.playMultimedia();
serie.playMultimedia();

serie.setInicio(90);
