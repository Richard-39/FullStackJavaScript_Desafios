-- 1. Crear base de datos llamada pel�culas. --
-- 2. Cargar ambos archivos a su tabla correspondiente. --

-- 3. Obtener el ID de la pel�cula �Titanic�. --
select id from peliculas_csv where pelicula = 'Titanic'; -- 2 --

-- 4. Listar a todos los actores que aparecen en la pel�cula "Titanic". --
select actor from reparto_csv where id_pelicula = 2;

-- 5. Consultar en cu�ntas pel�culas del top 100 participa Harrison Ford. --
select count(distinct id_pelicula) as numPeliculas from reparto_csv where actor = 'Harrison Ford'; 

-- 6. Indicar las pel�culas estrenadas entre los a�os 1990 y 1999 ordenadas por t�tulo de manera ascendente. --
select pelicula from peliculas_csv where "A�o estreno" between 1990 and 1999 order by "A�o estreno" asc;

-- 7. Hacer una consulta SQL que muestre los t�tulos con su longitud, la longitud debe ser nombrado para la consulta como �longitud_titulo�. --
select pelicula, length(pelicula) as "longitud_titulo" from peliculas_csv; 

-- 8. Consultar cual es la longitud m�s grande entre todos los t�tulos de las pel�culas. --
select max (length(pelicula)) as "longitud m�s grande" from peliculas_csv pc; -- 52
