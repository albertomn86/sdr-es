---
title: Instalación de cable de audio virtual
date: 2020-01-21 17:06:29
tags: ['Virtual Audio Cable', Instalación, Windows, macOS]
author: EA7KOO
---

Vamos a ver como instalar un cable virtual para poder pasar la señal de audio desde un programa que demodule señales a cualquier programa externo. Este cable virtual es simplemente un programa que conecta la salida de audio de un programa con la entrada de otro mediante software.

<!-- more -->

## Instalación de VB-Cable en Windows

Existen distintos programas que realizan esta operación, pero en este tutorial usaremos la alternativa gratuita (Donationware) **VB-Cable**.

Descargamos el instalador desde la web de VB-Audio desde el siguiente enlace:

[<center>https://www.vb-audio.com/Cable/</center>](https://www.vb-audio.com/Cable/)

{% asset_img virtual-cable-descarga-windows.jpg 900 "Descarga de VB-Cable" %}

Hacemos click en **_Download_** y una vez descargado extraemos el contenido del archivo ZIP.

Buscamos ahora el ejecutable **VBCABLE_Setup_x64.exe** o **VBCABLE_Setup.exe**, dependiendo de la arquitectura de nuestro PC, y lo ejecutamos como Administrador.

{% asset_img virtual-cable-instalacion.jpg "Instalando VB-Cable" %}

Hacemos click en **Install Driver** y esperamos a que se complete la instalación. Es posible que nos pida confirmar la instalación de los drivers para poder continuar.
Si todo ha ido bien, nos aparecerá un mensaje indicando que se han instalado los drivers correctamente y que debemos reiniciar. Así que reiniciamos nuestro PC y ya tendremos instalado el cable virtual.


### Configuración de SDR#

Abrimos ahora SDR# y desplegamos la pestaña para la configuración de Audio. Para indicarle a SDR# que saque el audio por el cable virtual, debemos hacer click en **Output** y seleccionar **\[MME\] CABLE Input ...**.

{% asset_img sdrsharp-audio.jpg 800 "SDRSharp output" %}

Ahora cuando iniciemos SDR# el audio saldrá por el cable de audio virtual y para recibirlo en otro programa bastaría con seleccionar el cable virtual como entrada.


## Instalación de VB-Cable en macOS

Descargamos el instalador desde la web de VB-Audio desde el siguiente enlace:

[<center>https://www.vb-audio.com/Cable/</center>](https://www.vb-audio.com/Cable/)

{% asset_img virtual-cable-descarga-macos.jpg 900 "Descarga de VB-Cable" %}

Hacemos click en **_Download_** y una vez descargado ejecutamos el instalador.

{% asset_img virtual-cable-instalacion-macos1.jpg "Instalación de VB-Cable" %}

Seguimos los pasos del asistente para instalar VB-Audio.

{% asset_img virtual-cable-instalacion-macos2.jpg "Instalación de VB-Cable" %}

### Configuración de CubicSDR

Debemos indicarle a CubicSDR que nos saque el audio utilizando el cable de audio virtual. Para ello hacemos click en **Audio Out** y seleccionamos _**VB Audio: VB-Cable**_

{% asset_img cubicsdr-audio.jpg 900 "CubicSDR audio output" %}

Ahora el audio saldrá por el cable de audio virtual y para recibirlo en otro programa bastaría con seleccionar el cable virtual como entrada.
