$(document).ready(function () {

    // oculta la seccion de heroes vacia al cargar la pagina
    $('#heroSection').hide();

    // funcion al hacer click en el boton de busqueda
    $('#form').submit(function (params) {
        params.preventDefault();

        // captura del input en una variable
        var value = $('#num').val()

        // condicional de validacion del valor ingresado. si esta validado realiza la busqueda.
        if (validate(value)){
            search(value);
        }
    });

});

// funcion de validacion del campo de entrada 
function validate(value) {
    // condicion de validacion, solo numeros
    let validation = /^[0-9]+$/gim;

    // condicional de validacion, si es valido retorna true
    if (validation.test(value) && value > 0 && value < 732){
        return true;
    };

    // en caso de no ser valido avisa al usuario y retorna false
    alert("Ingrese un valor entre 1 y 731")
    return false;
}

// funcion asincronica de busqueda de heores.
function search(value) {
    $.ajax({
        dataType: "json",
        url: `https://superheroapi.com/api.php/10225044752363922/${value}`,
        success: function (dataHeros) {
            //  si es exitosa la busqueda se muestra la seccion de heroes
            //  se le asignan los valores a la tarjeta y gráfico
            $('#heroSection').show();
            assignHeroToCard(dataHeros);
            showChart(dataHeros);
        },
        error: function (error) {
            // en caso de error se le avisa al usuario
            alert("Error al consultar la api.");
        },
    });
}

// funcion de asignacion de valores a la tarjeta de heroe
function assignHeroToCard(dataHeros) {

    // se limpia los valores de las etiquetas de información.
    $('#first-appearance').text("Primera Aparición: ");
    $('#place-of-birth').text("Lugar de nacimiento: ");
    $('#height').text("Altura: ");
    $('#weight').text("Peso: ");
    $('#group-affiliation').text("Afiliación: ");

    // se asigna la imagen del heroe y la información correspondiente
    $('#image').attr("src", `${dataHeros.image.url}`);
    $('#name').text(dataHeros.name);
    $('#full-name').text(dataHeros.biography["full-name"]);

    $('#first-appearance').append(dataHeros.biography["first-appearance"]);
    $('#place-of-birth').append(dataHeros.biography["place-of-birth"]);
    $('#height').append(dataHeros.appearance.height[1]);
    $('#weight').append(dataHeros.appearance.weight[1]);
    $('#group-affiliation').append(dataHeros.connections["group-affiliation"]);
}

// funcion de asignacion de valores al grafico
function showChart(dataHeros) {
    var options = {
        animationEnabled: true,
        title: {
            text: "Powerstats"
        },
        axisY: {
            title: "Stats",
            suffix: ""
        },
        axisX: {
            title: "Powers"
        },
        data: [{
            type: "column",
            yValueFormatString: "#,##0.0#"%"",
            dataPoints: []
        }]
    };

    // metodo ciclico de asignación de stats al grafico.
    for (stats in dataHeros.powerstats){
        console.log(dataHeros.powerstats[`${stats}`]);
        options.data[0].dataPoints.push({label: stats, y: parseInt(dataHeros.powerstats[`${stats}`])});
    };

    $("#chartContainer").CanvasJSChart(options);
    
}




