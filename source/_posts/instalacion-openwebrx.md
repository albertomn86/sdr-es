---
title: Instalar receptor SDR online con OpenWebRX
date: 2020-08-13 17:36:20
tags: [OpenWebRX, RTL-SDR, Raspberry Pi, Linux]
author: AlbertoMN
---

[OpenWebRX](https://www.openwebrx.de/) es un software de recepción de señales de radio mediante dispositivos SDR que opera desde una interfaz web. Esto permite visualizar y procesar señales en tiempo real desde cualquier sitio, simplemente accediendo desde un navegador web.

Este proyecto _Open Source_ nació en 2015 de mano de András Retzler (HA7ILM). Pero a finales de 2019, el autor abandonó el proyecto y es cuando [Jakob Ketterl](https://github.com/jketterl) retomó el desarrollo del proyecto añadiendo nuevas funcionalidades y mejorando el software. El proyecto comenzó a ganar popularidad y cuenta actualmente con un gran número de colaboradores.

En este artículo veremos cómo instalar OpenWebRX en una Raspberry Pi usando su código fuente. Existen otras opciones disponibles para instalar este software, como imágenes para tarjetas SD, paquetes, imágenes para Docker, pero presentan algunas carencias o bien son más complejas. El proceso de instalación manual que vamos a seguir es similar para cualquier distribución Linux, lo que nos aporta más posibilidades.

<!-- more -->

{% asset_img openwebrx.jpg 900 "OpenWebRX" %}

## Instalar dependencias de instalación

Para poder compilar e instalar las librerías necesarias necesitamos una serie de dependencias. Para instalarlas ejecutamos los siguientes comandos:

```
sudo apt update
```
```
sudo apt install git build-essential cmake libfftw3-dev python3 python3-setuptools rtl-sdr netcat libitpp-dev libsndfile-dev librtlsdr-dev automake autoconf libtool pkg-config
```

## Instalar librerías

### Instalar CSDR

_CSDR_ es la librería encargada de gestionar el dispositivo SDR. Siguiendo los pasos expuestos a continuación podremos compilarla e instalarla.

```
git clone https://github.com/jketterl/csdr.git
```
```
cd csdr
```
```
autoreconf -i
```
```
./configure
```
```
make
```
```
sudo make install
```
```
cd ..
```
```
sudo ldconfig
```

### Instalar OWRX Connector

_OWRX Connector_ es la librería encargada de conectar la interfaz del SDR con OpenWebRX. Instalamos siguiendo los pasos descritos a continuación.

```
git clone https://github.com/jketterl/owrx_connector.git
```
```
cd owrx_connector
```
```
mkdir build
```
```
cd build
```
```
cmake ..
```
```
make
```
```
sudo make install
```
```
cd ../..
```

### Instalar SoapySDR (Opcional)

Si vamos a utilizar un dispositivo distinto del RTL-SDR tendremos que instalar SoapySDR para poder usarlo.
Los pasos para su instalación son los siguientes:

```
sudo apt-get install libsoapysdr0.6 libsoapysdr-dev soapysdr-tools soapysdr-module-all
```

Si no encuentra la librería "libsoapysdr0.6", reemplazar por "libsoapysdr0.7".


## Clonar repositorio de OpenWebRX

Descargamos la última versión estable disponible. Consultar el listado de versiones [aquí](https://github.com/jketterl/openwebrx/tags).
```
git clone -b 0.19.1 https://github.com/jketterl/openwebrx.git
```

## Configuración

El archivo de configuración se encuentra dentro del repositorio que acabamos de clonar. Para editarlo lo abrimos con el editor:
```
nano config_webrx.py
```

Este archivo contiene muchos ajustes que podemos modificar. El ajuste principal que vamos a ver es el de configurar los dispositivos SDR. Para ello abrimos el archivo y buscamos el siguiente fragmento:

```
...
sdrs = {
    "rtlsdr": {
        "name": "RTL-SDR USB Stick",
        "type": "rtl_sdr",
        "ppm": 0,
        # you can change this if you use an upconverter. formula is:
        # center_freq + lfo_offset = actual frequency on the sdr
        # "lfo_offset": 0,
        "profiles": {
            "70cm": {
                "name": "70cm Relais",
                "center_freq": 438800000,
                "rf_gain": 30,
                "samp_rate": 2400000,
                "start_freq": 439275000,
                "start_mod": "nfm",
            },
            "2m": {
                "name": "2m komplett",
                "center_freq": 145000000,
                "rf_gain": 30,
                "samp_rate": 2400000,
                "start_freq": 145725000,
                "start_mod": "nfm",
            },
        },
    },
}
...
```

Ahora lo editamos con los datos de nuestro/os dispositivos conectados. A continuación se muestra un breve descripción de esta configuración:

```
sdrs = {
    "[NOMBRE_DEL_AJUSTE]": {
        "name": "[NOMBRE_DEL_DISPOSITIVO: Nombre descriptivo que se mostrará en el selector.]",
        "type": "[TIPO_DISPOSITIVO: rtl_sdr, rtl_sdr_soapy, sdrplay, hackrf, airspy, airspyhf, fifi_sdr, perseussdr, lime_sdr, pluto_sdr,soapy_remote.]",
        "device": "[NUMERO_SERIE: Añadir en caso de que tengamos varios dispositivos RTL-SDR.]",
        "ppm": [VALOR_PPM],
        "lfo_offset": [VALOR_DESPLAZAMIENTO: Añadir si usamos Up/Down converter.],
        "profiles": {
            "[NOMBRE_DEL_PERFIL]": {
                "name": "[DESCRIPCION: Nombre que se mostrará en el selector.]",
                "center_freq": [FRECUENCIA_CENTRAL],
                "rf_gain": [GANANCIA_DEL_SDR: Ganancia para esta frecuencia.],
                "samp_rate": [SAMPLE_RATE],
                "start_freq": [FRECUENCIA_DE_INICIO],
                "start_mod": "[MODO_DE_INICIO]"
            }
        }
    }
}
```

Modificamos el ajuste añadiendo o quitando tantos dispositivos y perfiles como queramos.


## Instalar como servicio

El último paso es instalar OpenWebRX como servicio para que se inicie de forma automática al iniciar el sistema. Para ello vamos a añadir un nuevo servicio:
```
sudo nano /etc/systemd/system/openwebrx.service
```

Añadimos lo siguiente, modificando si fuese necesario:
```
[Unit]
Description=OpenWebRX
After=network.target
StartLimitIntervalSec=0

[Service]
Type=simple
Restart=always
RestartSec=1
User=pi
WorkingDirectory=/home/pi/openwebrx
ExecStart=/usr/bin/python3 /home/pi/openwebrx/openwebrx.py

[Install]
WantedBy=multi-user.target
```

Activamos para que se inicie de forma automática:
```
sudo systemctl enable openwebrx
```

Iniciamos el servicio:
```
sudo systemctl start openwebrx
```

Ahora ya podemos acceder desde cualquier navegador introduciendo la dirección IP de la Raspberry Pi y el puerto 8073 (podemos cambiarlo en los ajustes):
```
http://[DIRECCION_IP:8073]
```

## Instalar paquetes adicionales

Tenemos la posibilidad de añadir nuevos paquetes a OpenWebRX para decodificar ciertos modos digitales:

- JS8Call.
- APRS.
- WSJT-X (FT8, FT4, WSPR, JT65, JT9).
- Voz digital (DMR, YSF).

La guía de instalación de todos estos paquetes se encuentra en el manual oficial de instalación de OpenWebRX del que se ha obtenido la información para este artículo:

[<center>https://github.com/jketterl/openwebrx/wiki/Manual-Package-installation-(including-digital-voice)</center>](https://github.com/jketterl/openwebrx/wiki/Manual-Package-installation-(including-digital-voice))
