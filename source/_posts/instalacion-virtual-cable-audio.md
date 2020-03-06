---
title: Instalación de cable de audio virtual
date: 2020-01-21 17:06:29
tags: ['Virtual Audio Cable', SDRSharp, Windows]
---

Vamos a ver como instalar un cable virtual para poder pasar la señal de audio desde SDR# a cualquier programa externo.
Para ello vamos a utilizar un software que nos va a permitir pasar el audio desde la salida de SDR# a la entrada de otro programa.

<!-- more -->

## Instalación de VB-Cable

Existen distintos programas que realizan esta operación, pero en este tutorial usaremos la alternativa gratuita (Donationware) **VB-Cable**.

Descargamos el instalador desde la web de VB-Audio desde el siguiente enlace:

[<center>https://www.vb-audio.com/Cable/</center>](https://www.vb-audio.com/Cable/)

{% asset_img virtual-audio-web.jpg "Descarga de VB-Cable" %}

Hacemos click en **_Download_** y una vez descargado extraemos el contenido del archivo ZIP.

Buscamos ahora el ejecutable **VBCABLE_Setup_x64.exe** o **VBCABLE_Setup.exe**, dependiendo de la arquitectura de nuestro PC, y lo ejecutamos como Administrador.

{% asset_img virtual-cable-instalacion.jpg "Instalando VB-Cable" %}

Hacemos click en **Install Driver** y esperamos a que se complete la instalación. Es posible que nos pida confirmar la instalación de los drivers para poder continuar.
Si todo ha ido bien, nos aparecerá un mensaje indicando que se han instalado los drivers correctamente y que debemos reiniciar. Así que reiniciamos nuestro PC y ya tendremos instalado el cable virtual.


## Configuración de SDR#

Abrimos ahora SDR# y desplegamos la pestaña para la configuración de Audio. Para indicarle a SDR# que saque el audio por el cable virtual, debemos hacer click en **Output** y seleccionar **\[MME\] CABLE Input ...**.

{% asset_img sdrsharp-audio.jpg "SDRSharp output" %}

Ahora cuando iniciemos SDR# el audio saldrá por el cable virtual y para recibirlo en otro programa bastaría con seleccionar el cable virtual como entrada.
