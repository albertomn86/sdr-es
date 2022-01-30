---
title: Recepción de mensajes VDL2
date: 2021-08-28 12:10:53
tags: [ATC, SDRSharp, VDL2, MultiPSK]
author: EA7KOO
excerpt: En esta guía veremos cómo recibir y decodificar los mensajes aeronaúticos VDL2 usando MultiPSK.
---

[VDL2](https://en.wikipedia.org/wiki/VHF_Data_Link#ICAO_VDL_Mode_2) (_VHF Data Link mode 2_) es un modo de transmisión de información entre aeronaves y estaciones terrestres. Este modo permite la comunicación de los controladores aéreos con los pilotos a través de un enlace de datos [(CPDLC)](https://en.wikipedia.org/wiki/Controller%E2%80%93pilot_data_link_communications).
En este artículo veremos cómo recibir y decodificar estos mensajes a modo de estudio.

<!-- more -->

Para decodificar estos mensajes vamos a utilizar el software MultiPSK. Este programa es una herramienta muy versátil que permite decodificar distintos modos de una manera bastante simple.
MultiPSK se puede usar de forma gratuita, pero para ciertos modos, VDL2 entre ellos, tiene una limitación de uso de 5 minutos, tras los que tendremos que reiniciar el programa para seguir usándolo. Si queremos usar el programa de forma ininterrumpida y sin limitaciones, tenemos la opción de adquirir una [licencia](http://f6cte.free.fr/Licence_En.htm) por unos 30€ ó 40US$.

## Instalación de MultiPSK

Para instalar MultiPSK basta con descargar el instalador de la última versión desde la siguiente página:

[<center>Ham Radio Software from F6CTE</center>](http://f6cte.free.fr/index_anglais.htm)

Una vez descargado, lo instalamos como cualquier programa siguiendo el asistente.

Ahora iniciamos el programa y se nos mostrará una ventana de configuración. El primer ajuste que debemos hacer es indicarle que le vamos a pasar el audio desde el cable de audio virtual. Para ello hacemos clic en **Sound Card (Input)** y seleccionamos el cable de audio virtual.

{% asset_img multipsk-audio.jpg 500 "Ajuste del audio en MultiPSK" %}

Después le indicamos que los datos desde el SDR le van a llegar a través de la tarjeta de sonido. Para ello pulsamos el botón **"Direct via the sound card"**.

{% asset_img multipsk-config.jpg 500 "Ajustes MultiPSK" %}

Por último hacemos clic en **"RX/TX screen"** para abrir la ventana principal del programa.


## Recepción

En este ejemplo vamos a utilizar SDR# para enviar el audio a MultiPSK, pero podemos usar cualquier otro software para la recepción.

Lo único que tenemos que hacer es activar la salida de audio por el cable de audio virtual y establecer los ajustes de recepción en modo **RAW** y un ancho de banda de **25 KHz**. Después basta con sintonizar una de las frecuencias usadas para este modo:

- 136,975 MHz
- 136,725 MHz
- 136,775 MHz

{% asset_img sdrsharp-vdl2.jpg 900 "VDL2 en SDR#" %}

Vamos ahora a MultiPSK y activamos el modo VDL2.

{% asset_img multipsk-modos.jpg 600 "MultiPSK - VDL2" %}

Una vez recibamos los mensajes, veremos que aparecen decodificados por pantalla.

{% asset_img multipsk-recibiendo.jpg 900 "MultiPSK" %}
