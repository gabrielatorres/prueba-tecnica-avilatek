<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <h2 align="center">Prueba Técnica - Avila Tek</h2>
    <p align="center">

---

## Getting started

1. Clonar el proyecto.
2. Ejecutar: `npm install` .
3. Clonar el archivo `.env.template` y renombrarlo a `.env`.
4. Cambiar los valores de las variables de entorno a sus valores reales.
5. Ejecutar proyecto en modo desarrollo: npm run start:dev

---

## API Endpoints

Todos con prefijo {{urlBase}} Ej. http://localhost:3000

1. SignUp: `/api/auth/signup`
2. SignUp: `/api/auth/signin`
3. Logout: N/A
4. Buscar usuario `/api/auth?term`
5. Paginación de todos los usuarios `/api/auth/all?limit=&offset=`

---

## Comments

La estrategia utilizada para el Inicio de sesión ha sido con JWT y este tipo
de autenticación no tiene estado por lo tanto no puede ser invalidado hasta
que expire, evitando que el servidor deba hacer seguimiento
de los usuarios autenticados, por lo tanto no se debe hacer nada del lado del
servidor para cerrar sesión de un usuario, esto se maneja del lado del usuario
eliminando el token de acceso.

También es posible crear una lista de tokens agregando el token de acceso actual
a la misma y si el token se encontrase comprometido, se elimina de la lista,
no obstante, esto añade más complejidad a la respuesta del ejercicio y por lo
tanto no se ejecutó, adicionalmente, este método incide en el performance de las
aplicaciones que lo implementen.

---

## Stay in touch

- Author - [Gabriela Torres](https://www.linkedin.com/in/gabriela-torres-hernandez/?locale=en_US)
- Twitter - [@bygadev](https://twitter.com/bygadev)

---

## License

[MIT licensed](LICENSE).

---
