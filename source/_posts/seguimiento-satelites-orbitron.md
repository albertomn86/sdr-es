---
title: Seguimiento de satélites con Orbitron
date: 2020-01-23 19:06:58
tags: [Orbitron, Tracking, Satélites]
author: EA7KOO
description: En esta guía veremos cómo instalar y configurar Orbitron para el seguimiento de satélites y la correción de su frecuencia.
---

Una de las posibilidades más interesantes que nos ofrecen los dispositivos SDR es el poder recibir señales desde algunos satélites que orbitan el planeta en lo que se denomina órbita baja (LEO o Low Earth Orbit). Si queremos recibir su señal tendremos que estar atentos al momento en el que pasan por encima de nuestra posición. Para ello se usan programas que nos indican en qué posición se encuentra un satélite en un determinado instante de tiempo utilizando los datos de su órbita.
Existen distintos programas para Windows que realizan esta predicción. Uno de ellos es Orbitron, y es el que veremos en este tutorial.

<!-- more -->

## Instalación de Orbitron

El primer paso es descargar Orbitron desde su web: [http://www.stoff.pl/downloads.php](http://www.stoff.pl/downloads.php)

Tenemos la opción de descargarnos el instalador o un archivo ZIP. En este ejemplo vamos a descargar el ZIP y lo vamos a extraer en el directorio _C:\SDR\Orbitron_.

Ejecutamos ahora el programa haciendo doble clic en **Orbitron.exe** y se nos abrirá la interfaz del programa. Nos pedirá que actualicemos los archivo de TLE al iniciar, a lo que le decimos que no. Más adelante veremos qué son estos archivos y cómo actualizarlos.

{% asset_img orbitron.jpg "Orbitron" %}

## Configuración de Orbitron

Vamos ahora a configurar Orbitron con los ajustes básicos.

El primer ajuste es indicarle nuestra localización. Para ello vamos a la pestaña Location e introducimos nuestros datos. Si no los sabemos podemos buscar nuestra ciudad (o las más cercana) en el listado que tenemos a la derecha. Lo ideal es meter los valores más exactos posibles.

{% asset_img orbitron-location.jpg "Orbitron Location" %}

Una vez los tengamos introducidos correctamente, hacemos clic en **Choose** para seleccionar esta ubicación.

El siguiente paso es seleccionar el archivo con los TLE de los satélites que vamos a seguir.
Estos archivos TLE contienen un listado de objetos que orbitan la Tierra con sus respectivos elementos orbitales en formato TLE _(two-line element set)_. Con estos elementos, y usando la fórmula adecuada, podemos estimar la posición y velocidad del objeto en cualquier instante de tiempo pasado o futuro.

Aquí tenemos varias opciones, utilizar los archivos TLE descargados por Orbitron, o bien crear un archivo con los satélites que nos interesen. Si optamos por la primera opción, necesitamos primeramente actualizar los archivos TLE. Para ello abrimos la ventana de ajustes de Orbitron presionando las teclas **_Alt+F5_**, o bien hacemos clic en el siguiente punto y seleccionamos **Setup**:

{% asset_img orbitron-setup.jpg "Orbitron Setup" %}

Vamos a la pestaña **TLE updater** y hacemos clic en el siguiente icono:

{% asset_img setup-tle.jpg "Actualizar TLE" %}

Una vez se actualicen los archivos, cerramos esa ventana y hacemos clic en **Load TLE** y seleccionamos el archivo que contenga los satélites que queremos seguir. En este caso vamos a elegir un archivo que contiene los TLE de algunos satélites que nos interesan.

{% asset_img load-tle.jpg "Cargar archivo" %}

Ahora bastaría con ir seleccionando los satélites que queremos seguir y se mostrarán sobre el mapa.

{% asset_img orbitron-loaded.jpg "Orbitron" %}

En siguientes tutoriales veremos cómo conectar Orbitron con SDR# para realizar seguimientos automáticos.
