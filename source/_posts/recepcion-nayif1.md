---
title: "Recepción del satélite NAYIF-1"
date: 2020-02-26 09:32:14
tags: [Satélites, Cubesat]
author: AlbertoMN
---

El satélite NAYIF-1 es un CubeSat construido por estudiante de la _Emirates Institution for Advanced Science and Technology (EIAST)_, en colaboración con la _American University of Sharjah (AUS)_.
NAYIF-1 se basa en la plataforma FUNCube, por lo que también se identifica como FUNcube-5.
Este satélite envía datos de telemetría y mensajes que pueden ser recibidos con nuestros dispositivos SDR. En este artículo veremos como recibirlos y decodificarlos.

<!-- more -->

## Datos del satélite

| Satélite        | NAYIF-1 (EO-88) |
|-----------------|---|
| **Operador**    | EIAST y AUS |
| **NORAD ID**    | 42017 |
| **COSPAR ID**   | 2017-008BX |
| **Tamaño**      | 1U CubeSat (1.32 Kg) |
| **Lanzamiento** | 15 de Febrero de 2017 |
| **Señal**       | 145.940 MHz (1200 bps BPSK) |
| **Web**         | https://www.mbrsc.ae/satellite-programme/nayif-1 |

## Recepción

NAYIF-1 envía los datos de telemetría en la frecuencia **145.940 MHz**. Para recibir la señal debemos realizar los pasos habituales para el seguimiento de satélites.

Los datos para DDETracker son los siguientes:

**AOS:**
    ```
    radio_Start
    radio_modulation_type<USB>
    radio_bandwidth_Hz<4800>
    radio_center_frequency_Hz<145940000>
    radio_tracking_frequency_On
    ```
</br>
{% asset_img sdrsharp.png "SDRSharp NAYIF-1" %}


## Decodificación

Al ser un proyecto basado en FUNcube, el software es muy similar al que ya hemos usado para el [FUNcube-1](https://sdr-es.com/2020/02/22/recepcion-funcube1/) y [JY1-SAT](https://sdr-es.com/2020/02/25/recepcion-jy1sat/). Podemos descargarlo desde el siguiente enlace:

[<center>Nayif-1 Dashboard v1040</center>](https://download.funcube.org.uk/Nayif-1_Dashboard_1040_Installer.msi)

Una vez descargado, lo instalamos como cualquier aplicación de Windows y lo iniciamos.

El siguiente paso es configurarlo. Para ello hacemos click en **"File"** y después **"Settings..."**. Esto nos abre la pestaña de configuración del programa.
Ahora debemos indicarle que le vamos a pasar el audio desde SDR#, así que seleccionamos nuestro [cable de audio virtual](https://sdr-es.com/2020/01/21/instalacion-virtual-cable-audio/) en la opción **"Input Device"**.

{% asset_img config.png "NAYIF-1 Dashboard Configuración" %}

Hacemos click en **"Save"** y ya tendremos el programa listo para recibir la señal desde SDR#.
Para iniciar el procesamiento de señal hacemos click en **"Capture"** y **"Capture From Soundcard"**. Ahora cuando el satélite comience a recibirse en SDR#, podremos ver los datos en tiempo real en el programa.

_Telemetría:_
{% asset_img telem.png "NAYIF-1 Dashboard Telemetría" %}

_Mensajes:_
{% asset_img messages.png "NAYIF-1 Dashboard Mensajes" %}
