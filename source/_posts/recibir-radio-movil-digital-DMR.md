---
title: Recibir radio movil digital (DMR)
date: 2021-08-27 10:30:04
tags: [DMR, DSDPlus, SDRSharp]
author: EA7KOO
---

DMR son las siglas de Radio Móvil Digital, y es un estándar internacional especialmente definido para radios de dos vías. El objetivo del estándar DMR es permitir que dispositivos de diferentes fabricantes puedan comunicarse entre sí en una misma red.
Esta tecnología es muy utilizada por radioaficionados y es posible recibir estas señales con nuestros dispositivos SDR. En este artículo veremos como instalar algunos _plugins_ en SDR# para poder escuchar DMR.

<!-- more -->

{% asset_img dmr-logo.jpeg 300 "Logo DMR" %}


## Simple DMR

El _plugin_ [Simple DMR](http://rtl-sdr.ru/page/novyj-plagin-simple-dmr) está diseñado para escuchar DMR sin cifrar y no requiere dependencias ni configuraciones.

La instalación es muy sencilla y podemos resumirla en los pasos descritos a continuación.

1. Descargamos los archivos del _plugin_ desde el siguiente enlace:

   [<center>Descargar Simple DMR</center>](http://rtl-sdr.ru/uploads/download/dmr.zip)

2. Vamos a la carpeta **Plugins** dentro del directorio de instalación de SDR# y creamos una carpeta con el nombre "SimpleDMR" (o el que queramos). Ahora extraemos el contenido del archivo que hemos descargado dentro de esta nueva carpeta.

   {% asset_img simple-dmr-archivos.jpg 700 "Archivos de Simple DMR" %}

3. Iniciamos ahora SDR# y mostramos el nuevo _plugin_ haciendo clic en el menú.

   {% asset_img sdrsharp-menu-simple-dmr.jpg 900 "SDR#" %}

4. Por último, sintonizamos una señal de DMR y activamos el plugin haciendo clic en **"Enabled"**.

   {% asset_img sdrsharp-simple-dmr.jpg 900 "SDR#" %}

Si todo ha ido bien, debemos comenzar a escuchar nada más activar el _plugin_. Si no se escucha nada, debemos asegurarnos tener la salida de audio por los altavoces y no por el cable de audio virtual.

También es posible escuchar otros modos digitales usando para ello otros _plugins_ muy similares a este y cuya instalación es idéntica. Estos _plugins_ son:

- [Simple dPMR](http://rtl-sdr.ru/page/novyj-plagin-simple-dpmr)
- [Simple APCO P25](http://rtl-sdr.ru/page/novyj-plagin-simple-apco)


## DSD Interface

### Instalación de DSDPlus

DSDPlus es un decodificador de modos digitales más completo y configurable que el que hemos visto en el apartado anterior. Inluye además otros modos digitales, como son P25, D-STAR, NXDN, etc.

Para instalar DSDPlus, primeramente accedemos a su página web para descargar los archivos necesarios haciendo clic en el siguiente enlace:

[<center>Descargar DSDPlus</center>](https://www.dsdplus.com/download-2/)

Ahora descargamos los dos archivos indicados en la siguiente imagen:

{% asset_img dsd-descarga.jpg 600 "Descarga de DSDPlus" %}

El contenido del primer archivo lo extraemos en el directorio que queramos. En este ejemplo lo he extraído dentro de la carpeta de instalación de SDR# y dentro de su propia carpeta, a la que he llamado "DSDPlus".

{% asset_img dsd-archivos.jpg 700 "Archivos de DSDPlus" %}

Del segundo archivo solamente vamos a extraer el archivo **lame_enc.dll**, el cual vamos a introducir dentro de la carpeta de instalación de SDR#.

{% asset_img lame-dll.jpg 700 "Archivo DLL" %}

### Instalación del plugin

El _plugin_ [DSD Interface](http://rtl-sdr.ru/page/plagin-dsd-interface) nos permite iniciar DSDPlus y pasarle el audio desde SDR# de una forma muy sencilla. Para instalarlo seguiremos los pasos descritos a continuación.

1. Descargamos el _plugin_ desde el siguiente enlace:

   [<center>Descargar DSD Interface</center>](http://rtl-sdr.ru/uploads/download/dsd.zip)

2. Vamos a la carpeta **Plugins** dentro del directorio de instalación de SDR# y creamos una carpeta con el nombre "DSD" (o el que queramos). Ahora extraemos el contenido del archivo que hemos descargado dentro de esta nueva carpeta.

   {% asset_img dsd-plugin-archivos.jpg 700 "Archivos del plugin DSD" %}

3. Iniciamos ahora SDR# y mostramos el nuevo _plugin_ haciendo clic en el menú.

   {% asset_img dsd-plugin.jpg 300 "DSD Plugin" %}

4. Hacemos clic en el botón **Configure** y en la ventana de configuración hacemos clic en **"DSD Path"** y le indicamos la ruta del archivo _DSDPlus.exe_ que hemos extraído en el apartado anterior.

   {% asset_img dsd-plugin-configurar.jpg 350 "Configurar DSD" %}

   Hacemos clic en **Ok** para guardar los cambios.

5. Ahora hacemos clic en el botón **"Start DSD"** del _plugin_ y se nos abrirán una serie de ventanas. Debemos fijarnos en los siguientes datos que veremos en una de las ventanas.

   {% asset_img dsd-plugin-configurar-audio.jpg 700 "Configurar audio DSD" %}

    Necesitamos anotar el número de dispositivo de audio que vamos a utilizar. En este ejemplo vamos a pasar el audio por el cable de audio virtual, por lo que en este caso anotamos el _"audio input device #1"_. Para la salida queremos que se escuche por los altavoces, así que anotamos _"audio output device #1"_.

6. Paramos DSDPlus haciendo clic en el botón **"Stop DSD"** del _plugin_ y le damos a **Configure**. Ahora seleccionamos los dispositivos conforme los hemos anotado en el punto anterior. Una vez seleccionados, hacemos clic en **"Create command line"** para regenerar la linea de comandos con estos nuevos valores.

   {% asset_img dsd-plugin-configurado.jpg 350 "Configurar DSD" %}

    Hacemos clic en **Ok** para guardar los cambios.

7. Por último, buscamos una señal DMR y nos aseguramos que tengamos la salida de audio de SDR# por el cable de audio virtual. Ahora hacemos clic en el botón **"Start DSD"** y comenzaremos a ver datos en pantalla y se escuchará el audio decodificado.

   {% asset_img sdrsharp-dsd.jpg 900 "DSD Plugin" %}

Si en la ventana aparecen numerosos errores, es posible que debamos ajustar el volumen de audio general de SDR#.
