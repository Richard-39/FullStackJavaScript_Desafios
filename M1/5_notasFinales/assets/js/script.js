$( document ).ready(function() {
    var nombre = prompt("Ingrese Nombre");
    var carrera = prompt("Ingrese Carrera");
    var ramo1 = prompt("Ingrese Ramo 1");
    var nota1Ramo1 = prompt(`Ingrese nota 1 del ramo ${ramo1}`);
    var nota2Ramo1 = prompt(`Ingrese nota 2 del ramo ${ramo1}`);
    var nota3Ramo1 = prompt(`Ingrese nota 3 del ramo ${ramo1}`);

    var ramo2 = prompt("Ingrese Ramo 2");
    var nota1Ramo2 = prompt(`Ingrese nota 1 del ramo ${ramo2}`);
    var nota2Ramo2 = prompt(`Ingrese nota 2 del ramo ${ramo2}`);
    var nota3Ramo2 = prompt(`Ingrese nota 3 del ramo ${ramo2}`);

    var ramo3 = prompt("Ingrese Ramo 3");
    var nota1Ramo3 = prompt(`Ingrese nota 1 del ramo ${ramo3}`);
    var nota2Ramo3 = prompt(`Ingrese nota 2 del ramo ${ramo3}`);

    $('#nombre').text(nombre);
    $('#carrera').text(carrera);

    $(`              
    <tr>
        <th scope="row">${ramo1}</th>
        <td>${nota1Ramo1}</td>
        <td>${nota2Ramo1}</td>
        <td>${nota3Ramo1}</td>
        <td>${getPromedio(nota1Ramo1, nota2Ramo1, nota3Ramo1)}</td>
    </tr>`
    ).appendTo('#tabla tbody');

    $(`              
    <tr>
        <th scope="row">${ramo2}</th>
        <td>${nota1Ramo2}</td>
        <td>${nota2Ramo2}</td>
        <td>${nota3Ramo2}</td>
        <td>${getPromedio(nota1Ramo2, nota2Ramo2, nota3Ramo2)}</td>
    </tr>`
    ).appendTo('#tabla tbody');

    $(`              
    <tr>
        <th scope="row">${ramo3}</th>
        <td>${nota1Ramo3}</td>
        <td>${nota2Ramo3}</td>
        <td> ... </td>
        <td> ... </td>
    </tr>`
    ).appendTo('#tabla tbody');

    $('#mensaje').text(`Para aprober el ramo ${ramo3} con nota 4, necesitas obtener un ${getNotaNecesaria(nota1Ramo3, nota2Ramo3)} en la nota 3`);

  });


  function getPromedio(a, b, c){
    let suma = parseFloat(a) + parseFloat(b) + parseFloat(c);
    return suma/3;
  }

  function getNotaNecesaria (a, b){
    let suma = parseFloat(a) + parseFloat(b) ;
    let nota = 12 - suma;
    if (nota < 1) nota = 1; 
    return nota;
  };


  