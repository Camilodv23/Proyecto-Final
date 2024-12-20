# Aplicacion de gestion de tareas

## Descripción

Esta es una aplicación completa de gestión de tareas que incluye un frontend (React) y un backend (Node.js con Express). Permite a los usuarios registrarse, iniciar sesión, y realizar operaciones CRUD sobre sus tareas.
Tambien incluye filtrado por tareas completadas y filtrado por creadores de tareas.

## Requisitos

- **Node.js** y **npm** instalados.
- **MongoDB** corriendo localmente o en un servidor accesible.
- Configurar un archivo .env en el backend con las siguientes variables:
  ```env
  MONGO_URI=<tu string connection>
  PORT=3000 o 5000
  ```

## Pasos para poner en marcha la aplicacion

1- Clonar el repositorio con git clone y la url

2- Abrir por separado ambas carpetas con vsc y en la terminal ejecutar npm install para instalar las dependencias

3- Una vez tenga las dependencias instaladas, ejecutar "npm run dev" tanto en la terminal del back como la del front

4- Abrir el localhost de react en el browser y la interfaz grafica de mongo (compass)
