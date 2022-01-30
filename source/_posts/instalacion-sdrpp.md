---
title: Instalar SDR++
date: 2021-12-21 18:55:53
tags: [Instalación, SDR++, Windows, Linux, macOS]
author: EA7KOO
excerpt: Breves notas para la instalación de SDR++ en Windows, Linux y macOS.
---

[SDR++](https://www.sdrpp.org/) es un software multiplataforma y de código abierto para la recepción de señales mediante SDR. Este nuevo programa, desarrollado por [Alexandre Rouma](https://twitter.com/ryzerth), busca como objetivo ser sencillo de utilizar y eficiente.
En este post veremos cómo instalar SDR++ en Windows, Linux y macOS.

<!-- more -->

Para instalar SDR++ en cualquier sistema operativo, tenemos la posibilidad de descargar los instaladores para cada uno de ellos desde el siguiente enlace:

[<center>Releases SDR++</center>](https://github.com/AlexandreRouma/SDRPlusPlus/releases/latest)

En cualquier caso, necesitaremos tener instalados previamente los controladores del dispositivo que vayamos a utilizar. Si vamos a usar un dispositivo RTL-SDR por primera vez, podemos seguir los pasos de instalación descritos en [este enlace](/primeros-pasos/#Instalacion-del-dispositivo).


## Instalación en Windows

Una vez descargado el archivo comprimido para Windows, procedemos a extraer su contenido en la ubicación que queramos. Para iniciar el programa bastaría con abrir el ejecutable **_sdrpp.exe_**.

{% asset_img sdrpp-windows.jpg 900 "SDR++ Windows" %}

## Instalación en Linux

Nos descargamos el archivo PKG para nuestro distribución Linux y lo instalamos con el gestor de paquetes correspondiente.
Para iniciar el programa, bastaría con buscarlo en los programas instalados e iniciarlo.

{% asset_img sdrpp-linux.jpg 900 "SDR++ Linux" %}

## Instalación en macOS

Lo primero que haremos será descargar el archivo PKG para nuestra arquitectura e instalarlo. Por ahora solo está disponible el paquete para procesadores con arquitectura _amd64_ y no para _ARM_ (Apple M1).

Una vez instalado el paquete con el programa, necesitamos instalar algunas dependencias externas:

```bash
brew install fftw glew glfw volk
```

Por último ejecutamos el programa desde la terminal para iniciarlo:

```bash
sdrpp
```

{% asset_img sdrpp-macos.jpg 900 "SDR++ macOS" %}
