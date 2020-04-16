---
title: Instalación de SPY Server en Raspberry Pi
date: 2020-04-11 11:10:42
tags: [RTL-SDR, SDRSharp, Raspberry Pi, Linux, SPY Server]
coauthor: AlbertoMN, Ronda
---

SPY Server es un software que permite crear un servidor SDR al que nos podemos conectar de forma remota mediante SDR#. Este software es desarrollado por Airspy siendo compatible con sus dispositivos pero también con los RTL-SDR.
En este artículo veremos como instalar SPY Server en una Raspberry Pi.

<!-- more -->

Para usar SPY Server en nuestra Raspberry Pi necesitamos en primer lugar tener instalado el dispositivo SDR. Si nuestro dispositivo es un RTL-SDR debemos seguir los pasos descritos en el artículo ["Instalación de dispositivos RTL-SDR en Raspberry Pi"](https://sdr-es.com/2020/04/10/instalacion-rtlsdr-raspberrypi/).

SPY Server está disponible ya compilado para procesadores ARM de 32 bits, por lo que bastaría con descargarlo a nuestra Raspberry Pi para que funcione.

Lo primero que haremos será crear un directorio nuevo para los archivos de SPY Server:

```
mkdir SPY_Server && cd $_
```

Descargamos SPY Server usando el siguiente comando:

```
wget https://airspy.com/downloads/spyserver-arm32.tgz
```

Extraemos el contenido:

```
tar -xzf spyserver-arm32.tgz
```

SPY Server funciona correctamente con los valores por defecto. También detecta el dispositivo SDR de forma automática y selecciona el primero disponible. Si necesitamos realizar algún ajuste debemos editar el archivo **spyserver.config**:

```
nano spyserver.config
```

Por último ejecutamos SPY Server:

```
./spyserver
```

Si todo ha ido bien, nos mostrará una salida como la siguiente:

```
SPY Server v2.0.1700
Copyright (C) 2016-2018 Youssef Touil - https://airspy.com
Reading the configuration file: spyserver.config
Listening for connections on 0.0.0.0:5555
```


Necesitamos que SPY Server funcione de forma autónoma en la Raspberry Pi y que se inicie de forma automática cuando esta se reinicie. Para ello vamos a lanzar SPY Server como un servicio.

Lo primero será crear un archivo *unit* con la información del servicio:

```
sudo nano /etc/systemd/system/spyserver.service
```

El contenido del archivo será el siguiente (modificar las rutas si es necesario):

```
[Unit]
Description=SPY Server
After=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
Restart=always
RestartSec=1
User=pi
WorkingDirectory=/home/pi/SPY_Server
ExecStart=/home/pi/SPY_Server/spyserver

[Install]
WantedBy=multi-user.target
```

Ahora vamos a cargar el servicio en el arranque mediante el siguiente comando:

```
sudo systemctl enable spyserver
```

Por último iniciamos el servicio:

```
sudo systemctl start spyserver
```

Para consultar el estado del servicio ejecutamos:

```
sudo systemctl status spyserver
```

Si todo está correcto tendremos la siguiente salida:

```
● spyserver.service - SPY Server
   Loaded: loaded (/etc/systemd/system/spyserver.service; enabled; vendor preset: enabled)
   Active: active (running) since Fri 2020-04-10 21:45:26 CEST; 13s ago
 Main PID: 20788 (spyserver)
    Tasks: 2 (limit: 2200)
   Memory: 252.0K
   CGroup: /system.slice/spyserver.service
           └─20788 /home/pi/SPY_Server/spyserver

Apr 10 21:45:26 raspberrypi systemd[1]: Started SPY Server.
```

## Conectar SDR# a nuestro SPY Server

El último paso será conectarnos a nuestro servidor desde SDR#. Para ello seleccionamos **SPY Server Network** en el desplegable de seleción de fuentes e introducimos la dirección IP del servidor de la siguiente forma:

```
sdr://IP_RASPBERRY:5555
```
<br>
{% asset_img conectar.png "Conexión" %}

Por último hacemos click en la **C** para conectarnos.

{% asset_img sdr_sharp.png 900 "SDR#" %}
