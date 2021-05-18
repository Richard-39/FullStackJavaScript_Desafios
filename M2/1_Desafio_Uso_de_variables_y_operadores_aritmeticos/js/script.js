// 2. Realizar operaciones con dos números.

do {
    // Se guarda valor ingresado por el usuario en la variable num
    var num1 = prompt("Ingrese un número mayor a cero");
}
// se verifica si lo ingresado es un número, sino, vuelve a preguntar
while (isNaN(num1) || num1 == "" || num1 < 0);

do {
    var num2 = prompt("Ingrese otro número mayor a cero");
}
while (isNaN(num2) || num2 == "" || num2 < 0);

// se escribe en la pagina web el resultado de las operaciones.
document.write(`${num1} + ${num2} = ${parseInt(num1) + parseInt(num2)} </br>`);
document.write(`${num1} - ${num2} = ${parseInt(num1) - parseInt(num2)} </br>`);
document.write(`${num1} / ${num2} = ${parseInt(num1) / parseInt(num2)} </br>`);
document.write(`${num1} * ${num2} = ${parseInt(num1) * parseInt(num2)} </br>`);
document.write(`${num1} % ${num2} = ${parseInt(num1) % parseInt(num2)} </br>`);


// 3. Crear un programa que pida al usuario ingresar la temperatura en grados Celsius y que la transforme a grados Kelvin y Fahrenheit.

// se guarda la info del usuario en una variable temp.
var temp = prompt("Ingrese temperatura en grados Celcius");

// si el valor es numerico se calcula y se muestra en un alert el resultado
if (!isNaN(temp) && temp != ""){
    alert(`${temp} grados celcius son ${parseInt(temp) +273.15} grados Kelvin
    ${temp} grados celcius son ${parseInt(temp) * 9/5 + 32} grados Fharenheit
    `);
}


// 4. Crear un programa que pida al usuario una cantidad de días y que muestre su equivalente en Años, Semanas y Días.

// valor de días se guarda en una variable ingresada por el usuario

do {
    var inputDays = prompt ("Ingrese la cantidad de días.");
}
while (isNaN(inputDays) || inputDays == "");

// se convierte la cantidad de dias en sus correspondientes años, semanas y dias restantes.
var years = Math.floor(inputDays/365);
var weeks = Math.floor(inputDays%365 / 7);
var days = Math.floor(inputDays%365 * 365%7);

alert(`${inputDays} días equivalen a ${years} años, ${weeks} semanas y ${days} días.`);

// 5. Crear un programa que solicite al usuario 5 números y realice los cálculos que se piden a continuación.

// se crea una array para almacenar los valores.
var nums = [];

// se solicitan los valores con un prompt en un ciclo for.
for (i=0; i<5; i++) {
    nums.push(parseInt(prompt(`Ingrese el ${i+1} número.`)));
}

// se hace el calculo de la suma 
var sum = 0;
nums.forEach(function(x,y){
    sum += x;
});

// se hace el calculo del promedio
var average = sum / nums.length;

// se muestra la usuario el resultado.
alert(`La suma de todos los números es ${sum}
El promedio de todos los números es ${average}`);
