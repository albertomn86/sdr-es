---
title: Instalación de iGate APRS en Raspberry Pi
date: 2022-09-06 16:05:59
tags: [APRS, RTL-SDR, Raspberry Pi, DireWolf]
author: EA7KOO
description: En este artículo veremos cómo instalar y configurar un iGate para APRS en una Raspberry Pi.
---

Como ya vimos anteriormente en algunos artículos, es posible recibir mensajes APRS desde distintos orígenes (terrestre, ISS, cubesats) de forma muy sencilla. En este artículo veremos como pasar estos mensajes a la red [APRS-IS](https://www.aprs-is.net/) a través de un iGate para mejorar la cobertura de nuestra zona.

<!-- more -->

Únicamente vamos a configurar el sistema en modo RX iGate, es decir, solo va a recibir mensajes. Existe cierta polémica sobre si los iGates de solo recepción rompen la funcionalidad bidireccional de la mensajería APRS. Según Heikki Hannikainen, creador y propietario de la web [aprs.fi](https://aprs.fi/), **los iGates de solo recepción no interrumpen la mensajería si hay iGates con capacidad de transmisión cerca que estén conectados a un servidor APRS-IS**. Si no tenemos un iGate con capacidad de transmisión cerca, lógicamente la comunicación bidireccional no va a funcionar. **Si tenemos un iGate de TX cercano, los iGates adicionales de solo recepción mejoran el rendimiento de la mensajería.**
Podemos leer el artículo completo de Heikki Hannikainen en el siguiente enlace:

[<center>RX-only igates considered beneficial to the network</center>](https://blog.aprs.fi/2019/08/rx-only-igates-considered-beneficial-to.html)

Antes de continuar, debemos tener en cuenta que puesto que vamos a inyectar datos a la red ARPS-IS, **necesitamos obligatoriamente indicativo de radioaficionado**. Seremos los responsables de los mensajes que pasen a la red a través de nuestro iGate.


## Instalación

### Instalar dispositivo SDR

Si aún no hemos instalado el dispositivo en nuestra Raspberry Pi, podemos seguir los pasos descritos en el siguiente artículo:

[<center>Instalar dispositivo RTL-SDR en Linux</center>](/instalacion-rtlsdr-raspberrypi/)

### Instalar Dire Wolf

El software que vamos a usar para decodificar los mensajes AX.25 de APRS será [Dire Wolf](https://github.com/wb2osz/direwolf).

Para instalarlo en Raspberry OS basta con ejecutar el siguiente comando:
```bash
sudo apt install direwolf
```

## Configuración

El primer paso es generar un archivo de configuración para Dire Wolf. Para ello vamos a generar un archivo '.conf' en la ubicación que queramos. En este ejemplo se ha creado el archivo _direwolf.conf_ en _/etc_.
Para el contenido copiaremos la siguiente plantilla, obtenida del propio [repositorio de Dire Wolf](https://github.com/wb2osz/direwolf/blob/master/conf/sdr.conf):

```conf
#
# Sample configuration for SDR read-only IGate.
#

# We might not have an audio output device so set to null.
# We will override the input half on the command line.
ADEVICE null null
CHANNEL 0
MYCALL xxx

# First you need to specify the name of a Tier 2 server.
# The current preferred way is to use one of these regional rotate addresses:

#	noam.aprs2.net 		- for North America
#	soam.aprs2.net		- for South America
#	euro.aprs2.net		- for Europe and Africa
#	asia.aprs2.net 		- for Asia
#	aunz.aprs2.net		- for Oceania

IGSERVER noam.aprs2.net

# You also need to specify your login name and passcode.
# Contact the author if you can't figure out how to generate the passcode.

IGLOGIN xxx 123456

# That's all you need for a receive only IGate which relays
# messages from the local radio channel to the global servers.

```

Ahora veamos qué datos debemos introducir en la plantilla.

#### MYCALL
Aquí debemos de introducir nuestro indicativo seguido del SSID recomendado para un iGate. Según [las recomendaciones de APRS del 6 de febrero de 2012](http://www.aprs.org/aprs11/SSIDs.txt), debemos añadir el SSID -10.

```txt
-10 internet, Igates, echolink, winlink, AVRS, APRN, etc
```

#### IGSERVER
El servidor al que realizaremos la conexión. Debemos cambiarlo por el nuestro dependiendo de dónde nos encontremos.


#### IGLOGIN
Aquí introducimos nuestro indicativo y la clave de acceso a la red APRS-IG. Si no conocemos nuestra clave, podemos generarla [aquí](https://apps.magicbug.co.uk/passcode/).


#### PBEACON (Opcional)
Añadimos esta opción si queremos que nuestro iGate aparezca en las webs que muestran los datos APRS, tipo [aprs.fi](https://aprs.fi/), [APRS Track Direct](https://aprs-map.info/), etc.

```txt
PBEACON delay=1 every=60 symbol=R& overlay=I lat=XX.XX long=XX.XX comment="Comentario que queramos" sendto=IG
```

Una vez configurado el archivo, ya podemos probar el sistema completo. Lo que haremos será escuchar en la frecuencia de APRS con el programa _rtl\_fm_ y pasarle los datos a Dire Wolf en tiempo real. Para ello bastará con ejecutar el siguiente comando:

```bash
rtl_fm -f 144.80M -g 37 - | direwolf -c /etc/direwolf.conf -r 24000 -D 1 -
```
Podemos usar los parámetros de ajuste de _rtl\_fm_ que necesitemos: **-p** para los PPM, **-d** para indicar el número de serie del dispositivo, **-g** para la ganancia, etc.

Por último, vamos a hacer que el proceso funcione de forma autónoma en la Raspberry Pi y que se inicie de forma automática cuando esta se reinicie. Para ello vamos a crear un servicio que lo haga todo y que se lance al iniciar la Raspberry Pi.

Lo primero será crear un archivo _unit_ con la información del servicio:

```bash
sudo nano /etc/systemd/system/aprsigate.service
```

El contenido del archivo será el siguiente (modificar si es necesario):

```bash
[Unit]
Description=APRS iGate
After=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
Restart=always
RestartSec=1
User=pi
ExecStart=/bin/sh -c 'rtl_fm -f 144.80M -g 37 - | direwolf -c /etc/direwolf.conf -r 24000 -D 1 -'

[Install]
WantedBy=multi-user.target
```

Ahora vamos a cargar el servicio en el arranque mediante el siguiente comando:

```bash
sudo systemctl enable aprsigate
```

Por último iniciamos el servicio:

```bash
sudo systemctl start aprsigate
```

Para consultar el estado del servicio ejecutamos:

```bash
sudo systemctl status aprsigate
```

Si todo está correcto tendremos la siguiente salida:

```bash
pi@raspberrypi:~ $ sudo systemctl status aprsigate
● aprsigate.service - APRS iGate
     Loaded: loaded (/etc/systemd/system/aprsigate.service; enabled; vendor preset: enabled)
     Active: active (running) since Sat 2022-09-03 17:08:03 CEST; 31s ago
   Main PID: 1367 (sh)
      Tasks: 21 (limit: 415)
        CPU: 17.650s
     CGroup: /system.slice/aprsigate.service
             ├─1367 /bin/sh -c rtl_fm -f 144.80M -g 37 - | direwolf -c /etc/direwo>
             ├─1368 rtl_fm -f 144.80M -g 37 -
             └─1369 direwolf -c /etc/direwolf.conf -r 24000 -D 1 -

Sep 03 17:08:04 raspberrypi sh[1368]: Oversampling output by: 1x.
Sep 03 17:08:04 raspberrypi sh[1368]: Buffer size: 8.13ms
Sep 03 17:08:04 raspberrypi sh[1368]: Exact sample rate is: 1008000.009613 Hz
Sep 03 17:08:04 raspberrypi sh[1368]: Allocating 15 zero-copy buffers
Sep 03 17:08:04 raspberrypi sh[1368]: Sampling at 1008000 S/s.
Sep 03 17:08:04 raspberrypi sh[1368]: Output at 24000 Hz.
Sep 03 17:08:08 raspberrypi sh[1369]: Now connected to IGate server euro.aprs2.net (46.18.33.196)
Sep 03 17:08:08 raspberrypi sh[1369]: Check server status here http://46.18.33.196:14501
Sep 03 17:08:13 raspberrypi sh[1369]: [ig] # aprsc 2.1.4-g408ed49
Sep 03 17:08:13 raspberrypi sh[1369]: [ig] # logresp EA7KOO-10 verified, server T2BELGIUM
```
