import Cliente from './cliente.js';
import Impuesto from './impuesto.js';


var impuesto1 = new Impuesto(1000, 100);

var cliente1 = new Cliente("Ricardo", impuesto1);

console.log(cliente1.calcularImpuesto());