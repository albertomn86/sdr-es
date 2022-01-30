---
title: "Recepción del satélite JY1-SAT"
date: 2020-02-25 20:45:38
tags: [Satélites, Cubesat]
author: EA7KOO
excerpt: En esta guía veremos como recibir la telemetría del satélite JY1-SAT.
---

El satélite JY1-SAT es un CubeSat construido por estudiantes de varias universidades de Jordania y financiado por la Jordan's Crown Prince Foundation.
JY1-SAT se basa en la plataforma FUNCube, por lo que también se identifica como FUNcube-6. Además de las funciones habituales de FUNcube, el satélite envía imágenes en formato SSDV.
En este artículo veremos como recibir la telemetría y las imágenes.

<!-- more -->

## Datos del satélite

| Satélite        | JY1-SAT (JO-97) |
|-----------------|---|
| **Operador**    | Crown Prince Foundation |
| **NORAD ID**    | 43803 |
| **COSPAR ID**   | 2018-099AX |
| **Tamaño**      | 1U CubeSat (1.11 Kg) |
| **Lanzamiento** | 3 de Diciembre de 2018 |
| **Señal**       | 145,840 MHz (1200 bps BPSK) |
| **Web**         | https://www.cpf.jo/en/our-initiatives/masar |

## Recepción

JY1-SAT envía los datos de telemetría y las imágenes en la frecuencia **145.840 MHz**. Para recibir la señal debemos realizar los pasos habituales para el seguimiento de satélites.

Los datos para DDETracker son los siguientes:

**AOS:**
    ```
    radio_Start
    radio_modulation_type<USB>
    radio_bandwidth_Hz<4800>
    radio_center_frequency_Hz<145840000>
    radio_tracking_frequency_On
    ```
</br>
{% asset_img sdrsharp.png "SDRSharp JY1-SAT" %}


## Decodificación

Al ser un proyecto basado en FUNcube, el software es muy similar al que ya hemos usado para el [FUNcube-1](/recepcion-funcube1/). Podemos descargarlo desde el siguiente enlace:

[<center>JY1Sat Dashboard v1189</center>](https://download.funcube.org.uk/JY1Sat_Dashboard_v1189.msi)

Una vez descargado, lo instalamos como cualquier aplicación de Windows y lo iniciamos.

El siguiente paso es configurarlo. Para ello hacemos clic en **"File"** y después **"Settings..."**. Esto nos abre la pestaña de configuración del programa.
Ahora debemos indicarle que le vamos a pasar el audio desde SDR#, así que seleccionamos nuestro [cable de audio virtual](/instalacion-virtual-cable-audio/) en la opción **"Input Device"**.

{% asset_img config.png "JY1-SAT Dashboard Configuración" %}

Hacemos clic en **"Save"** y ya tendremos el programa listo para recibir la señal desde SDR#.
Para iniciar el procesamiento de señal hacemos clic en **"Capture"** y **"Capture From Soundcard"**. Ahora cuando el satélite comience a recibirse en SDR#, podremos ver los datos en tiempo real en el programa.

_Telemetría:_
{% asset_img telem.png "JY1-SAT Dashboard Telemetría" %}

_Imágenes:_
{% asset_img images.png "JY1-SAT Dashboard Mensajes" %}


Las imágenes necesitan algunos pases para recibirlas completamente.

{% asset_img JY1SatAudioId7.jpg "JY1SatAudioId7" %}
</br>
{% asset_img JY1SatAudioId8.jpg "JY1SatAudioId8" %}
</br>
{% asset_img JY1SatAudioId9.jpg "JY1SatAudioId9" %}
</br>
