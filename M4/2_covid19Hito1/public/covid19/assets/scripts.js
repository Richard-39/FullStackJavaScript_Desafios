/* 
http://localhost:3000/api/login
http://localhost:3000/api/total
http://localhost:3000/api/countries/{country}
http://localhost:3000/api/confirmed
http://localhost:3000/api/deaths
http://localhost:3000/api/recovered */

$(document).ready(() => {
    total();

});

const total = async () => {
    const response = await fetch('http://localhost:3000/api/total');
    const { data } = await response.json();
    const filtredData = data.filter((element) => {
        return element.active > 100000;
    });

    callToChart(filtredData);
    showTable(data);
}

const country = async(pais) => {
    const response = await fetch(`http://localhost:3000/api/countries/${pais}`);
    const { data } = await response.json();
    return data;
}

var myChart, myModalChard;

function callToChart(array) {

    const labels = array.map((element) => {
        return element.location;
    });

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Activos',
                data: array.map((element) => {
                    return element.active
                }),
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgb(255, 99, 132)'],
                borderWidth: 1
            },
            {
                label: 'Confirmados',
                data: array.map((element) => {
                    return element.confirmed
                }),
                backgroundColor: ['rgba(255, 213, 0, 0.2)'],
                borderColor: ['rgb(255, 159, 64)'],
                borderWidth: 1
            },
            {
                label: 'Muertos',
                data: array.map((element) => {
                    return element.deaths
                }),
                backgroundColor: ['rgba(100, 100, 100, 0.2)'],
                borderColor: ['rgb(0,0,0)'],
                borderWidth: 1
            },
            {
                label: 'Recuperados',
                data: array.map((element) => {
                    return element.recovered
                }),
                backgroundColor: ['rgba(75, 192, 192, 0.2)'],
                borderColor: ['rgb(75, 192, 192)'],
                borderWidth: 1
            }
        ]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    };

    myChart = new Chart(
        document.getElementById('myChart'),
        config
    );
}

function callToChartCountryModal(pais){

    const labels = ["Activos", "Confirmados", "Muertes", "Recuperados"];

    const data = {
        labels: labels,
        datasets: [
            {
                label: pais.location,
                data: [pais.active, pais.confirmed, pais.deaths, pais.recovered],
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgb(255, 99, 132)'],
                borderWidth: 1
            }
        ]
    };

    const config = {
        type: 'bar',
        data: data,
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        },
    };

    myModalChard = new Chart(
        document.getElementById('myChartModal'),
        config
    );

}

function showTable(array) {

    array.forEach(element => {
        $(`
        <tr>
            <th scope="row">${element.location}</th>
            <td>${element.active}</td>
            <td>${element.confirmed}</td>
            <td>${element.deaths}</td>
            <td>${element.recovered}</td>
            <td><button id="${element.location}" type="button" OnClick="openModal('${element.location}');" class="btn btn-info">Ver Detalle</button></td>
        </tr>
        `).appendTo('tbody');
    });
}

var openModal = async(pais)=>{

    $(`#${pais}`).prepend('<span class="spinner-border spinner-border-sm text-light" role="status" aria-hidden="true"></span> ');

    try {
        let response = await fetch('https://api.printful.com/countries');
        let {result} = await response.json();
        var objectData = result.find(function(e){
            return e.name.toLowerCase().toString()==pais.toLowerCase();
        });
    } catch (error) {
        alert("Error al buscar país");
    }

    if (myModalChard) {
        myModalChard.destroy();
    }

    if (objectData){
        const data = await country(objectData.code);
    
        callToChartCountryModal(data);
    
        var myModal = new bootstrap.Modal(document.getElementById('exampleModal'))
        myModal.show();
    } else {
        alert("País no encontrado");
    }

    $(`#${pais} span`).detach();
}
