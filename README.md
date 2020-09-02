# dsi-p8-docker-alu0100833010

_Práctica 8.  Docker._

## Descripción de la Práctica  dsi-p8-docker.

### ¿Qué es Docker? 

**Docker** es un proyecto de código abierto que sirve para automatizar el despliegue de aplicaciones dentro de _contenedores_ software. En los contenedores se integra la
aplicación y es posible crear varios contenedores, unirlos y utilizarlos conjuntamente.

* **¿Por qué Docker**: 

  Un _contenedor_ de **Docker** se reemplaza por el motor de Docker y el SO no está integrado en el contenedor porque se usa Docker para interactuar con él.
  
  * * Aislamiento entre aplicaciones, aislamiento entre servicios y aislamiento inteligente.
  * *	Portabilidad, organización y control de versiones.

* **Partes de Docker:**

  * *	**Aplicación de Docker**: Motor que nos permite arrancar cualquier sistema disponible en las imágenes de Docker. También podemos crear nuestras propias imágenes.
  *	* **Imagen de Docker**: Sistema ya preestablecido para arrancar en la máquina.
  * *	**Contenedor**: Es creado en base a una imagen.

* **Docker Compose:**

  Docker Compose es una herramienta que permite simplificar el uso de Docker. A partir de archivos YAML es mas sencillo crear contendores, conectarlos, habilitar puertos,
  volumenes, etc.

* **Objetivo**:

  El objetivo de esta práctica es aprender el funcionamiento de Docker montando dos contenedores, que se crearán a partir de dos ficheros Dockerfile y uniéndolos a través de
  Docker compose. En el primero de ellos tendremos una aplicación Node (Backend) y en el segundo una web utilizando Parcel (Frontend).

## Comenzando

### 1. Crea un proyecto con _Docker_.

Para ello comenzamos creando la estructura del proyecto.

#### Pasos para crear el proyecto.

* **Scaffolding** 

  Creamos la siguiente estructura de archivos y carpetas:
  ```
  + backend/                  Carpeta con la app node
      - server.js              Applicación node
      - data.json              Fichero de datos JSON
      - Dockerfile             Info para generar el contenedor de Docker
      - package.json           Info del proyecto backend
      - run.sh                 Script para crear el contenedor
  + frontend/                 Carpeta con la web con parcel
      - src/                   Carpeta con los ficheros fuente del front
      - Dockerfile             Info para generar el contenedor de Docker
      - nginx.conf             Configuración del servidor web Nginx
      - package.json           Info del proyecto frontend
      - run.sh                 Script para crear el contenedor
  - docker-compose.yml        Fichero de Docker Compose (ver más adelante)
  - run.sh                    Script para lanzar Docker Compose
  ```
* **Git**

  Inicializamos el repo con git:
  ```
  git init
  git remote add origin...
  touch .gitignore
  touch README.md
  ```
* **Instalación de Docker**

  Pasos previos a la instalación:
  ```
  // Eliminamos paquetes obsoletos de Docker que pueden estar en nuestro sistema.
  $ sudo apt-get remove \ 
	  docker\	
		docker-engine\
		docker.io\
		containerd\
		runc 
    
  // Actualización.
  $ sudo apt-get update
  
  // Instalamos paquetes que necesitamos para poder instalar docker.
  $ sudo apt-get install apt-transport-https \
	  ca-certificates \
		curl \
		cnupg2 \
		software-properties-common
  ```
  
  Instalación de _Docker_:
  ```
  // La primera línea añade una clave para añadir el repositorio, y el segundo añade los repos para instalar Docker. 
  $ curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add –
  $ sudo add-apt-repository “deb [arch=amd64] https://download.docker.com/linux/ubuntu \ $(lsb_release -cs) stable”
  
  // Volvemos a actualizar el repositorio e instalamos los paquetes.
  $ sudo apt-get update
  $ sudo apt-get install docker-ce \
  	docker-ce-cli \
     	containerd.io

  // Añadimos al usuario de ubuntu al grupo docker.
  $ sudo usermod -aG docker $USER
  
  // Comprobamos que se ha instalado correctamente.
  $ docker --version
  ```
   
### 2. Configuración del _Backend_.

Nos situamos sobre la carpeta _Backend_:

* **NPM**

  Inicializamos el repo con npm:
  ```
  npm init -y
  ```
La estructura de archivos es la siguiente:  

![Captura1](src/assets/captures/cap1.png)

Para correr nuestro servidor node con nuestra aplicación, ejecutamos `node server.js`.

El primer _contenedor_ albergará una sencillísima aplicación **Node** en el fichero `server.js`, a la que instalaremos con npm la dependencia _express_. 

![Captura2](src/assets/captures/cap2.png)

Nuestra aplicación escuchará y responderá dos peticiones al correr nuestro servidor:

* `/`: Petición a la página principal que nos devuelve la versión de la app.

![Captura3](src/assets/captures/cap3.png)

* `/api`: Petición a la ruta que nos devuelve un _JSON_ con información de los vengadores, incluidos en el fichero data.json.

![Captura4](src/assets/captures/cap4.png)

### 3. Dockerizar el _Backend_.

Ahora, nuestro objetivo es crear un contenedor con esta aplicación. Con esto podríamos tener **Node** en dicho contenedor y no necesitarlo en nuestro sistema anfitrión para
hacer funcionar la aplicación.

Para ello, crearemos un fichero `Dockerfile`:
  
![Captura5](src/assets/captures/cap5.png)  

Donde especificamos:

* `FROM`: Imagen en la que nos basamos de Node.

* `WORKDIR`: Directorio de la app.

* `COPY`: Archivos que queremos copiar a la imagen.

* `RUN`: Instalación de las dependencias.

* `EXPOSE`: Puerto de la aplicación.

* `CMD`: Comando para ejecutar la app.
 
A continuación, creamos y ejecutamos nuestro contenedor. Para ello, creamos un fichero `run.sh` con los comandos necesarios para construir la imagen de docker y ejecutar el
contenedor basado en esa imagen.

 ![Captura6](src/assets/captures/cap6.png)
 
Al ejecutar `$ docker images`, nos debería aparecer la imagen de **Docker** que acabamos de crear:

![Captura7](src/assets/captures/cap7.png)

### 4. Crear nuestra web _Frontend_.

Nos situamos sobre la carpeta _Frontend_:

* **NPM**

  Inicializamos el repo con npm:
  ```
  npm init -y
  ```
* **Instalación de ParcelJS**
  ```
  // Instalamos parcel en nuestro frontend para poder comprobar como está quedando nuestra aplicación.
  npm install -D parcel-bundler
  
  // Punto de entrada para parcel.
  npx parcel src/index.html
  ```
La estructura de archivos es la siguiente:  

![Captura8](src/assets/captures/cap8.png)
  
Y pasamos a configurar nuestra web:

* `index.html`

![Captura9](src/assets/captures/cap9.png)

* `index.css`

![Captura10](src/assets/captures/cap10.png)

* `index.js`

![Captura11](src/assets/captures/cap11.png)

Realizamos un fetch a la URL de la API de Node. 

* `Avenger.js`

![Captura12](src/assets/captures/cap12.png)

A grandes rasgos, nuestra aplicación es similar a la _práctica 4: PokeDex_.

Ahora, al igual que hicimos con **node**, debemos crear un contenedor para almacenar nuestra web frontend. En este caso, deberemos crear una imagen _multi-stage_. 






