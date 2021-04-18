---
title: "Recepción del satélite FUNcube-1"
date: 2020-02-22 11:37:32
tags: [Satélites, Cubesat]
author: EA7KOO
---

El satélite FUNcube-1 es un [CubeSat](https://es.wikipedia.org/wiki/CubeSat) construido por AMSAT-UK con fines educativos.
Como parte de su misión, FUNcube-1 está equipado con distintos sensores que monitorizan el estado del satélite y envía la telemetría por radio. Estos datos pueden ser recibidos con nuestros dispositivos SDR y en este artículo veremos como recibirlos y decodificarlos.

<!-- more -->

## Datos del satélite

| Satélite        | FUNcube-1 (AO-73) |
|-----------------|---|
| **Operador**    | AMSAT-UK |
| **NORAD ID**    | 39444 |
| **COSPAR ID**   | 2013-066AE |
| **Tamaño**      | 1U CubeSat (0,98 Kg) |
| **Lanzamiento** | 21 de Noviembre de 2013 |
| **Señal**       | 145.935 MHz (1200 bps BPSK) |
| **Web**         | https://funcube.org.uk/ |

## Recepción

FUNcube-1 envía los datos de telemetría en la frecuencia **145.935 MHz**. Para recibir la señal debemos realizar los pasos habituales para el seguimiento de satélites que ya vimos en el artículo ["Ajuste de frecuencia en recepción de satélites"](https://sdr-es.com/2020/02/18/ajuste-frecuencia-doppler-orbitron/).

Los datos para DDETracker son los siguientes:

**AOS:**
    ```
    radio_Start
    radio_modulation_type<USB>
    radio_bandwidth_Hz<4800>
    radio_center_frequency_Hz<145935000>
    radio_tracking_frequency_On
    ```
</br>
{% asset_img SDRSharp_FUNcube1.png "SDRSharp FUNcube-1" %}


## Decodificación

Para decodificar los datos de telemetría vamos a utilizar el software que AMSAT nos facilita para este satélite. Podemos descargarlo desde el siguiente enlace:

[<center>FUNcube-1 Dashboard v1044</center>](http://download.funcube.org.uk/FUNcube_Dashboard_v1044.msi)

Una vez descargado, lo instalamos como cualquier aplicación de Windows y lo iniciamos.

El siguiente paso es configurarlo. Para ello hacemos clic en **"File"** y después **"Settings..."**. Esto nos abre la pestaña de configuración del programa.
Ahora debemos indicarle que le vamos a pasar el audio desde SDR#, así que seleccionamos nuestro [cable de audio virtual](https://sdr-es.com/2020/01/21/instalacion-virtual-cable-audio/) en la opción **"Input Device"**.

{% asset_img FUNcube1_Dashboard_config.png "FUNcube1 Dashboard Configuración" %}

Hacemos clic en **"Save"** y ya tendremos el programa listo para recibir la señal desde SDR#.
Para iniciar el procesamiento de señal hacemos clic en **"Capture"** y **"Capture From Soundcard"**. Ahora cuando el satélite comience a recibirse en SDR#, podremos ver los datos en tiempo real en el programa.

_Telemetría:_
{% asset_img FUNcube1_Dashboard_telem.png "FUNcube1 Dashboard Telemetría" %}

_Mensajes:_
{% asset_img FUNcube1_Dashboard_messages.png "FUNcube1 Dashboard Mensajes" %}
