---
title: Recibir los datos del instrumental HIRS de los satélites NOAA
date: 2020-07-27 20:19:04
tags: [Satélites, Satélites meteorológicos, NOAA, Meteorología]
author: EA7KOO
excerpt: Guía para la recepción de los datos del instrumental HIRS de los satélites NOAA.
---

Como vimos en el artículo ["Recepción de satélites meteorológicos NOAA"](/recepcion-satelites-meteorologicos-NOAA/), es posible recibir las imágenes desde estos satélites meteorológicos con nuestro dispositivo SDR. Estos satélites envían, además de imágenes, datos de medidas de su instrumental de observación HIRS y que también podemos recibir.

El HIRS _(High Resolution Infrared Radiation Sounder)_ es un instrumental de escaneo incremental por líneas diseñado para medir la radiación en 20 bandas espectrales. Esta medición permite calcular el perfil de temperatura vertical de la superficie de la Tierra a una altura aproximada de 40 kilómetros.
Los datos multiespectrales del canal visible (0,69 µm), de los siete canales de onda corta (3,7 a 4,6 µm) y de los doce canales de onda larga (6,5 a 15 µm) se obtienen desde el mismo telescopio utilizando una lente rotativa con veinte filtros individuales.

<!-- more -->

## Datos de los satélites

Los satélites activos de los que podemos recibir la señal son los siguientes:

| Satélite | Frecuencia  | Estado |
| -------- | ----------- | -------|
| NOAA 15  | 137.350 Mhz | [Consultar](https://www.ospo.noaa.gov/Operations/POES/NOAA15/hirs.html) |
| NOAA 18  | 137.350 Mhz | [Consultar](https://www.ospo.noaa.gov/Operations/POES/NOAA18/hirs.html) |
| NOAA 19  | 137.770 Mhz | [Consultar](https://www.ospo.noaa.gov/Operations/POES/NOAA19/hirs.html) |


## Recepción

En este ejemplo vamos a ver como recibir estos datos desde Windows, aunque también es posible hacerlo desde cualquier sistema operativo.

El proceso de recepción es similar al de recibir las imágenes, solo que en este caso grabaremos la señal para su posterior demodulación y decodificación.

Lo primero que haremos será configurar Orbitron u otro programa para que nos realice la corrección de la frecuencia durante el pase.

Posteriormente ajustamos el **ancho de banda a 32 KHz** en SDR# y **modo RAW**.

Ahora esperamos a que pase el satélite y cuando tengamos señal comenzamos la grabación de la misma (**solo audio**, el baseband lo desmarcamos). Cuando termine el pase y perdamos la señal detenemos la grabación.

{% asset_img grabacion.jpg 900 "SDR#" %}


## Demodular la señal

El siguiente paso es demodular la señal obtenida en el paso anterior. Para ello vamos a utilizar el demodulador _Project Desert Tortoise_ que podemos descargar desde el siguiente enlace:

[<center>Project Desert Tortoise - Demodulator</center>](https://github.com/nebarnix/Project-Desert-Tortoise/archive/master.zip)

Una vez descargado, extraemos el contenido del archivo.

Ahora buscamos el archivo de audio del paso anterior (SDR# debe haberlo generado en su carpeta de instalación) y lo copiamos a la carpeta de _Project Desert Tortoise_ que acabamos de extraer.

{% asset_img demodulador.jpg "Project Desert Tortoise" %}

Para demodular el archivo basta con hacer clic encima del archivo de audio y arrastrarlo encima del binario **demodPOES.exe** y soltar. Esto hace que se pase el archivo de audio como parámetro al binario. También podemos hacerlo mediante la línea de comando si queremos.

Cuando el demodulador procese el archivo de audio completo, generará un nuevo archivo con los datos en ese mismo directorio con el nombre **_minorFrames_xxxx.txt_**.


Más información sobre el demodulador: http://wiki.nebarnix.com/wiki/NOAA_POES_TIP_Demodulation


## Decodificación

El último paso es decodificar los datos obtenidos en el paso anterior. Para ello utilizamos el software _NOAA HIRS Decoder_ que podemos descargar desde la web:

[<center>NOAA HIRS Decoder</center>](https://noaa_hirs_decoder.surge.sh/download.html)

Necesitamos tener instalada la máquina virtual de Java para poder ejecutar el software. Podemos descargar la ultima versión desde la [web oficial de Oracle](https://www.java.com/es/download/).

Una vez descargado el _NOAA HIRS Decoder_, extraemos el contenido en un directorio y copiamos el archivo del paso anterior dentro del mismo.

Ahora le pasamos el archivo **_minorFrames_xxxx.txt_** como parámetro al binario **NOAA_HIRS_Decoder.exe** de la misma forma que vimos en el paso anterior (arrastrar y soltar). Si nos da un error, tenemos que abrir una terminal y ejecutarlo pasándole el archivo con la opción **-i**.

Una vez termine el proceso de decodificación veremos los datos dentro del directorio _output/minorFrames_xxxx_.

{% asset_img decoder.jpg "NOAA HIRS Decoder" %}

Tendremos una serie de imágenes por cada uno de los canales. Estas imágenes son de 56 píxeles de ancho y el largo depende de la duración de la grabación.

{% asset_img Compo.png "NOAA HIRS Decoder" %}
