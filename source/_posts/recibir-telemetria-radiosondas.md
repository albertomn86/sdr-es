---
title: Recibir telemetría de radiosondas meteorológicas
date: 2021-10-03 10:48:43
tags: [Radiosonda, Meteorología]
author: EA7KOO
description: Recibir globos sonda y radiosondas meteorológicas usando un dispositivo SDR y los programas SondeMonitor y RS41 Tracker.
---

A diario son lanzadas en todo el mundo cientos de radiosondas meteorológicas para obtener mediciones que permitan conocer el estado actual en las capas altas de la atmósfera. Estas mediciones ayudan a los servicios meteorológicos en sus predicciones.
En España se lanzan diariamente sondas de desde distintos puntos de nuestra geografía. Estas sondas alcanzan varios kilómetros de altura y se pueden recibir desde bastante distancia. En este artículo veremos como podemos recibir la telemetría de estas radiosondas usando nuestro dispositivo SDR.

<!-- more -->

{% asset_img LIFT-Radiosonde-Release.jpg 400 "Lanzamiento de radiosonda Vaisala © Vaisala" %}

En España podemos recibir actualmente dos modelos de sonda que lanza AEMET, [Vaisala RS41](https://www.vaisala.com/es/products/instruments-sensors-and-other-measurement-devices/soundings-products/rs41) y [Meteomodem M10](http://www.meteomodem.com/es/m10.html). Estas sondas se sueltan dos veces al día, entre las 11:15 y las 11:30, y entre las 23:15 y 23:30 (horas en GMT).

También es posible que recibamos alguna radiosonda desde Portugal o Francia si nos encontramos cerca de la frontera con estos países.

| Lugar de lanzamiento | Tipo de sonda | Frecuencia (MHz) |
|-----------|:--------:|:-----:|
| A Coruña  | RS41     | 404,0 |
| Barcelona | M10      | 404,0 |
| Huelva    | RS41     | 402,5 |
| Madrid    | RS41     | 403,0 |
| Murcia    | M10      | 403,4 |
| Santander | RS41     | 401,5 |
| Son Bonet | RS41     | 402,0 |

En algunas ocasiones también es posible encontrar radiosondas distintas a estas y que son lanzadas de forma esporádica por radioaficionados, universidades u otras entidades que realicen cualquier estudio meteorológico.
Algunos recursos muy interesantes para seguir estas radiosondas online son [radiosondy.info](https://radiosondy.info/) y [APRS.fi](https://aprs.fi/).


## Recibir radiosondas M10

Para la recepción de la señal vamos a usar SDR# y sacaremos el audio por el cable virtual para decodificar. Por supuesto es posible usar cualquier otro programa para la recepción.
Para decodificar la telemetría usaremos el programa **Sonde Monitor**, que podemos descargar desde su página web.

[<center>SondeMonitor from COAA</center>](https://www.coaa.co.uk/sondemonitor.htm)

Una vez descargado e instalado el programa, debemos indicarle que reciba el audio desde el cable de audio virtual.

{% asset_img sondemonitor_config_audio.jpg "SondeMonitor - Configurar audio" %}

Ahora en SDR# sintonizamos la frecuencia de la radiosonda que vayamos a recibir en **modo NFM y un ancho de banda de 20 kHz**.

{% asset_img sdrsharp_m10.jpg 900 "SDR# - Radiosonda M10 de Murcia" %}

Por último, le indicamos a SondeMonitor el tipo de sonda y hacemos clic en el botón verde para iniciar.

{% asset_img sondemonitor_start.jpg "SondeMonitor - Iniciar" %}

Pronto veremos la telemetría en pantalla.

{% asset_img sondemonitor_receiving.jpg 800 "SondeMonitor - Recibiendo sonda M10" %}
{% asset_img sondemonitor_data.jpg 800 "SondeMonitor - Telemetría" %}


## Recibir radiosondas RS41

La recepción de este tipo de sondas es muy similar a la descrita en el apartado anterior. SondeMonitor también nos permite recibir este tipo de sondas, pero veremos también otra alternativa para decodificar la telemetría usando el programa **RS41 Tracker**.

Lo primero será descargar el programa desde su página web:

[<center>Radiosonde Page by IW1GIS</center>](http://escursioni.altervista.org/Radiosonde/)

Una vez descargado, lo instalamos y lo iniciamos para configurar la entrada de audio. Le damos al icono del engranaje para abrir las opciones de configuración y seleccionamos el cable audio virtual como entrada.

{% asset_img rs41tracker_config_audio.jpg 800 "RS41 Tracker - Configurar audio" %}

Ahora en SDR# sintonizamos la frecuencia de la radiosonda que vayamos a recibir en **modo NFM y un ancho de banda de 6,5 kHz**.

{% asset_img sdrsharp_rs41.jpg 900 "SDR# - Radiosonda RS41 de Madrid" %}

Por último, iniciamos RS41 Tracker haciendo clic en el siguiente icono.

{% asset_img rs41tracker_start.jpg "RS41 Tracker - Iniciar" %}

Una vez tengamos señal suficiente, el programa comenzará a decodificar y mostrará los datos por pantalla.
