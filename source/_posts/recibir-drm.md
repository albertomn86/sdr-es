---
title: Recibir radio digital mundial (DRM)
date: 2020-10-25 11:52:23
tags: [DRM, HF]
author: EA7KOO
---

[Digital Radio Mondiale (DRM)](https://www.drm.org/), en español radio digital mundial, es un conjunto de tecnologías de transmisión de audio digital diseñadas para operar sobre las bandas utilizadas actualmente para la radiodifusión analógica en AM (especialmente de onda corta) y FM.
DRM ha sido diseñado para poder reutilizar los transmisores analógicos existentes. Las instalaciones como las antenas, alimentadores o amplificadores no necesitan modificación, evitando importantes inversiones.
En este artículo veremos como recibir emisiones en el estándar DRM30 con nuestro dispositivo SDR.

<!-- more -->

{% asset_img logo.png 300 "DRM logo" %}

Encontraremos las emisiones DRM30 por debajo de los 30 MHz. Habitualmente suelen ser emisiones no continuadas, por lo que no necesariamente vamos a encontrar dichas emisiones siempre. Podemos consultar los horarios actualizados de las mismas en el siguiente enlace:

[<center>DRM Broadcast Schedule</center>](https://www.drm.org/what-can-i-hear/broadcast-schedule-2/)


## Instalación del software

En este ejemplo vamos a usar SDR# para recibir la señal y sacar el audio mediante el [cable de audio virtual](/2020/01/21/instalacion-virtual-cable-audio/), aunque también podemos usar cualquier otro programa. Para recibir DRM usaremos el software [Dream AM/DRM Receiver](https://sourceforge.net/projects/drm/) que podemos descargar desde el siguiente enlace:

[<center>Dream AM/DRM Receiver</center>](https://sourceforge.net/projects/drm/files/dream/2.1.1/)

Este programa está disponible para varios sistemas operativos, incluso podemos descargar el código fuente y compilarlo si queremos.
Para nuestro ejemplo, descargamos la versión 2.1.1 para Windows ([dream-2.1.1-win32-svn808-df.zip](https://sourceforge.net/projects/drm/files/dream/2.1.1/dream-2.1.1-win32-svn808-df.zip/download)). La versión 2.2 es muy similar pero presenta algunos errores de funcionamiento. Si aun así queremos probar esta versión, podemos descargarla desde [aquí](https://www.reddit.com/r/RTLSDR/comments/grp6m2/dream_v221_for_windows_with_xheaac_support/).

Una vez tenemos el archivo descargado, debemos extraer su contenido en la ubicación que queramos.
Después necesitamos incluirle las librerías necesarias para que pueda decodificar el audio en formato AAC. Para ello descargamos los dos siguientes archivos y los guardamos en el directorio de Dream:

- [faad2_drm.dll](faad2_drm.dll)
- [libfaac.dll](libfaac.dll)


## Configuración

El siguiente paso es configurar el programa para que reciba el audio desde SDR#. Para ello hacemos clic en _Settings_, _Sound Card_, _Signal Input_ y en _Device_ seleccionamos el **cable de audio virtual**.

{% asset_img input.png 800 "Entrada audio" %}


## Recepción

Una vez tenemos el programa escuchando por el cable de audio virtual, procedemos a sintonizar una emisión de DRM con SDR#. Usaremos el **modo USB** y un **ancho de banda de 10 KHz**.
Cuando Dream detecte la señal, veremos datos de la emisión en la ventana y comenzará a escucharse si tenemos señal suficiente. Los tres indicadores señalados en la siguiente imagen deben estar activos para poder escuchar el audio.

{% asset_img dream.png 700 "Dream" %}


{% asset_img sdrSharp.png 900 "SDR# + Dream" %}
