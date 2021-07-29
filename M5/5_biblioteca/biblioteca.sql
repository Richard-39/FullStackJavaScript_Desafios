-- CREACION DE TABLAS --

create table biblioteca_socio(
	id_socio serial,
	rut varchar(9) not null,
	nombre varchar (30),
	apellido varchar (30),
	direccion varchar (50),
	telefono varchar (9),
	isLibro bool not null,
	primary key (id_socio) 
);

create table biblioteca_libro(
	id_libro serial,
	isbm varchar (15) unique not null,
	titulo varchar(30),
	num_pagina int,
	dias_prestamo int,
	primary key (id_libro)
);

create table biblioteca_autor (
	id_autor serial,
	codigo varchar(10) unique not null,
	nombre varchar(30),
	apellido varchar(30),
	nacimiento date,
	muerte date,
	primary key (id_autor)
);

create table biblioteca_prestamo(
	id_prestamo serial,
	id_socio serial not null,
	id_libro serial not null,
	fecha_inicio date not null,
	fecha_esperada date not null,
	fecha_real date,
	primary key (id_prestamo),
	foreign key (id_socio) references biblioteca_socio (id_socio),
	foreign key (id_libro) references biblioteca_libro (id_libro)
);

create table biblioteca_libro_autor (
	id_libro_autor serial,
	id_libro serial not null,
	id_autor serial not null,
	tipo_autor varchar(30),
	primary key (id_libro_autor),
	foreign key (id_libro) references biblioteca_libro (id_libro),
	foreign key (id_autor) references biblioteca_autor (id_autor)
);

-- INSERCION DE VALORES --

-- socios
insert into biblioteca_socio (rut, nombre, apellido, direccion, telefono, isLibro) values ('1111111-1', 'JUAN', 'SOTO', 'AVENIDA 1, SANTIAGO', '911111111', false);
insert into biblioteca_socio (rut, nombre, apellido, direccion, telefono, isLibro) values ('2222222-2', 'ANA', 'PÉREZ', 'PASAJE 2, SANTIAGO', '922222222', false);
insert into biblioteca_socio (rut, nombre, apellido, direccion, telefono, isLibro) values ('3333333-3', 'SANDRA', 'AGUILAR', 'AVENIDA 2, SANTIAGO', '933333333', false);
insert into biblioteca_socio (rut, nombre, apellido, direccion, telefono, isLibro) values ('4444444-4', 'ESTEBAN', 'JEREZ', 'AVENIDA 3, SANTIAGO', '944444444', false);
insert into biblioteca_socio (rut, nombre, apellido, direccion, telefono, isLibro) values ('5555555-5', 'SILVANA', 'MUÑOZ', 'PASAJE 3, SANTIAGO', '955555555', false);

-- libros --

insert into biblioteca_libro (isbm, titulo, num_pagina, dias_prestamo) values ('111-1111111-111', 'CUENTOS DE TERROR', 344, 7);
insert into biblioteca_libro (isbm, titulo, num_pagina, dias_prestamo) values ('222-2222222-222', 'POESÍAS CONTEMPORANEAS', 167, 7);
insert into biblioteca_libro (isbm, titulo, num_pagina, dias_prestamo) values ('333-3333333-333', 'HISTORIA DE ASIA', 511, 14);
insert into biblioteca_libro (isbm, titulo, num_pagina, dias_prestamo) values ('444-4444444-444', 'MANUAL DE MECÁNICA', 298, 14);

-- autores --
insert into biblioteca_autor (codigo, nombre, apellido, nacimiento, muerte) values ('3', 'JOSE', 'SALGADO', '01-01-1968', '01-01-2020');
insert into biblioteca_autor (codigo, nombre, apellido, nacimiento, muerte) values ('4', 'ANA', 'SALGADO', '01-01-1972', null);
insert into biblioteca_autor (codigo, nombre, apellido, nacimiento, muerte) values ('1', 'ANDRÉS', 'ULLOA', '01-01-1982', null);
insert into biblioteca_autor (codigo, nombre, apellido, nacimiento, muerte) values ('2', 'SERGIO', 'MARDONES', '01-01-1950', '01-01-2012');
insert into biblioteca_autor (codigo, nombre, apellido, nacimiento, muerte) values ('5', 'MARTIN', 'PORTA', '01-01-1976', null);

-- libro autor --
insert into biblioteca_libro_autor (id_libro, id_autor, tipo_autor) values (1, 1, 'PRINCIPAL');
insert into biblioteca_libro_autor (id_libro, id_autor, tipo_autor) values (1, 2, 'COAUTOR');
insert into biblioteca_libro_autor (id_libro, id_autor, tipo_autor) values (2, 3, 'PRINCIPAL');
insert into biblioteca_libro_autor (id_libro, id_autor, tipo_autor) values (3, 4, 'PRINCIPAL');
insert into biblioteca_libro_autor (id_libro, id_autor, tipo_autor) values (4, 5, 'PRINCIPAL');

-- prestamos --
insert into biblioteca_prestamo (id_socio, id_libro, fecha_inicio, fecha_esperada, fecha_real) values (1, 1, '01-20-2020', '01-27-2020', '01-27-2020');
insert into biblioteca_prestamo (id_socio, id_libro, fecha_inicio, fecha_esperada, fecha_real) values (5, 2, '01-20-2020', '01-27-2020', '01-30-2020');
insert into biblioteca_prestamo (id_socio, id_libro, fecha_inicio, fecha_esperada, fecha_real) values (3, 3, '01-22-2020', '02-05-2020', '01-30-2020');
insert into biblioteca_prestamo (id_socio, id_libro, fecha_inicio, fecha_esperada, fecha_real) values (4, 4, '01-23-2020', '02-06-2020', '01-30-2020');
insert into biblioteca_prestamo (id_socio, id_libro, fecha_inicio, fecha_esperada, fecha_real) values (2, 1, '01-27-2020', '02-03-2020', '02-04-2020');
insert into biblioteca_prestamo (id_socio, id_libro, fecha_inicio, fecha_esperada, fecha_real) values (1, 4, '01-31-2020', '02-14-2020', '02-12-2020');
insert into biblioteca_prestamo (id_socio, id_libro, fecha_inicio, fecha_esperada, fecha_real) values (3, 2, '01-31-2020', '02-07-2020', '02-12-2020');


-- CONSULTAS --

-- a. Mostrar todos los libros que posean menos de 300 páginas.
select * from biblioteca_libro where num_pagina < 300;

-- b. Mostrar todos los autores que hayan nacido después del 01-01-1970.
select * from biblioteca_autor where nacimiento > '01-01-1970';

-- c. ¿Cuál es el libro más solicitado?
select id_libro, conteo 
from (
	select id_libro, count(id_libro) conteo 
	from biblioteca_prestamo 
	group by id_libro
	) consulta 
where conteo = (
	select max (lista) 
	from (
		select id_libro, count(id_libro) lista 
		from biblioteca_prestamo 
		group by id_libro) tabla
	);

-- d. Si se cobrara una multa de $100 por cada día de atraso, mostrar cuánto debería pagar cada usuario que entregue el préstamo después de 7 días. (0.5 puntos)
select nombre, sum (case when dias > 0 then dias*100 else 0 end) total_deuda 
from (
	select biblioteca_socio.nombre nombre, (biblioteca_prestamo.fecha_real - biblioteca_prestamo.fecha_esperada) dias 
	from biblioteca_socio 
	join biblioteca_prestamo 
	on biblioteca_prestamo.id_socio = biblioteca_socio.id_socio) tabla 
group by nombre;
