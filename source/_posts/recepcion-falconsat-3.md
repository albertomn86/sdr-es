---
title: Recepción del satélite FalconSAT-3
date: 2021-10-17 10:31:38
tags: [Satélites, PACSAT]
author: EA7KOO
---

El satélite FalconSAT-3 fue construido entre 2005 y 2006 por cadetes de la academia de la fuerza aérea de Estados Unidos. Desde que fue lanzado en 2007, el satélite ha llevado a cabo dos fases operadas por la academia de la fuerza aérea estadounidense y una tercera fase desde 2017 en la que se abrió su uso para el servicio de radioaficionados. El satélite funciona actualmente como repetidor en modo PACSAT.
PACSAT es un término genérico usado para describir un servicio digital para radioaficionados de almacenamiento y distribución por satélite. Este sistema, que utiliza el protocolo AX.25 para los paquetes de datos, permite reenviar mensajes de correo electrónico, telemetría, boletines informativos, etc.
En este artículo veremos como recibir estos mensajes con nuestro SDR.

<!-- more -->

## Datos del satélite

| Satélite        | FalconSAT-3 |
|-----------------|---|
| **Operador**    | AMSAT-NA (3ª fase) |
| **NORAD ID**    | 30776 |
| **COSPAR ID**   | 2007-006E |
| **Tamaño**      | 43,3 cm x 43,3 cm x 78,7 cm (54,3 Kg) |
| **Lanzamiento** | 9 de Marzo de 2007 |
| **Señal**       | Subida: 145,840 MHz, Bajada: 435,103 MHz (9600bps GMSK) |
| **Web**         | https://www.amsat.org/falconsat-3/ |

{% asset_img falconsat-3.jpg 400 "FalconSAT-3" %}


## Instalación del software

Para la recepción de la señal del satélite podemos usar cualquier programa. En este ejemplo se utiliza SDR# para recibir la señal y sacar el audio mediante el cable de audio virtual.

### HS SoundModem

Para demodular la señal de audio que recibimos a través del cable de audio virtual, usaremos un software que haga de TNC. Para ello usaremos [High-Speed SoundModem de UZ7HO](http://uz7.ho.ua/packetradio.htm), el cual instalaremos siguiendo los pasos que ya vimos anteriormente para la [recepción de los satélites CAS-4](/2020/10/10/recepcion-cas4/#Decodificar-la-senal).

### PacSat decoder

Por último, necesitamos instalar el programa que va a decodificar y mostrar los mensajes. Se trata del programa _"AMSAT Pacsat Ground Station"_, el cual podemos descargar desde el siguiente enlace:

[<center>AMSAT Pacsat Ground Station Software</center>](https://www.g0kla.com/pacsat/)

Una vez descargado, extraemos el contenido en cualquier directorio e iniciamos el programa desde el ejecutable "PsatGround.exe".
Necesitamos tener instalada la máquina virtual de Java para poder ejecutar el software. Podemos descargar la ultima versión desde la [web oficial de Oracle](https://www.java.com/es/download/).

Ahora vamos a _"File"_ y _"Settings"_ e introducimos la ruta de los directorios que usaremos para guardar los logs y archivos recibidos, y también los datos de nuestra estación.

{% asset_img pacsat-config.jpg 500 "PacSat - Configuración" %}


## Recepción

Una vez tenemos todo instalado, debemos iniciar los programas en el siguiente orden para dejarlos preparados para recibir el pase.

1. Iniciamos HS SoundModem y seleccionamos el modo **FSK G3RUH 9600bd**.

2. Iniciamos el decoder de PacSat. Este se conectará al socket de HS SoundModem para recibir los mensajes. Veremos que aparece el mensaje _"TNC IN FULL DUPLEX"_ si se ha conectado correctamente.
   {% asset_img pacsat.jpg "PacSat" %}

3. Por último, iniciamos SDR# y ajustamos el **modo a NFM y un ancho de banda de 10 kHz**.

Una vez comience a recibirse la señal suficiente, veremos que se van decodificando y apareciendo mensajes en el PacSat decoder.

{% asset_img recepcion.jpg 900 "Recibiendo señal con SDR#" %}

{% asset_img pacsat-mensajes-recibidos.jpg "PacSat - Mensajes recibidos" %}

Los mensajes pueden contener varias partes y necesitamos recibirlas todas para poder mostrar el mensaje completo. Algunos mensajes pueden requerir de varios pases del satélite para poder descargar todas sus partes.
Una vez las tenemos todas, basta hacer doble clic en el mensaje para ver su contenido.

{% asset_img pacsat-mensaje.jpg "PacSat - Mensaje" %}

{% asset_img pacsat-mensaje2.jpg "PacSat - Mensaje" %}
