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

### 1. Crea un proyecto en _Parcel_.

Como en prácticas anteriores, para comenzar crearemos un proyecto con Parcel para poder trabajar y realizar la práctica. Para ello 
comenzamos creando la estructura del proyecto .

#### Pasos para crear el proyecto.

* **Scaffolding** 

  Creamos las carpetas:
  ```
  mkdir -p nombre-repo/src/{css,js,assets}
  ```
  Nos situamos en el repo:
  ```
  cd nombre-repo
  ```
* **Git**

  Inicializamos el repo con git:
  ```
  git init
  git remote add origin...
  touch .gitignore
  touch README.md
  ```
* **NPM**

  Inicializamos el repo con npm:
  ```
  npm init -y
  ```
* **Instalación de ParcelJS**
  ```
  // Instalamos parcel en nuestro proyecto.
  npm install -D parcel-bundler
  
  // Punto de entrada para parcel.
  npx parcel src/index.html
  ```
* **Linters**
  ```
  npm install -D eslint
  ```
* **Formateador de código: Prettier**
  ```
  // Configurar nuestro proyecto para Prettier
  npm install -D prettier
  
  // Plugins para evitar conflictos entre Prettier y ESLint.
  npm install -D eslint-config.prettier eslint-plugin-prettier
  ```
  
  Tras esto, la estructura final del proyecto quedaría:
  
  ![Captura1](src/assets/captures/cap1.png)
  
### 2. Código _HTML_.

La estrucutura de `index.html` es la siguiente:

 ![Captura2](src/assets/captures/cap3.png)
 
El código de `index.html` es sencillo. La etiqueta _HTML_ que contiene la clase _race_ indica en que parte de la página estará
situada la carrera. Dentro de dicho elemento, se encuentra otra etiqueta con la clase _road_, donde introduciremos los jugadores a
la carrera mediante código _Javascript_.

```
<div class="race">
  <div class="road"></div>
</div>
```

Además, creamos dos botones, uno para comenzar la carrera, y el otro, para que una vez finalice la carrera, se pueda volver a 
iniciar.

```
<div class="buttons">
  <button class="start">Start</button>
  <button class="restart">Restart</button>
</div>
```
### 3. Código _CSS_.

* **.race** y **.road**:

 ![Captura3](src/assets/captures/cap4.png)
 
Especificamos el estilo de ambas clases _CSS_.
 
* **.buttons**:

![Captura4](src/assets/captures/cap5.png)

Especificamos el estilo de ambos botones en _CSS_. Usamos la pseudo-clase `hover`, para que cuando el usuario interactúe con 
cualquiera de los botones, cambie el estilo del botón. También, indicamos en CSS el estilo de los botones cuando estén
desactivados.

* **PostCSS:**

En esta práctica tambien se ha hecho uso de **PostCSS**, que son plugins de _Javascript_ que transforman el código _CSS_. 

Para incorporarlo a nuestro proyecto, como hacemos uso de _Parcel_, el paquete de postcss ya está incorporado, sin embargo debemos
instalar los paquetes que deseemos mediante **npm** utilizando los siguientes comandos:

```
$ npm install -D autoprefixer postcss-clean postcss-font-magician postcss-mixins postcss-nesting
```
Una vez instalados los paquetes, creamos un archivo de configuración `.postcssrc`.

```
{ 
  "plugins": {
    "postcss-mixins": true,
    "postcss-font-magician": true,
    "postcss-nesting": true,
    "autoprefixer": true,
    "postcss-clean": true
   }
}
```

### 4. Código _Javascript_.

Utilizando _Javascript_, creamos el componente **KartPlayer**:

 ![Captura5](src/assets/captures/cap2.png)
 
* `index.js`:

 ![Captura6](src/assets/captures/cap6.png)
 
En `index.js` se desarrolla la actividad general del juego. Al igual que en la práctica anterior, creamos un array `karts` que
contendrá la información deseada de todos los karts. En `player` importamos todas las imágenes de nuestros jugadores y mediante 
el uso de un _for_, guardamos `name`(_key_ del nombre) y `image` (imagen del _player_). En la constante `config` almacenamos la
imagen del _player_ y creamos una coordenada _y_ que se corresponderá a la posición donde irá el kart en la carrera.

 ![Captura7](src/assets/captures/cap7.png)
 
Sigue un enfoque funcional, es decir, con pequeñas funciones flecha.

*  * `startRace()`:

  Creamos una variable `timer` que será la encargada de ejecutar cada "x" tiempo (60 fps) la función `startIteration()`.
  Desactivamos ambos botones.
  
*  * `endRace()`:

  Limpiamos la variable `timer`. Comprobamos el estado de todos los _karts_ al finalizar la carrera, por lo que llamamos a la
  función `isWinner()` implementada en `KartPlayer`, si un kart es ganador, llamamos al método `.win()`, si no, al método
  `.lose()` (ambas implementadas tambien en `KartPlayer`). Activamos el botón de _Restart_.
  
*  * `restartRace()`:

  Por cada kart, hacemos una llamada al método `restart()` de `KartPlayer`. Activamos el botón de _Start_.

*  * `startIteration()`:

  Se encarga de llamar al método `inc()` de `KartPlayer` que asigna la cantidad que avanza cada kart durante la carrera. Si algún
  kart resulta el ganador, llamamos a la función `endRace()`.

* `KartPlayer.js`:

![Captura8](src/assets/captures/cap8.png)

En el componente `KartPlayer.js` creamos el shadowDOM para encapsular el HTML y CSS del componente y que no afecte a otros
karts. 

Además del código proporcionado inicialmente, se han añadido más estilos para las funciones que determinan cuando un kart es
ganador o perdedor.

* * `super()`:

  Llama a la clase padre _HTMLElement_.

* * `this.attachShadow()`: 

  Creamos el **ShadowDOM**.

* * `get styles()`:

  Añadimos los estilos para los karts cuando gana o pierde. En `:host`, establecemos el estilo para cada kart durante toda la
  carrera.

![Captura9](src/assets/captures/cap9.png)

La función `render()` se encarga de mostrar los jugadores. Inyecta el código _HTML_ sobre el elemento del **LightDOM** que
contiene al **ShadowDOM**.

La función `inc()` se encarga de incrementar la cantidad a la que avanza el kart en el eje x, junto con la función `setSpeed()`
que se encarga de asignar aleatoriamente la velocidad que toma el kart.

![Captura10](src/assets/captures/cap10.png)

Las funciones `win()` y `lose()` se encargan de mostrar el kart ganador y los karts perdedores. Funciona igual que la función `render()`.

![Captura11](src/assets/captures/cap11.png)
 
Por último, la función `isWinner()` comprueba cuando un kart es ganador. Como los karts avanzan en el eje x y el tamaño de la
carrera es 950, cuando la x sea mayor o igual a dicha cantidad, ese kart será el ganador.

La función `addToRoad()`, tal y como su nombre indica, añade los karts a la carretera. Con `appendChild()` agregamos un nuevo
elemento hijo al elemento padre (_road_). La función `restart()` que se encarga de reiniciar la carrera asignando la x de nuevo a 0.

### 5. Publicación en _gh-pages_.
 
Para publicar nuestro proyecto en **gh-pages**, ejecutamos los siguientes comandos:
```
$ npx parcel build src/index.html --no-minify
$ npx parcel build src/index.html --no-source-maps --detailed-report
$ npx parcel build src/index.html --public-url /dsi-p5-mkart-alu0100833010/ -d build
$ npx gh-pages -d build
```
![Captura12](src/assets/captures/cap12.png)

Enlace:  https://ull-esit-dsi-1920.github.io/dsi-p5-mkart-alu0100833010/

