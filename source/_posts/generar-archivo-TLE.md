---
title: Generar archivo TLE personalizado
date: 2021-04-18 13:01:07
tags: [Orbitron, Satélites]
author: EA7KOO
updated: 2023-12-27 18:42:00
description: Cómo generar de forma automática un archivo TLE con los satélites deseados.
---

Si realizamos habitualmente el seguimiento de satélites, uno de los puntos más importantes es mantener actualizados nuestros archivos de [TLE](https://en.wikipedia.org/wiki/Two-line_element_set). En este artículo veremos cómo generar un archivo TLE que contenga solo los satélites que queramos y que podemos actualizar con un simple clic.

<!-- more -->

Para ello vamos a usar el programa [**TLE Generator**](https://github.com/albertomn86/TLEGenerator), que descarga los datos TLE de un listado de satélites de forma automática. Este programa se puede ejecutar en cualquier sistema operativo. Únicamente requiere tener las librerías de ejecución de .NET 8 instaladas previamente (en Windows, Linux x64 y MacOS x64) y que podemos descargar desde el siguiente enlace:

[<center>Descargar .NET 8.0 Runtime</center>](https://dotnet.microsoft.com/es-es/download/dotnet/8.0/runtime)

Para utilizarlo en otro sistema operativo distinto a los antes mencionados, debemos descargar [el SDK de .NET 8](https://dotnet.microsoft.com/es-es/download/dotnet/8.0) y compilar el programa nosotros mismos.

En este ejemplo vamos a usar la versión de TLE Generator para Windows, que podemos descargar ya compilada desde el siguiente enlace:

[<center>Descargar TLE Generator para Windows</center>](https://github.com/albertomn86/TLEGenerator/releases/download/v1.0/tlegenerator-windows-x64.zip)

Una vez descargado el archivo, extraemos su contenido.

Ahora abrimos el archivo **_satellites.json_** y editamos el listado de satélites con los que vayamos a añadir al archivo TLE.
Para añadir un nuevo satélite, simplemente necesitamos insertar en el archivo su identificador dado por el [NORAD](https://es.wikipedia.org/wiki/NORAD). Para obtener el identificador de cualquier satélite, podemos usar el buscador de la web de CelesTrack:

[<center>CelesTrack Satellite Catalog</center>](https://celestrak.org/satcat/search.php)

Una vez tenemos el listado de satélites, simplemente bastaría con ejecutar el archivo _tlegenerator.exe_ para que se genere el nuevo archivo _custom\_TLE.txt_ que contiene los TLE.

Ahora, a modo de ejemplo, vamos a automatizar el proceso para varios archivos de TLE de forma que podamos mantenerlos actualizados de una manera muy sencilla. Vamos a crear un archivo _batch_ con la llamada al ejecutable con los parámetros ya establecidos, para que simplemente tengamos que hacer doble clic para actualizar los archivos que queramos.

En este caso vamos a generar un archivo de nombre _custom.txt_ dentro de la carpeta de Orbitron que contendrá los TLE especificados en el archivo _satellites.json_ y otro archivo con los TLE de los satélites meteorológicos NOAA dentro de la carpeta de instalación de WXtoImg.
Para ello creamos un nuevo archivo de texto con la extensión **.bat** (_actualizar.bat_ por ejemplo) y el contenido siguiente:

```
tlegenerator.exe -o C:\SDR\Portable\Orbitron\Tle\custom.txt
tlegenerator.exe -o C:\SDR\Portable\WXtoImg\weather.txt -i 25338,28654,33591
pause
```

Ahora cada vez que queramos actualizar todos nuestros archivos TLE, simplemente ejecutamos este archivo.

{% asset_img consola.jpg 800 "Terminal de Windows" %}
