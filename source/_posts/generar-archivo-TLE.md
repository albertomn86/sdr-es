---
title: Generar archivo TLE personalizado
date: 2021-04-18 13:01:07
tags: [Orbitron, Satélites]
author: EA7KOO
excerpt: Cómo generar de forma automática un archivo TLE con los satélites deseados.
---

Si realizamos habitualmente el seguimiento de satélites, uno de los pasos más importantes es tener actualizados nuestros archivos de [TLE](https://en.wikipedia.org/wiki/Two-line_element_set). En este artículo veremos cómo generar un archivo TLE que contenga solo los satélites que queramos y que podemos actualizar con un clic.

<!-- more -->

Para ello vamos a usar el programa [**TLE Generator**](https://github.com/albertomn86/TLE_Generator). Este programa es un _script_ que a partir de un listado de satélites descarga los datos TLE de los mismos de forma automática. Este _script_ se puede ejecutar en cualquier sistema operativo si tenemos el intérprete de Python previamente instalado.
En este ejemplo vamos a usar un binario para Windows que no necesita tener el intérprete instalado y que podemos descargar desde el siguiente enlace:

[<center>Descargar TLE Generator para Windows</center>](https://github.com/albertomn86/TLE_Generator/releases/download/v2.3/TLE_Generator.Windows.zip)

Una vez descargado el archivo, extraemos su contenido:

{% asset_img archivos.png 200 "Archivos" %}

Ahora abrimos el archivo **_satellites.txt_** y editamos el listado de satélites con los que vayamos a añadir al archivo TLE.
Para añadir un nuevo satélite, simplemente necesitamos insertar en el archivo su identificador dado por el [NORAD](https://es.wikipedia.org/wiki/NORAD). Para obtener el identificador de cualquier satélite, podemos usar el buscador de la web de CelesTrack:

[<center>CelesTrack Satellite Catalog</center>](https://www.celestrak.com/satcat/search.php)

Si queremos quitar satélites bastaría con eliminar la linea o simplemente comentarla con el caracter '#' al principio.

Una vez tenemos el listado de satélites, vamos a crear un archivo _batch_ con la llamada al ejecutable con los parámetros ya establecidos, para que simplemente tengamos que hacer doble clic para generar nuestro archivo dónde queramos.

En este caso voy a generar un archivo con los TLE dentro de la carpeta de Orbitron. Para ello creamos un nuevo archivo de texto con la extensión _.bat_ y el contenido siguiente:
```
tle_gen.exe -o C:\SDR\Portable\Orbitron\Tle\custom.txt
```

{% asset_img bat.png 200 "Archivo BAT" %}

Ahora cada vez que queramos tener el archivo de TLE actualizado, simplemente ejecutamos este archivo antes de iniciar Orbitron.

{% asset_img consola.png 600 "Terminal de Windows" %}
