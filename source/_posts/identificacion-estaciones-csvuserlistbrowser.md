---
title: Identificación de estaciones de radiodifusión con CSVUserlistBrowser
date: 2020-05-10 14:40:22
tags: [HF]
author: AlbertoMN
---

En este artículo vamos a ver como instalar y configurar [CSVUserlistBrowser](https://www.df8ry.de/htmlen/home/%F0%9F%8F%A1welcome.htm) para usarlo con SDR#. Este programa, desarrollado por Heinrich Emmerl (DF8RY), nos permite descargar y visualizar bases de datos de frecuencias de estaciones de radiodifusión de forma sencilla, y además nos permite sintonizar dichas frecuencias en SDR# simplemente haciendo click.

<!-- more -->

## Instalación y configuración

Los pasos para instalar y configurar CSVUserlistBrowser son los siguientes:

1. Descargamos CSVUserlistBrowser desde el siguiente enlace:

[<center>https://www.df8ry.de/htmlen/csvub/CSVUserlistBrowser.zip</center>](https://www.df8ry.de/htmlen/csvub/CSVUserlistBrowser.zip)

2. Extraemos el contenido del archivo ZIP y ejecutamos **_CSVUserlistBrowser.exe_**. En la ventana que aparece marcamos el programa con el que queremos comunicarnos (en nuestro caso SDR#) y hacemos click en **OK**.

{% asset_img CSVUserlistBrowser-select.png "CSVUserlistBrowser" %}

3. El programa del paso anterior nos genera un nuevo ejecutable para cada programa que hemos seleccionado. En este caso nos habrá generado el nuevo ejecutable **_SDRSHARP-CSVUserlistBrowser.exe_**.

{% asset_img CSVUserlistBrowser-SDRSHARP.png 900 "CSVUserlistBrowser" %}

4. Vamos ahora a introducir nuestras coordenadas para poder descargar las bases de datos de nuestra zona. Para ello hacemos click en el menú **Tools** y en **QTH manager**. En esta ventana introducimos nuestras coordenadas. Para finalizar guardamos haciendo click en **Save details** y cerramos en **Close/Cancel**.

{% asset_img CSVUserlistBrowser-QTH-Manager.png 700 "CSVUserlistBrowser" %}

5. El siguiente paso es descargar las bases de datos de frecuencias. Para ello hacemos click en el menú **Web** y en **Downloader/Converter**. En esta ventana tendremos que hacer click en los botones de **Download** para descargar cada una de las bases de datos.
{% asset_img CSVUserlistBrowser-Downloader.png "CSVUserlistBrowser" %}
Una vez descargadas, hacemos click en **Close**.
Estas bases de datos se actualizan regularmente, por lo que tendremos que repetir la descarga para tener siempre los datos actualizados.
Las URLs de descarga también se actualizan. Podemos consultar las actuales en [df8ry.de](https://www.df8ry.de/htmlen/csvub/%F0%9F%91%B6firststeps.htm).

6. El último paso es cargar las bases de datos en el programa para poder usarlas. Para cargarlas hacemos click en el menú **File**, **Open CSV userlist** y seleccionamos el archivo que queramos cargar.

{% asset_img CSVUserlistBrowser-cargada.png 900 "CSVUserlistBrowser" %}

7. Para cargar otra lista, hacemos click en el menú **View list** y seleccionamos una posición libre. Después repetimos el paso anterior para cargar la lista. Si queremos que al iniciar el programa se nos muestra una base de datos u otra, podemos indicarlo en el menú **Autoload**.



## Conexión con SDR#

SDR# se comunica con CSVUserlistBrowser mediante un _plugin_. Este plugin viene en archivo ZIP que nos descargamos en el primer paso del apartado anterior.
Dentro del directorio extraído encontramos el directorio **_Plugins_**, y dentro de este tendremos un directorio que contiene el archivo DLL correspondiente a la versión de SDR# que estemos usando. Es importante elegir la versión correcta para que funcione.

Una vez tengamos clara la versión a instalar, procedemos a instalar el _plugin_ en SDR# de la forma habitual:

1. Copiar el archivo **_SDRSharp.DF8RYDatabridge.dll_** dentro del directorio de instalación de SDR#.

2. Insertamos la siguiente línea dentro del archivo _**Plugins.xml**_ que encontraremos dentro del directorio de instalación de SDR#.
```XML
<add key="DF8RYDatabridge" value="SDRSharp.DF8RYDatabridge.DF8RYDatabridgePlugin,SDRSharp.DF8RYDatabridge" />
```

{% asset_img sdr_sharp.png 900 "Plugin CSVUserlistBrowser" %}


## Funcionamiento

Para poder controlar las frecuencias desde CSVUserlistBrowser, tenemos que marcar **Enable RX1** en el plugin de SDR#. Ahora cuando seleccionemos una frecuencia haciendo doble click en CSVUserlistBrowser, se cambiará de forma automática en SDR#.

{% asset_img sdr_sharp_2.png 900 "SDR# y CSVUserlistBrowser" %}
