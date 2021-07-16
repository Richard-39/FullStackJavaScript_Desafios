-- 1. Crear base de datos llamada películas. --
-- 2. Cargar ambos archivos a su tabla correspondiente. --

-- 3. Obtener el ID de la película “Titanic”. --
select id from peliculas_csv where pelicula = 'Titanic'; -- 2 --

-- 4. Listar a todos los actores que aparecen en la película "Titanic". --
select actor from reparto_csv where id_pelicula = 2;

-- 5. Consultar en cuántas películas del top 100 participa Harrison Ford. --
select count(distinct id_pelicula) as numPeliculas from reparto_csv where actor = 'Harrison Ford'; 

-- 6. Indicar las películas estrenadas entre los años 1990 y 1999 ordenadas por título de manera ascendente. --
select pelicula from peliculas_csv where "Año estreno" between 1990 and 1999 order by "Año estreno" asc;

-- 7. Hacer una consulta SQL que muestre los títulos con su longitud, la longitud debe ser nombrado para la consulta como “longitud_titulo”. --
select pelicula, length(pelicula) as "longitud_titulo" from peliculas_csv; 

-- 8. Consultar cual es la longitud más grande entre todos los títulos de las películas. --
select max (length(pelicula)) as "longitud más grande" from peliculas_csv pc; -- 52
