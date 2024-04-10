# Filtro CRUD Node.Js

**Planteamiento del problema**

- En el mundo moderno, las bibliotecas juegan un papel crucial en la difusión del conocimiento y la promoción de la educación. Sin embargo, con el avance de la tecnología, las bibliotecas también han evolucionado para adaptarse a las demandas cambiantes de los usuarios. En este contexto, la implementación de un sistema RESTful para una biblioteca se vuelve fundamental para facilitar el acceso y la gestión eficiente de recursos como libros y clientes.

## Características

- [x] **Crear:** Permite crear nuevos elementos en la base de datos.
- [x] **Leer:** Puede leer y mostrar los elementos existentes en la base de datos.
- [x] **Actualizar:** Permite actualizar los elementos existentes en la base de datos.
- [x] **Eliminar:** Capacidad para eliminar elementos de la base de datos.
- [x] **Otros:** Capacidad para hacer busquedas personalizadas ya sea por email, age, author, pages, etc.

## Requisitos previos

Tener instalado lo siguiente en tu sistema:

- Node.js
- npm (Administrador de paquetes de Node.js)
- Base de datos (MongoDB)

## Instalación

1. Acede a la carpeta PruebaDeDesempeñoNodeJs_RichardMontoyaBetancur dentro de ella esta la carpeta filtro(el CRUD esta ahí).
2. Navega hasta el directorio del proyecto.
3. Ejecuta `npm install` para instalar las dependencias.

## Configuración

1. Abre el archivo `.env`.
2. Configura la conexión a tu base de datos (si es necesario) o modifica las variables de entorno con las tuyas si lo vez necesario.
3. Realiza cualquier otra configuración necesaria para ejecutar.

## Uso

1. Ejecuta `nodemon ./src/app.js` para iniciar la aplicación.
2. Accede a la aplicación en tu navegador o utilizando herramientas como **Postman** o **Thunder Client** en VSCode.
3. Utiliza las rutas proporcionadas para realizar operaciones CRUD en tu base de datos.
4. **IMPORTANTEEE:** cuando se vaya a crear el book o el client se debe capturar el token ya que cuando se crea lo arroja(Token) y se necesita para poder haceder a los otros endpoints.
<br>
    - 4.1 **Uso del token:** en los header se debe colocar **authorization** y como value se pasa el token. 

## Endpoinst

### Clients:

- [x] **Crear:** *Method -->* **POST** http://localhost:3000/
<br>
    **data**:{
        "name": "edita estos textos",
        "lastname": "edita estos textos",
        "email": "editar@gmail.com",
        "gender": "editar",
        "age": 12
    }

- [x] **Leer Todos los clientes:** *Method -->* **GET** http://localhost:3000/

- [x] **Leer por ID:** *Method -->* **GET** http://localhost:3000/:id
<br> colocar un **ID** existe al final para que funcione.

- [x] **Leer por Gender:** *Method -->* **GET** http://localhost:3000/gender/:gender
- [x] **Leer por Email:** *Method -->* **GET** http://localhost:3000/email/:email
- [x] **Leer por Age:** *Method -->* **GET** http://localhost:3000/age/:age
- [x] **Actualizar:** *Method -->* **PUT** http://localhost:3000/:id
<br> **Edita lo que quieras actualizar**.
<br>
    **data**:{
        "name": "edita estos textos",
        "lastname": "edita estos textos",
        "email": "editar@gmail.com",
        "gender": "editar",
        "age": 12
    }

- [x] **Eliminar:** *Method -->* **DELETE** http://localhost:3000/:id

----------------------------------------------------------------

### Books:


- [x] **Crear Libro:** *Method -->* **POST** http://localhost:3000/book
<br>
    data:{
        "name": "Prueba 6",
        "author": "test",
        "pages": 66,
        "description": "Esto es una prueba de ensayo 6"
    }

- [x] **Leer Todos los libros:** *Method -->* **GET** http://localhost:3000/book/book
- [x] **Leer por ID:** *Method -->* **GET** http://localhost:3000/book/:id
<br> colocar un **ID** existe al final para que funcione.

- [x] **Leer por Author:** *Method -->* **GET** http://localhost:3000/book/author/:author
- [x] **Leer por Name:** *Method -->* **GET** http://localhost:3000/book/name/:name
- [x] **Leer por Pages:** *Method -->* **GET** http://localhost:3000/book/pages/:pages
- [x] **Actualizar:** *Method -->* **PUT** http://localhost:3000/book/:id
<br> **Edita lo que quieras actualizar**.
<br>
**data**:{
        "name": "Prueba 6",
        "author": "test",
        "pages": 66,
        "description": "Esto es una prueba de ensayo 6"
    }
    
- [x] **Eliminar:** *Method -->* **DELETE** http://localhost:3000/book/:id
