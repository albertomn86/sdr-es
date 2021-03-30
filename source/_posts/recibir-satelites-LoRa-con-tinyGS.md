---
title: Recibir satélites LoRa
date: 2021-03-30 18:55:34
tags: [Satélites, Cubesat, LoRa, tinyGS]
author: EA7KOO
---


[TinyGS](https://tinygs.com/) es una red de estaciones terrestres distribuida alrededor del mundo para la recepción y operación de satélites [LoRa](https://www.thethingsnetwork.org/community/santa-rosa/post/que-es-la-tecnologia-lora-y-por-que-es-importante-para-iot), sondas meteorológicas y otros objetos, usando módulos programables de muy bajo coste.
En este artículo veremos como instalar y configurar nuestra estación terrestre desde cero.

<!-- more -->

{% asset_img logo.png 400 "TinyGS" %}
## Placas compatibles

Podemos encontrar placas compatibles por unos 10€/15€. Algunos de los modelos compatibles más usados son los siguientes:

- Heltec WiFi LoRa 32 V1/V2 (versiones de 433MHz y 863-928MHz).
- TTGO LoRa32 V1/V2 (versiones de 433MHz y 868-915MHz).
- TTGO T-BEAM + OLED (versiones de 433MHz y 868-915MHz).
- FOSSA 1W Ground Station (versiones de 433MHz y 868-915MHz).
- Placas de desarrollo ESP32 con SX126X/SX127X.

Consultar [la web del proyecto](https://github.com/G4lile0/tinyGS/wiki/Ground-Station-configuration#current-available-boards) para más detalles sobre placas compatibles.

## Instalación

Para la instalación seguiremos el método sencillo, que consiste en descargar un programa que realiza la instalación del _firmware_ de forma automática. Para ello accedemos al siguiente enlace para obtener la última versión disponible de TinyGS:

[<center>TinyGS releases</center>](https://github.com/G4lile0/tinyGS/releases/)

Buscamos el instalador en los archivos adjuntos de la última _release_ y descargamos la versión adecuada para el sistema operativo que estemos usando.

{% asset_img assets.png "TinyGS" %}

Una vez descargado, extraemos el programa y lo ejecutamos.

{% asset_img tinygs-upload.png "TinyGS" %}

Ahora seleccionamos el puerto COM en el que tenemos conectada nuestra placa y hacemos clic en **_Upload tinyGS firmware!_**.
Si no nos aparece el puerto COM para seleccionar, debemos asegurarnos de que la placa está bien conectada y que tenemos los controladores previamente instalados.

Una vez termine de grabarse nuestra placa, esta se reiniciará (puede tardar algunos minutos) y quedará lista para el siguiente paso.
## Configuración

### Solicitar datos de acceso

El primer paso para la configuración de nuestra estación será la obtención de nuestros datos de acceso al servidor MQTT del proyecto. Este servidor es el encargado de recolectar los paquetes de datos de los satélites que reciben las distintas estaciones conectadas, así como de la  gestión de las mismas. Para obtener los datos de acceso del servidor debemos acceder al canal del proyecto en Telegram mediante el siguiente enlace:
[<center>tinyGS Community</center>](https://t.me/joinchat/DmYSElZahiJGwHX6jCzB3Q)

Una vez nos unimos al grupo podremos ver un mensaje de bienvenida como el siguiente:

{% asset_img telegram-welcome.png "TinyGS" %}

Para solicitar nuestros datos de acceso debemos iniciar una conversación con el _bot_ del proyecto haciendo clic en el botón **_Open private chat_** que aparece en el mensaje.
Ahora se nos abrirá un nuevo chat con el _bot_ al que enviaremos el mensaje **"/mqtt"**. El _bot_ nos responderá con nuestros datos de acceso que debemos anotar y, por supuesto, no debemos compartir con nadie.

{% asset_img telegram-mqtt.png 400 "Telegram" %}

### Configurar la estación

Una vez tenemos nuestra placa con el _firmware_ instalado y hemos conseguido nuestros datos de acceso, el siguiente paso es configurar la estación.
Si hemos seguido los pasos de esta guía, a estas alturas nuestra estación ya debe haberse reiniciado y debe mostrar por pantalla que está lista para la configuración.

Para acceder a la interfaz de configuración debemos conectarnos primeramente a la red inalámbrica que la propia estación ha creado.

{% asset_img tinygs-red.png "TinyGS" %}

Una vez estemos conectados a esta red, debemos abrir el navegador web y acceder a la dirección **192.168.4.1**. Se nos mostrará un menú con opciones como el siguiente:

{% asset_img tinygs-configure.png 500 "TinyGS" %}

Hacemos clic en **_Configure parameters_** e introducimos los parámetros de configuración de nuestra estación.
Los valores básicos que debemos introducir son los siguientes:

| Parámetro       | Descripción |
|-----------------|-------------|
| GroundStation name          | Nombre de nuestra estación. |
| Password for this dashboard | Clave de acceso que queramos para entrar al panel de datos web. |
| WiFi SSID                   | Nombre de la red WiFi a la que se conectará la estación. |
| WiFi password               | Clave de la red WiFi a la que se conectará la estación. |
| Latitude                    | Latitud. Formato decimal con signo menos para latitud sur.|
| Longitude                   | Longitud. Formato decimal con signo menos para longitud oeste.|
| Timezone                    | Nuestra zona horaria. |
| MQTT Username               | Nombre de usuario que hemos obtenido en el paso anterior. |
| MQTT Password               | Contraseña que hemos obtenido en el paso anterior. |
| Board type                  | Nuestro modelo de placa. |
| OLED Bright                 | Nivel de brillo de la pantalla. Cuanto menor brillo, más tiempo durará la pantalla. |

Podemos ver una descripción más detallada de todos los parámetros en [la web del proyecto](https://github.com/G4lile0/tinyGS/wiki/Ground-Station-configuration).

Una vez introducimos los datos, hacemos clic en **_Apply_** para aplicar los ajustes y reiniciamos la estación.

{% asset_img board.jpg "HELTEC" %}

## Acceder a nuestra estación

Si hemos llegado hasta este paso sin problemas, nuestra estación ya debería estar conectada al servidor MQTT y lista para recibir datos desde los satélites.
Si queremos comprobar el estado de nuestra estación o bien realizar ajustes en la misma tenemos varias formas de interactuar con ella.

La primera forma sería lógicamente mirando la pantalla de la estación. En ella podremos ver el estado de la misma, así como el satélite que está escuchando y el último paquete recibido.

Otra forma sería usando el _bot_ privado de Telegram que hemos usado previamente para obtener los datos de acceso al servidor.
Bastaría con enviarle al _bot_ el mensaje "**/stations**" y nos devolverá un listado con nuestras estaciones conectadas y algunos datos de las mismas.

También podemos ver el estado de nuestra estación accediendo por red local a ella. Para ello necesitamos conocer previamente la dirección IP de la misma, siendo la forma más sencilla de obtenerla la propia pantalla.

{% asset_img board-wifi.jpg "HELTEC" %}

Una vez la tenemos, accedemos mediante el navegador y en el menú hacemos clic en **_Station dashboard_**.

{% asset_img tinygs-dashboard.png 600 "TinyGS" %}

Por último, la forma más completa de consultar el estado y de ver todos los paquetes recibidos, sería desde la web https://tinygs.com

Si accedemos directamente a esta web solo podremos ver los datos públicos de las estaciones y no podremos interactuar con nuestra estación. Para acceder a nuestro propio panel de usuario en la web necesitamos un enlace personalizado que vamos a obtener desde el _bot_ de Telegram. Para que nos genere un enlace le enviamos el mensaje "**/weblogin**" y nos responderá con un enlace temporal que usaremos para acceder a la web. Sobra decir que este enlace no debe ser compartido con nadie, ya que le estaríamos dando el control de nuestra estación.

{% asset_img tinygs-web.png 600 "TinyGS" %}

## Recepción de paquetes

Si tenemos nuestra estación activa y conectada la red MQTT y a la antena, la recepción de los paquetes de datos se hará de forma automática y desatendida. La estación recibe desde el servidor los ajustes de escucha para el satélite que va a realizar el pase sobre nuestra posición y se prepara para recibir la señal. Podemos ver fácilmente el satélite activo en la pantalla:

{% asset_img board-next.jpg "HELTEC" %}

Una vez se reciba un paquete de datos, este se enviará al servidor y se mostrará en pantalla la palabra **_CONFIRMED_**.

{% asset_img board-confirmed.jpg "HELTEC" %}

Si hemos recibido el paquete, pero por cualquier motivo nos ha llegado incompleto o corrupto, veremos un mensaje como el siguiente:

{% asset_img board-error.jpg "HELTEC" %}

Esto quiere decir que el mensaje no ha superado la verificación mediante CRC (código de redundancia cíclica) y no es válido.

Si queremos ver la recepción de los mensajes en tiempo real, podemos acceder al canal de Telegram [TinyGS Telemetry](https://t.me/tinyGS_Telemetry) y ver si nuestros mensajes se están subiendo correctamente al servidor.

{% asset_img telegram-telemetry.png 400 "HELTEC" %}

## Agradecimientos

Finalmente quiero dar mis agradecimientos y reconocimiento a todo el equipo que conforma el proyecto TinyGS y a todos los colaboradores que hacen lo posible.
