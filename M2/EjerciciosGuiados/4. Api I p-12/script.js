$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "https://mindicador.cl/api",
        dataType: "json",
        success: function (data) {
            $('#valorUf').text(data.uf.valor);
        }
    });
});