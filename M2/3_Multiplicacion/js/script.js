/* un programa que al ingresar un número,
obtenga las tablas de multiplicar desde el 1 hasta el número ingresado. Además, debe
mostrar el factorial para los mismos números. El resultado debe ser mostrado por la
consola del navegador */

// se crea variable que almacera la funcion de calculo de tabla de multiplicar y factorial.
var resultado = (a) => {

    // se valida si el valor ingresado es válido y entre 1 y 20
    if (a=="" || isNaN(a) || a<0 || a > 20) {
        alert ("número fuera del rango \rDebe ingresar un número entre 1 y 20");
        return null;
    } 

    // ciclo for para imprimir la tabla de multiplicar
    for (let i = 1; i <= a; i++) {
        console.log(`${i} X ${a} = ${i*a}`);
    };

    // ciclo for anidado que imprime el factorial del valor ingresado.
    for (let i = 1; i <= a; i++) {
        var factorial = 1;
        for (let j = 1; j <= i ;j++){
            factorial = factorial*j;           
        }
        console.log(`Factorial de ${i} es ${factorial}`);
    };
};

resultado(parseInt(prompt("Ingrese un número entre 1 y 20")));