create table blog_usuario (
	id serial,
	email varchar(50),
	primary key (id)
);

create table blog_post (
	id serial,
	usuario_id int,
	titulo varchar(50),
	fecha date,
	primary key (id),
	foreign key (usuario_id) references blog_usuario(id) 
);

create table blog_comentario (
	id serial,
	post_id int,
	usuario_id int,
	texto text,
	fecha date,
	primary key (id),
	foreign key (post_id) references blog_post(id),
	foreign key (usuario_id) references blog_usuario(id)
);

-- datos usuario --
insert into blog_usuario(email) values ('usuario01@hotmail.com');
insert into blog_usuario(email) values ('usuario02@gmail.com');
insert into blog_usuario(email) values ('usuario03@gmail.com');
insert into blog_usuario(email) values ('usuario04@hotmail.com');
insert into blog_usuario(email) values ('usuario05@yahoo.com');
insert into blog_usuario(email) values ('usuario06@hotmail.com');
insert into blog_usuario(email) values ('usuario07@yahoo.com');
insert into blog_usuario(email) values ('usuario08@yahoo.com');
insert into blog_usuario(email) values ('usuario09@yahoo.com');

-- datos post
insert into blog_post (usuario_id, titulo, fecha) values (1, 'Esto es malo', '2020-06-29');
insert into blog_post (usuario_id, titulo, fecha) values (5, 'Esto es malo', '2020-06-20');
insert into blog_post (usuario_id, titulo, fecha) values (1, 'Esto es excelente', '2020-05-30');
insert into blog_post (usuario_id, titulo, fecha) values (9, 'Esto es bueno', '2020-05-09');
insert into blog_post (usuario_id, titulo, fecha) values (7, 'Esto es bueno', '2020-07-10');
insert into blog_post (usuario_id, titulo, fecha) values (5, 'Esto es excelente', '2020-07-18');
insert into blog_post (usuario_id, titulo, fecha) values (8, 'Esto es excelente', '2020-07-07');
insert into blog_post (usuario_id, titulo, fecha) values (5, 'Esto es excelente', '2020-05-14');
insert into blog_post (usuario_id, titulo, fecha) values (2, 'Esto es bueno', '2020-05-08');
insert into blog_post (usuario_id, titulo, fecha) values (6, 'Esto es bueno', '2020-06-02');
insert into blog_post (usuario_id, titulo, fecha) values (4, 'Esto es bueno', '2020-05-05');
insert into blog_post (usuario_id, titulo, fecha) values (9, 'Esto es malo', '2020-07-23');
insert into blog_post (usuario_id, titulo, fecha) values (5, 'Esto es excelente', '2020-05-30');
insert into blog_post (usuario_id, titulo, fecha) values (8, 'Esto es excelente', '2020-05-01');
insert into blog_post (usuario_id, titulo, fecha) values (7, 'Esto es malo', '2020-06-17');

-- datos comentario
insert into blog_comentario (usuario_id, post_id, texto, fecha) values (3, 6, 'Este es el comentario 1', '2020-07-08');
insert into blog_comentario (usuario_id, post_id, texto, fecha) values (4, 2, 'Este es el comentario 2', '2020-06-07');
insert into blog_comentario (usuario_id, post_id, texto, fecha) values (6, 4, 'Este es el comentario 3', '2020-06-16');
insert into blog_comentario (usuario_id, post_id, texto, fecha) values (2, 13, 'Este es el comentario 4', '2020-06-15');
insert into blog_comentario (usuario_id, post_id, texto, fecha) values (6, 6, 'Este es el comentario 5', '2020-05-14');
insert into blog_comentario (usuario_id, post_id, texto, fecha) values (3, 3, 'Este es el comentario 6', '2020-07-08');
insert into blog_comentario (usuario_id, post_id, texto, fecha) values (6, 1, 'Este es el comentario 7', '2020-05-22');
insert into blog_comentario (usuario_id, post_id, texto, fecha) values (6, 7, 'Este es el comentario 8', '2020-07-09');
insert into blog_comentario (usuario_id, post_id, texto, fecha) values (8, 13, 'Este es el comentario 9', '2020-06-30');
insert into blog_comentario (usuario_id, post_id, texto, fecha) values (8, 6, 'Este es el comentario 10', '2020-06-19');
insert into blog_comentario (usuario_id, post_id, texto, fecha) values (5, 1, 'Este es el comentario 11', '2020-05-09');
insert into blog_comentario (usuario_id, post_id, texto, fecha) values (8, 15, 'Este es el comentario 12', '2020-06-17');
insert into blog_comentario (usuario_id, post_id, texto, fecha) values (1, 9, 'Este es el comentario 13', '2020-05-01');
insert into blog_comentario (usuario_id, post_id, texto, fecha) values (2, 5, 'Este es el comentario 14', '2020-05-31');
insert into blog_comentario (usuario_id, post_id, texto, fecha) values (4, 3, 'Este es el comentario 15', '2020-06-28');

-- Seleccionar el correo, id y título de todos los post publicados por el usuario 5.
select email, blog_usuario.id, titulo 
from blog_post 
inner join blog_usuario 
on blog_post.usuario_id = blog_usuario.id 
where blog_usuario.id = 5;

-- Listar el correo, id y el detalle de todos los comentarios que no hayan sido realizados por el usuario con email ?usuario06@hotmail.com?
select 
email, blog_comentario.usuario_id, blog_comentario.texto 
from blog_comentario 
full join blog_usuario 
on blog_usuario.id = blog_comentario.usuario_id
where blog_usuario.email != 'usuario06@hotmail.com';

-- Listar los usuarios que no han publicado ningún post.
select blog_usuario.id 
from blog_usuario 
full outer join blog_post 
on blog_usuario.id = blog_post.usuario_id 
where blog_usuario.id is null 
or blog_post.usuario_id is null;

-- Listar todos los post con sus comentarios (incluyendo aquellos que no poseen comentarios).
select blog_post.id, titulo, texto 
from blog_post 
left join blog_comentario 
on blog_post.id = blog_comentario.post_id;

-- Listar todos los usuarios que hayan publicado un post en Junio.
select blog_post.usuario_id , blog_post.fecha 
from blog_post 
where extract (month from blog_post.fecha) = 6; 
