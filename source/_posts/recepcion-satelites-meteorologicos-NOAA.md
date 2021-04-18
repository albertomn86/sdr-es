---
title: Recepción de satélites meteorológicos NOAA
date: 2020-03-20 13:16:52
tags: [Satélites, Satélites meteorológicos, NOAA]
author: EA7KOO
---

Actualmente existen infinidad de satélites meteorológicos orbitando la Tierra. La mayoría de ellos envían sus imágenes y datos encriptados a las estaciones terrestres, pero existen otros satélites de los que es posible recibir sus imágenes de forma sencilla utilizando un dispositivo SDR. En este artículo veremos como recibir imágenes de los satélites meteorológicos NOAA. Estos satélites pertenecen a la agencia científica estadounidense NOAA (*National Oceanic and Atmospheric Administration*). Orbitan en una órbita polar y tienen como finalidad recoger datos atmosféricos tales como imágenes de las nubes y superficie terrestre, temperatura y humedad atmosférica y los niveles de ozono en las capas altas de la atmósfera.

Estos satélites envían la información en diferentes frecuencias y modulaciones. En este articulo veremos como recibir las imágenes de baja resolución en formato [APT](https://en.wikipedia.org/wiki/Automatic_picture_transmission).

<!-- more -->

{% asset_img apt.jpg 500 "Imagen APT de satélite NOAA" %}


## Datos de los satélites

Actualmente podemos recibir imágenes APT desde los siguientes satélites meteorológicos NOAA.

| Satélite        | NOAA 15 | NOAA 18 | NOAA 19 |
|-----------------|---|---|---|
| **NORAD ID**    | 25338 | 28654 | 33591 |
| **COSPAR ID**   | 1998-030A | 2005-018A | 2009-005A |
| **Masa de lanzamiento** | 1.457 Kg | 1.457 Kg | 1.440 Kg |
| **Fecha de lanzamiento** | 13 de Mayo de 1998 | 20 de Mayo de 2005 | 6 de Febrero de 2009 |
| **Señal APT**   | 137,620 MHz | 137,9125 MHz | 137,100 MHz |


## Instalación de WXtoImg

Existen diferentes programas y utilidades para decodificar la señal APT de estos satélites. En este artículo vamos a utilizar **SDR#** y el software **WXtoImg** para Windows. Podemos descargarlo desde el siguiente enlace (para Windows 10 descargar la version beta 2.11.2):

[<center>Descargar WXtoImg</center>](https://wxtoimgrestored.xyz/downloads/)

Una vez descargado e instalado, realizaremos los siguientes pasos para configurarlo:

1. Introducir los datos de nuestra ubicación. Estos datos los necesita WXtoImg para calcular los pases de los satélites y para colocar la capa de líneas con los contornos. Cuanto más ajustados sean estos valores, mejor se ajustará esta capa a la imagen. Para introducirlos vamos a _**\"Options\"**_ y _**\"Ground Station Location...\"**_. En esta ventana introducimos nuestras coordenadas y altitud.

{% asset_img wx_ground.jpg "WXtoImg" %}

2. Ajustes de grabación. Tenemos que indicarle a WXtoImg que le vamos a pasar la señal desde SDR# mediante el cable de audio virtual. Para ellos vamos a _**\"Options\"**_ y _**\"Recording Options\"**_. Aquí seleccionamos nuestro cable de audio virtual.

{% asset_img wx_recording.jpg "WXtoImg" %}

3. Marcamos la opción de resincronizado en _**\"Options\"**_, _**\"Resync\"**_.

{% asset_img wx_resync.jpg "WXtoImg" %}

4. Podemos hacer que WXtoImg nos genere las imágenes que queramos añadiendo los datos de la telemetría una vez termine de recibir la imagen del satélite. Para ello vamos a _**\"Options\"**_, _**\"Auto Processing Options...\"**_ y marcamos _**\"Create image(s)\"**_. Después hacemos click en _**\"Image Settings...\"**_ y elegimos las imágenes que queramos.

{% asset_img wx_record.jpg "WXtoImg" %}

5. Por último actualizamos los datos de posición de los satélites en WXtoImg. Vamos a _**\"File\"**_ y hacemos click en _**\"Update Keplers\"**_. Una vez se actualicen, el programa nos mostrará en la parte inferior de la ventana la información del siguiente pase sobre nuestra ubicación.

{% asset_img wx_siguiente.jpg "WXtoImg" %}


## Recepción

Para recibir la señal debemos realizar los pasos habituales para el seguimiento de satélites que ya vimos en el artículo ["Ajuste de frecuencia en recepción de satélites"](https://sdr-es.com/2020/02/18/ajuste-frecuencia-doppler-orbitron/).

Los datos para DDETracker son los siguientes:

**AOS:**
    ```
    radio_Start
    radio_modulation_type<wfm>
    radio_bandwidth_Hz<36000>
    radio_tracking_frequency_On
    ```

Para recibir el pase tenemos que sacar el audio de SDR# mediante el cable de audio virtual y tener WXtoImg abierto. Una vez el satélite comience a verse sobre el horizonte, SDR# iniciará el seguimiento y WXtoImg comenzará a recibir y procesar la señal.

{% asset_img sdr_sharp.jpg "SDR#" %}

Es importante asegurarse que el volumen de la salida de SDR# sea el adecuado. Podemos ver el nivel que llega a WXtoImg en la esquina inferior derecha. Para que la imagen se genere correctamente, el indicador de nivel de volumen debe mantenerse en color verde durante todo el pase.

{% asset_img wx_recibiendo.jpg "WXtoImg" %}

Al finalizar el pase, WXtoImg dejará de grabar y generará las imágenes que le hemos indicado en el paso 4 de la configuración.

{% asset_img wx_terminado.jpg 500 "WXtoImg" %}
