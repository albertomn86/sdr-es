---
title: Recepción de mensajes Inmarsat STD-C
date: 2020-03-09 12:46:44
tags: [Satélites, Inmarsat, L-Band, SDR#, Windows]
---

En el artículo ["Recepción de satélites Inmarsat"](https://sdr-es.com/2020/03/06/recepcion-inmarsat/) vimos cómo recibir señal desde los satélites Inmarsat. Ahora veremos como decodificar los mensajes que recibimos utilizando Scytale-C, un software Open Source que permite decodificar mensajes SDT-C.
Scytale-C tiene distintos tipos de instalación, tanto para SDR# como para GNU Radio. En este artículo veremos como utilizarlo mediante el plugin para SDR# y la interfaz de usuario.

<!-- more -->

Lo primero será descargar los binarios desde el repositorio de Scytale-C desde el siguiente link:

[<center>https://bitbucket.org/scytalec/scytalec/downloads/</center>](https://bitbucket.org/scytalec/scytalec/downloads/)

Necesitamos descargar el plugin para SDR# (**x64-SDRSharp.ScytaleC-10213.zip**) y la interfaz de usuario (**x64-ScytaleC.QuickUI-17010.zip**).

## Instalación del plugin en SDR#

El siguiente paso es instalar el plugin en SDR#. Para ello basta con extraer el contenido del archivo **x64-SDRSharp.ScytaleC-10213.zip** dentro del directorio de instalación de SDR#. Los dos archivos de texto no son necesarios.

Una vez extraído el contenido, insertamos la siguiente línea de texto dentro del archivo _**Plugins.xml**_, que encontraremos dentro de la carpeta de instalación de SDR#.

```
<add key="ScytaleC" value="SDRSharp.ScytaleC.ScytaleCPlugin,SDRSharp.ScytaleC" />
```
</br>

{% asset_img scytale_magicline.jpg "Magicline de Scytale-C" %}

Ahora reiniciamos SDR# y tendremos el plugin instalado.


## Instalación de la interfaz de usuario de Scytale-C

Turno ahora de instalar la interfaz de usuario de Scytale-C. Para ello simplemente extraemos el contenido del archivo **x64-ScytaleC.QuickUI-17010.zip** que hemos descargado anteriormente en el directorio deseado. Por ejemplo en *C:/SDR/ScytaleC*.

Para iniciar el programa basta con hacer doble click en **ScytaleC.QuickUI.exe**. Al iniciar el programa se muestra un mensaje sobre la confidencialidad que debemos leer detenidamente.

**Algunos mensajes que se reciben con Scytale-C van a un destinatario en concreto y pueden contener información sensible. Si no somos los destinatarios de dichos mensajes, debemos proceder a la eliminación de los mismos y no reenviarlos ni publicarlos bajo ningún concepto.**

{% asset_img scytale_ui.jpg "UI Scytale-C" %}

## Recepción y visualización de mensajes

Vamos ahora a recibir mensajes desde Inmarsat. Si ya tenemos nuestra antena orientada y conectada, iniciamos SDR# y buscamos las frecuencias de SDT-C (sobre 1.539,500 MHz en Inmarsat-4A F4).

Una vez las tengamos localizadas, sintonizamos una de las señales en modo **USB** y ancho de banda de **4 KHz**.

Iniciamos a continuación el plugin marcando la casilla _**"Enabled"**_. También marcamos _**"Auto Tracking"**_ para que ajuste la señal de forma automática.

Si la señal es buena, veremos que aparece _**"Locked"**_ en el plugin.

{% asset_img sdrsharp.jpg "Plugin Scytale-C" %}

Con SDR# ya recibiendo la señal correctamente pasamos a la interfaz de usuario de Scytale-C. El plugin y esta interfaz se comunican por UDP de forma local y vienen configurados con el puerto 15003 por defecto.

Para que nos lleguen los mensajes bastaría con hacer click en el botón de Play/Stop. Si todo ha ido bien, comenzaremos a recibirlos.

{% asset_img scytale_messages.jpg "Scytale-C Mensajes" %}
