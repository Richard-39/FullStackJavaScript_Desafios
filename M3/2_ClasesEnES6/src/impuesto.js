export default class Impuesto {
    #monto_bruto_anual;
    #deducciones;

    constructor(monto_bruto_anual, deducciones){
        this.#monto_bruto_anual = monto_bruto_anual;
        this.#deducciones = deducciones;
    }

    get monto_bruto_anual(){
        return this.#monto_bruto_anual;
    }
    set monto_bruto_anual(monto_bruto_anual){
        this.#monto_bruto_anual = monto_bruto_anual;
    }

    get deducciones(){
        return this.#deducciones;
    }
    set deducciones(deducciones){
        this.#deducciones = deducciones;
    }
}