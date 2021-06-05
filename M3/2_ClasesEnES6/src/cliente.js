export default class Cliente {

    #nombre;
    #impuesto;

    constructor (nombre, impuesto) {
        this.#nombre = nombre;
        this.#impuesto = impuesto;
    }

    get nombre(){
        return this.#nombre;
    }
    set nombre(nombre){
        this.#nombre = nombre;
    }

    get impuesto(){
        return this.#impuesto;
    }
    set impuesto(impuesto){
        this.#impuesto = impuesto;
    }

    calcularImpuesto(){
        var valor = (this.#impuesto.monto_bruto_anual - this.#impuesto.deducciones) * 21/100;
        return `El impuesto es: ${valor}`;
    }
}