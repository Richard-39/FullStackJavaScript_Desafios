-- parte 1 --

create table posts (
	id smallint,
	nombre_usuario varchar(50),
	fecha_creacion date,
	contenido text,
	descripcion text,
	primary key (id)
);

insert into posts(id, nombre_usuario, fecha_creacion, contenido, descripcion) values (1, 'Ricardo', '2021-07-13', 'Hola a todos', 'saludo');
insert into posts(id, nombre_usuario, fecha_creacion, contenido, descripcion) values (2, 'Ricardo', '2021-07-05', 'Un gusto en saludar, mi nombre es ricardo', 'Presentacion');
insert into posts(id, nombre_usuario, fecha_creacion, contenido, descripcion) values (3, 'Carlos', '2021-05-25', 'He creado este grupo', 'nuevas intenciones');

alter table posts add titulo varchar(30);

update posts set titulo = 'Gretings' where id = 1;
update posts set titulo = 'Presentandose' where id = 2;
update posts set titulo = 'Nuevos horizontes' where id = 3;

insert into posts(id, nombre_usuario, fecha_creacion, contenido, descripcion, titulo) values (4, 'Pedro', '2021-04-14', 'duelo a muerte con cuchillos', 'amenaza', 'amenazando a un sujeto');
insert into posts(id, nombre_usuario, fecha_creacion, contenido, descripcion, titulo) values (5, 'Pedro', '2021-11-06', 'Up! Me da pajita desarmarlo', 'Pajita', 'Paja');

delete from posts where nombre_usuario = 'Carlos';

insert into posts(id, nombre_usuario, fecha_creacion, contenido, descripcion, titulo) values (6, 'Carlos', '2021-05-25', 'Me borraron el post >:c', 'Quejas', 'vale tremenda #$%&Q');

-- parte 2 --

create table comentario (
	id smallint,
	fecha date, 
	hora_creacion time,
	contenido text,
	id_post smallint,
	primary key (id),
	foreign key (id_post) references posts (id) 
);

insert into comentario (id, fecha, hora_creacion, contenido, id_post) values (1, '2021-05-21', '12:24:02', 'Yo creo que lo hiciste super mal', 1);
insert into comentario (id, fecha, hora_creacion, contenido, id_post) values (2, '2021-05-22', '15:45:36', 'en cambio, ella lo irrita', 2);

insert into comentario (id, fecha, hora_creacion, contenido, id_post) values (3, '2021-05-22', '15:45:36', 'Lorem Ipsum is simply dummy', 6);
insert into comentario (id, fecha, hora_creacion, contenido, id_post) values (4, '2021-05-23', '15:55:36', 'text of the printing and typesetting', 6);
insert into comentario (id, fecha, hora_creacion, contenido, id_post) values (5, '2021-05-24', '15:25:36', 'industry. Lorem Ipsum has been', 6);
insert into comentario (id, fecha, hora_creacion, contenido, id_post) values (6, '2021-05-25', '15:15:36', 'the industrys standard dummy', 6);

insert into posts(id, nombre_usuario, fecha_creacion, contenido, descripcion, titulo) values (7, 'Margarita', '2021-11-07', 'text ever since the 1500s, when ', 'an unknown printer', 'took a galley');

insert into comentario (id, fecha, hora_creacion, contenido, id_post) values (7, '2021-05-22', '15:45:36', 'Lorem Ipsum is simply dummy', 7);
insert into comentario (id, fecha, hora_creacion, contenido, id_post) values (8, '2021-05-23', '15:48:36', 'Lorem Ipsum is simply dummy', 7);
insert into comentario (id, fecha, hora_creacion, contenido, id_post) values (9, '2021-05-24', '15:42:36', 'Lorem Ipsum is simply dummy', 7);
insert into comentario (id, fecha, hora_creacion, contenido, id_post) values (10, '2021-05-12', '15:43:36', 'Lorem Ipsum is simply dummy', 7);
insert into comentario (id, fecha, hora_creacion, contenido, id_post) values (11, '2021-05-28', '15:49:36', 'Lorem Ipsum is simply dummy', 7);

select * from posts;
select * from comentario;
