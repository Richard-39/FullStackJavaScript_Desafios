const urlBase = "https://api.github.com/users";

const request = async (url) =>{
    const result = await fetch(url);
    const response = result.json();
    return response;
};

const getUser = async (name) => {
    const url = `${urlBase}/${name}`;
    return request(url);
};

const getRepo = async (name, page, numRepo) => {
    const url = `${urlBase}/${name}/repos?page=${page}&per_page=${numRepo}​`;
    return request(url);
};

var userName, page, numRepo;

$('form').submit(function(event){
    event.preventDefault();
    $('#resultados').html("");

    userName = $('#nombre').val();
    page = $('#pagina').val();
    numRepo = $('#repoPagina').val();

    Promise.all([getUser(userName), getRepo(userName, page, numRepo)])
        .then((resp) => { 

            $(
            `<div class="row my-5">
                <div class="col-6">
                    <div class="card mx-auto" style="width: 18rem;">
                    <img src="${resp[0].avatar_url}" class="card-img-top" alt="...">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Nombre Usuario: ${resp[0].name}</li>
                        <li class="list-group-item">Nombre Login: ${resp[0].login}</li>
                        <li class="list-group-item">Cantidad Repositorios: ${resp[1].length}</li>
                        <li class="list-group-item">Localidad: ${resp[0].location}</li>
                        <li class="list-group-item">Tipo Usuario: ${resp[0].type}</li>
                    </ul>
                    </div>
                </div>
                <div class="col-6">
                    <div class="card mx-auto" style="width: 18rem;">
                    <ul class="list-group list-group-flush" id="listaRepo">
                    </ul>
                    </div>
                </div>
            </div>`)
            .appendTo('#resultados');

            resp[1].forEach(element => {
                $(`<li class="list-group-item"><a href="${element.html_url}"></>  ${element.name}</li>`).appendTo('#listaRepo');
                
            });
        }).catch((error) => {
            alert("Usuario no existe");
            $('#resultados').html("");
        });
});
