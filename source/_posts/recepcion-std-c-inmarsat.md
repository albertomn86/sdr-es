---
title: Recepción de mensajes Inmarsat STD-C
date: 2020-03-09 12:46:44
tags: [Satélites, Inmarsat, L-Band]
author: EA7KOO
updated: 2022-01-07 07:10:12
excerpt: Guía para la recepción de los mensajes SDT-C desde los satélites Inmarsat a modo de estudio.
---

En el artículo ["Recepción de satélites Inmarsat"](/recepcion-inmarsat/) vimos cómo recibir señal desde los satélites Inmarsat. Ahora veremos cómo decodificar algunos mensajes a modo de estudio utilizando Scytale-C, un software Open Source que permite decodificar mensajes SDT-C.
Scytale-C tiene distintos tipos de instalación, tanto para SDR# como para GNU Radio. En este artículo veremos como utilizarlo mediante el plugin para SDR# y la interfaz de usuario.

<!-- more -->

## Instalación del plugin en SDR#

Lo primero será descargar los los archivos necesarios desde el repositorio de Scytale-C desde el siguiente link:

[<center>https://bitbucket.org/scytalec/scytalec/downloads/</center>](https://bitbucket.org/scytalec/scytalec/downloads/)

Necesitamos descargar el plugin para SDR# (**SDRSharp.ScytaleC.5004.NET5.PlusUI.zip**).

Vamos a la carpeta **Plugins** dentro del directorio de instalación de SDR# y creamos una carpeta con el nombre "ScytaleC" (o el que queramos). Ahora extraemos el contenido del archivo que hemos descargado dentro de esta nueva carpeta.

{% asset_img scytale_files.jpg 700 "Archivos de Scytale-C" %}

Por último, iniciamos SDR# y ya tendremos el plugin instalado.


## Instalación de la interfaz de usuario de Scytale-C

Turno ahora de instalar la interfaz de usuario de Scytale-C. Para ello simplemente abrimos el _plugin_ en SDR# y hacemos clic en el botón **"Quick UI"**.

{% asset_img scytale_open_ui.jpg 200 "Scytale-C" %}

El propio _plugin_ detectará que no tenemos la interfaz de usuario instalada y nos mostrará una ventana como la siguente en la que haremos clic en _"Yes"_ para proceder con la descarga e instalación de la misma de forma automática.

{% asset_img scytale_download_ui.jpg "Scytale-C" %}

**Algunos mensajes que se reciben con Scytale-C van a un destinatario en concreto y pueden contener información sensible. Si no somos los destinatarios de dichos mensajes, debemos proceder a la eliminación de los mismos y no reenviarlos ni publicarlos bajo ningún concepto.**

{% asset_img scytale_ui.jpg "UI Scytale-C" %}

## Recepción y visualización de mensajes

Vamos ahora a recibir mensajes desde Inmarsat. Si ya tenemos nuestra antena orientada y conectada, iniciamos SDR# y buscamos las frecuencias de SDT-C. En Inmarsat-4A F4 las encontramos en 1.537,100 MHz para NCS y sobre 1.539,500 MHz para los canales LES TDM.

Una vez las tengamos localizadas, sintonizamos una de las señales en modo **USB** y ancho de banda de **4 KHz**.

Iniciamos a continuación el plugin marcando la casilla _**"Enabled"**_. También marcamos _**"Auto Tracking"**_ para que ajuste la señal de forma automática.

Si la señal es buena, veremos que aparece _**"Locked"**_ en el plugin.

{% asset_img sdrsharp.jpg "Plugin Scytale-C" %}

Con SDR# ya recibiendo la señal correctamente pasamos a la interfaz de usuario de Scytale-C. El plugin y esta interfaz se comunican por UDP de forma local y vienen configurados con el puerto 15003 por defecto.

Para que nos lleguen los mensajes bastaría con hacer clic en el botón de Play/Stop. Si todo ha ido bien, comenzaremos a recibirlos.
