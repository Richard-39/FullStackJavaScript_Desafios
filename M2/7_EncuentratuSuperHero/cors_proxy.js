// En este ejemplo, si realizas una solicitud ajax al siguiente sitio web, dará un error de CORS.
// Significa que no puedes consultar a una api en https, desde tu computador http. (sin certificado de seguridad)

var myUrl = 'https://superheroapi.com/api/10227715866708543/213';  //coloca acá la url de la api que deseas consumir.

// Sin embargo, para que funcione, vamos a utilizar el servicio gratuito de cors-anywhere para evitar este error.
// El código JS es:

var proxy = 'https://cors-anywhere.herokuapp.com/';

$.ajax({
	type: "GET", // o el que corresponda
    url: proxy + myUrl,
    dataType: "json" ,
   
	success: function (datos) {
				console.log(datos);
				},
	error: function (error) { 
				console.log(error)}
				});
});


// Este componente de heroku, se ocupa para fines de desarrollo.
// Para poder usarlo, debes solicitar autorización en:
// https://cors-anywhere.herokuapp.com/corsdemo
// y pulsa el botón que aparece para activarlo.
//
// Finalmente, cuando tu sitio esté listo para entrar a producción,
// lo correcto es instalarle un certificado de seguridad para que pueda
// funcionar bajo https. Al hacerlo, ya no se necesitaría el proxy.
