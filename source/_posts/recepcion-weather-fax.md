---
title: Recibir cartas meteorológicas (weather fax)
date: 2021-09-01 17:11:53
tags: [Weatherfax, Meteorología, HF]
author: EA7KOO
excerpt: Cómo recibir cartas meteorológicas (weather fax) en HF usando un dispositivo SDR.
---

El radiofacsimil o radiofax es un modo analógico en HF que permite transmitir imágenes monocromáticas mediante ondas de radio. Este modo es el predecesor de SSTV y fue el principal modo de transmisión de imágenes desde sitios remotos (especialmente islas) desde 1930 hasta 1970.

Actualmente se sigue usando para la transmisión de cartas meteorológicas a las embarcaciones en alta mar. En este artículo veremos cómo recibir estas cartas usando nuestro dispositivo SDR.

<!-- more -->

Para recibir estas cartas necesitaremos un SDR capaz de sintonizar HF y cualquier software que nos permita recibir y sacar el audio. En este ejemplo usaremos SDR# para la recepción y [fldigi](http://www.w1hkj.com/) para decodificar las cartas.


## Instalación de fldigi

Para instalar fldigi simplemente descargamos el instalador correspondiente para nuestro sistema operativo desde el siguiente enlace.

[<center>Repositorio de fldigi en Sourceforge</center>](https://sourceforge.net/projects/fldigi/files/fldigi/)

En nuestro caso descargaremos el archivo **fldigi-xxx_setup.exe** para Windows, y una vez descargado lo instalamos usando el propio asistente.

Una vez instalado tenemos que configurarle la fuente de audio. Para ello iniciamos fldigi y vamos a **"Configure"** y **"Config Dialog"**.

{% asset_img fldigi_config.jpg "Configuración de fldigi" %}

Aquí le indicamos que para la captura utilice el cable de audio virtual.

{% asset_img fldigi_audio.jpg "Selección de fuente de audio en fldigi" %}

## Recepción

Para recibir las cartas necesitamos sintonizar cualquiera de las frecuencias utilizadas por los distintos servicios. Algunas de estas frecuencias están recogidas en la siguiente tabla.

| Servicio | Localización | Frecuencias (kHz) |
|----------|--------------|:-------------:|
| [Deutscher Wetterdienst (DWD)](https://www.dwd.de/EN/specialusers/shipping/broadcast_en/_node.html) | [Pinneberg (Alemania)](https://goo.gl/maps/4jPR7uPe3hxsLd3J9) | 3.855</br>7.880</br>13.882,5 |
| [Northwood Radio Fax - GYA](http://www.users.zetnet.co.uk/tempusfugit/marine/fwoc.htm) | Northwood (Inglaterra) | 2.618,5</br>4.610</br>8.040</br>11.086,5 |

El primer paso será seleccionar el modo de recepción correcto en fldigi. Para ellos vamos a **"Op Mode"**, **"WEFAX"** y seleccionamos **WEFAX-IOC576**.

{% asset_img fldigi_mode.jpg "Selección de modo en fldigi" %}

Ahora buscamos y sintonizamos alguna de las frecuencias en **modo USB y un ancho de banda de 3 kHz**.

Es posible que encontremos la portadora y no recibamos nada. Esto se debe a que las emisiones no son continuas. Podemos consultar el horario de cada transmisión en los enlaces de la tabla anterior.

{% asset_img fldigi_ready.jpg 900 "fldigi preparado" %}

Una vez comience la emisión veremos que se va decodificando y mostrando la carta en la pantalla.

{% asset_img fldigi_receiving.jpg 900 "Recibiendo fax" %}

Podemos ver todas las cartas recibidas si vamos a **"File"**, **"Folders"** y **"WEFAX images..."**.

{% asset_img wefax.jpg "Fax recibido" %}
