# prueba creacion de endpoints 

http://localhost:3000/register endpoint para registrar el usuario no estaba en la guia pero me parecio bueno implementarlo para no llenar la base a mano
{
    "name":"test",
    "user":"123123",
    "pass": "123"
}
es un post se usa para la parte de crear usuario todo se probo con postman funciono correctamente

metodo post login solicitado 
http://localhost:3000/login

{
    "user":"123123",
    "pass": "123"
}

metodo post creador de comentarios

http://localhost:3000/comments/create


{
"subject": "NOMBRE DE USUARIO",
"website": "www.google.com",
"text": "Lorem ipsum, text",
"email": "heanfig@gmail.com"
}

metodo eliminador de comentarios
http://localhost:3000/comments/delete

{
    "id": "d726f6ac-ec68-4a5a-9f64-ed8471e259eb"
}

 
