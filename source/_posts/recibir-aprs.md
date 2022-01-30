---
title: Recibir APRS
date: 2021-03-23 21:02:24
tags: [APRS, ISS]
author: EA7KOO
updated: 2022-01-30 16:20:24
excerpt: Cómo recibir y decodificar paquetes APRS (terrestres y desde la Estación Espacial Internacional) usando nuestro dispositivo SDR.
---

APRS _(Automatic Packet Reporting System)_ es un sistema de radioaficionado para comunicaciones digitales que utiliza tramas [AX.25](https://es.wikipedia.org/wiki/Protocolo_AX.25). Estos paquetes pueden contener cualquier tipo de mensaje, así como también telemetría y datos de estaciones meteorológicas.
En este artículo veremos cómo recibir y decodificar estos paquetes usando nuestro dispositivo SDR, tanto los provenientes desde cualquier estación terrestre como los que se pueden recibir desde la Estación Espacial Internacional.

<!-- more -->

{% asset_img SDRSharp.png 900 "Paquete APRS en SDR#" %}

## Instalación del software

En este artículo usaremos SDR# para recibir la señal y sacar el audio mediante el [cable de audio virtual](/instalacion-virtual-cable-audio/), aunque también podemos usar cualquier otro programa.

Para decodificar y visualizar los paquetes de datos usaremos los programas que vamos a ver a continuación.

### SoundModem

Para decodificar estos paquetes de datos usaremos el software [Packet-Radio TNC](http://uz7.ho.ua/packetradio.htm) que utiliza la tarjeta de sonido de nuestro ordenador como un modem para AX.25.
Podemos descargarlo desde el siguiente enlace:

[<center>Descargar SoundModem by UZ7HO</center>](http://uz7.ho.ua/modem_beta/soundmodem113.zip)

Una vez descargado el archivo, extraemos su contenido en el directorio que queramos.

Posteriormente ejecutamos el archivo **_soundmodem.exe_** y se nos abrirá la interfaz del programa.

El siguiente paso es configurar el programa para que reciba el audio desde SDR#. Para ello hacemos clic en _Settings_ y en **Input device** seleccionamos el [cable de audio virtual](/instalacion-virtual-cable-audio/).

Por último, seleccionamos el modo **AFSK AX.25 1200bd** en la ventana principal del programa.

{% asset_img soundModemMode.png 370 "SoundModem" %}

### UISS

UISS es un programa que nos permite visualizar los datos contenidos en los paquetes que vamos recibiendo. Si bien el programa anterior ya nos facilita los mensajes decodificados, usaremos UISS para verlos de una forma más clara y poder aprovechar toda la información contenida en ellos.

Lo primero será descargar el programa desde el siguiente enlace:

[<center>Descargar UISS by ON6MU</center>](https://www.qsl.net/on6mu/uissdownload.htm)

Una vez descargado lo ejecutamos y seguimos el asistente para instalar el programa. Durante la instalación en el paso de "Select components" nos volverá a instalar una versión antigua de SoundModem. Lo más sencillo es dejar que la instale (aunque no la vamos a utilizar) y así no tendremos que configurar nada más.

#### UISS-MapView

También vamos a instalar el módulo [UISS-MapView](https://www.qsl.net/on6mu/uissmodules.htm#UISSMapView) para UISS que nos va a permitir visualizar la posición de las estaciones que recibamos en un mapa.
Para instalarlo basta con descargar el módulo desde el siguiente enlace y extraerlo el directorio en el que hemos instalado UISS previamente.

[<center>Descargar UISS-MapView</center>](https://www.qsl.net/on6mu/download/UIMapView_UISS_Addon.zip)

Por último iniciamos SoundModem y después UISS. La primera vez que iniciemos UISS nos pedirá que introduzcamos nuestro indicativo, si lo tenemos, o cualquier otro texto en caso contrario ya que no vamos a emitir nada.
Si todo está correctamente instalado, veremos una ventana como la siguiente en la que podemos leer que UISS se ha conectado correctamente a SoundModem.

{% asset_img UISS.png 500 "UISS" %}


## Recibir APRS

Con todo ya configurado, es el momento de comenzar a recibir paquetes de datos. Para ello iniciamos SDR# o el programa que vayamos a utilizar y sintonizamos cualquiera de las frecuencias asignadas para APRS. Para la región 1, en la que se encuentra España, tenemos las siguientes frecuencias:

- **144,800 MHz** (Frecuencia principal).
- 432,500 MHz (Frecuencia alternativa).

Para latinoamérica (región 2) la frecuencia es 144,390 MHz.

Usaremos el modo **WFM** y un ancho de banda de **10 KHz**.

Conforme vayan llegando paquetes veremos que se van mostrando por pantalla los mensajes.

{% asset_img SoundModemDatos.png 500 "SoundModem" %}

{% asset_img UISSDatos.png 500 "UISS" %}

{% asset_img UISSMap.png 500 "UISS Mapa" %}

## Recibir APRS desde la ISS

La Estación Espacial Internacional (ISS por sus siglas en inglés) lleva a bordo un transpondedor que funciona como repetidor APRS, el cual podemos recibir de una forma muy similar al ejemplo anterior. En este caso la principal diferencia es que tendremos que realizar los pasos habituales para el [seguimiento de satélites](/ajuste-frecuencia-doppler-orbitron/).

Los datos para DDETracker son los siguientes:

**AOS:**
    ```
    radio_Start
    radio_modulation_type<WFM>
    radio_bandwidth_Hz<10000>
    radio_center_frequency_Hz<145825000>
    radio_tracking_frequency_On
    ```

Una vez comenzamos a recibir el pase de la ISS, veremos que aparecen los mensajes recibidos por pantalla.

{% asset_img SoundModemDataISS.png 500 "SoundModem" %}

{% asset_img UISSDataISS.png 500 "UISS" %}

{% asset_img UISSMapISS.png 500 "UISS Mapa" %}
