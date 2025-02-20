

# Descripción
Esta API permite gestionar *Duacoders* dentro de un sistema que incluye funcionalidades básicas relacionadas con operaciones CRUD, además de la generación de archivos *pdf* con el perfil del *Duacoder*, o la exportación de listas filtradas en formato *excel*.

Incluye un sistema de autenticación basado en API Keys, para impedir el libre acceso al consumo de la API, así como funcionalidades de creación y eliminación de claves para los consumidores.

# Requisitos previos
Antes de instalar y ejecutar el proyecto, es necesario tener instalados los siguientes programas en el sistema.
## Node.js y npm
Descarga desde la página oficial: https://nodejs.org/es
## Docker + Docker Compose
La API está desarrollada para ser ejecutada en contenedores Docker. La opción más sencilla para configurar el entorno es descargar e instalar la aplicación Docker Desktop: https://www.docker.com/get-started/

Si realizas la instalación en Windows, asegúrate de habilitar WSL 2 (Windows Subsystem for Linux), necesario para ejecutar los contenedores de la aplicación. Tras la instalación será necesario reiniciar el sistema.




# Compilación y ejecución del proyecto
Para compilar y ejecutar el proyecto, debemos situarnos en la carpeta raiz del mismo y ejecutar los siguientes comandos:
1. Instalación de dependencias

```bash
$ npm install
```
2. Compilación 
 ```bash
$ npm run build
```
3. Construir contenedores Docker
 ```bash
$ docker compose up --build
``` 
## Posibles errores
- **Puerto 3306 ocupado**: Este es el puerto predeterminado para la base de datos. Finaliza el proceso que esté ocupando el puerto o cambia la configuración en el archivo docker-compose.yml
- **No se encuentra docker_engine_linux**: Este error ocurre cuando Docker Desktop no se está ejecutando, o bien está configurado en modo Windows (Windows Containers). Ejecuta Docker Desktop y asegúrate de que está en el modo correcto. 
- **Permisos de Docker Desktop**: La construcción de los contenedores no se realizará con éxito si Docker Desktop no se ejecuta con permisos de administrador. 
  
# Consideraciones adicionales
- **Swagger UI**: La API provee de un endpoint para consultar la documentación interactiva con Swagger UI y realizar peticiones al servidor en la ruta: http://localhost:3000/api. Para realizar peticiones es necesaria la autenticación mediante API Keys, que se puede realizar pulsando el botón *Authorize* en la esquina superior derecha de la interfaz.
- **Api Keys**: La clave inicial del administrador será insertada en la base de datos durante la primera ejecución de la aplicación, tomando el valor definido en el archivo *docker-compose.yml*. Esta concede acceso a determinados endpoints (como la propia generación de claves), que estarán vetados al resto de consumidores de la API.
- **Sample Data**: Si la aplicación se ejecuta en modo *development*, insertará automáticamente datos de ejemplo para Duacoders, Departamentos y Puestos. Los Duacoders no tendrán una imagen asociada en los datos insertados. 

- **Imágenes de Duacoders**: Las imágenes asociadas a los Duacoders pueden ser obtenidas a través de la ruta especificada en el campo 'photoLink' (ej: http://localhost:3000/photoLink). Además, son utilizadas en la generación del perfil del duacoder en formato *pdf*.


