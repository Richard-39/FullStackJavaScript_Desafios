
const descargaDatos = async () => {
    const url = "https://jsonplaceholder.typicode.com/photos";

    try {
        const response = await fetch(url);    
        const data = await response.json();
        console.log(data);

        for (i=0; i<20; i++){
            console.log(data[i].title);
        }

    } catch (error) {
        console.log(error);
    }

}

descargaDatos();

const mensaje = () => {
    return new Promise(
        (resolve) => setTimeout(()=> {
            resolve('Información enviada')
        }, 3000)
    );
}

const solicitarMensaje = async () => {
    const resp = await mensaje();
    console.log (resp);
}

descargaDatos();
solicitarMensaje();
