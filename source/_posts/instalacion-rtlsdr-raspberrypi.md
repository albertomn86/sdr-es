---
title: Instalar dispositivo RTL-SDR en Linux
date: 2020-04-10 09:40:15
tags: [RTL-SDR, Raspberry Pi, Linux, Instalación]
author: EA7KOO
description: En este tutorial veremos cómo instalar nuestro dispositivo RTL-SDR en Linux usando una Raspberry Pi con Raspbian.
---

En este tutorial veremos como instalar nuestro dispositivo RTL-SDR en una Raspberry Pi. Para la realización del mismo se ha empleado una Raspberry Pi 3 con la distribución Raspbian Buster Lite, si bien estos pasos son similares para cualquier distribución Linux.

<!-- more -->

{% asset_img raspberry-pi-3.png "Raspberry Pi 3" %}

Vamos a instalar los drivers y librerias necesarias para usar el dispositivo SDR. Para ello ejecutamos el siguiente comando:

```
sudo apt install rtl-sdr librtlsdr-dev
```

Una vez instalado el dispositivo le daremos permisos a los usuarios no *root* para poder usar el dispositivo. Para ello seguiremos los siguientes pasos para crear una regla *udev*.
1. Con el dispositivo SDR conectado, ejecutamos el siguiente comando para obtener la lista de dispositivos USB conectados:

```
lsusb
```

2. Buscamos en la lista el dispositivo SDR y nos fijamos en los identificadores de fabricante y de dispositivo. En este caso son **0bda** y **2838** respectivamente.

```
Bus 001 Device 004: ID 0bda:2838 Realtek Semiconductor Corp. RTL2838 DVB-T
```

3. Ahora creamos un archivo de reglas nuevo:

```
sudo nano /etc/udev/rules.d/rtl-sdr.rules
```

Y añadimos la siguiente regla modificando los identificadores si fuese necesario para que correspondan con los obtenidos en el paso anterior:

```sh
SUBSYSTEMS=="usb", ATTRS{idVendor}=="0bda", ATTRS{idProduct}=="2838", MODE:="0666"
```

Por último desconectamos el dispostivo SDR y lo volvemos a conectar para que se aplique la regla y ejecutamos el siguiente comando para comprobar que el dispositivo funciona correctamente:

```
rtl_test
```

Si todo está correctamente instalado veremos una salida como la siguiente:

```
Found 1 device(s):
  0:  Realtek, RTL2838UHIDIR, SN: 82020715

Using device 0: Generic RTL2832U OEM
Detached kernel driver
Found Rafael Micro R820T tuner
Supported gain values (29): 0.0 0.9 1.4 2.7 3.7 7.7 8.7 12.5 14.4 15.7 16.6 19.7 20.7 22.9 25.4 28.0 29.7 32.8 33.8 36.4 37.2 38.6 40.2 42.1 43.4 43.9 44.5 48.0 49.6
[R82XX] PLL not locked!
Sampling at 2048000 S/s.

Info: This tool will continuously read from the device, and report if
samples get lost. If you observe no further output, everything is fine.

Reading samples in async mode...
Allocating 15 zero-copy buffers
lost at least 140 bytes
```
