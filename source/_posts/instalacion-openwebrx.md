---
title: Instalar receptor SDR online con OpenWebRX
date: 2020-08-13 17:36:20
tags: [OpenWebRX, RTL-SDR, Raspberry Pi, Linux]
author: EA7KOO
updated: 2021-12-03 20:42:00
excerpt: En este artículo veremos cómo instalar y configurar nuestro propio WebSDR en una Raspberry Pi con OpenWebRX.
---

[OpenWebRX](https://www.openwebrx.de/) es un software de recepción de señales de radio mediante dispositivos SDR que opera desde una interfaz web. Esto permite visualizar y procesar señales en tiempo real desde cualquier lugar, simplemente accediendo desde un navegador web.

Este proyecto _Open Source_ nació en 2015 de mano de András Retzler (HA7ILM). Pero a finales de 2019, el autor abandonó el proyecto y es cuando [Jakob Ketterl](https://github.com/jketterl) retomó el desarrollo del proyecto añadiendo nuevas funcionalidades y mejorando el software. El proyecto comenzó a ganar popularidad y cuenta actualmente con un gran número de colaboradores.

En este artículo veremos cómo instalar OpenWebRX en una Raspberry Pi. Existen otras opciones disponibles para instalar este software, como imágenes para tarjetas SD, imágenes para Docker, etc. Podemos consultar todas estas opciones en su [página web](https://www.openwebrx.de/).

<!-- more -->

{% asset_img openwebrx_aprs.jpg 900 "OpenWebRX" %}

## Añadir repositorios de instalación

Para poder instalar OpenWebRX en nuestra Raspberry Pi necesitamos previamente añadir los repositorios para Debian. Para ello ejecutamos los siguientes comandos:

```bash
sudo bash -c 'wget -O - https://repo.openwebrx.de/debian/key.gpg.txt | apt-key add'
```
```bash
sudo bash -c 'echo "deb https://repo.openwebrx.de/debian/ buster main" > /etc/apt/sources.list.d/openwebrx.list'
```
```bash
sudo apt update
```

## Instalar OpenWebRx

Ahora ejecutamos el siguiente comando para instalar OpenWebRX:

```bash
sudo apt install openwebrx
```

Durante la instalación nos pedirá una contraseña para acceder a la configuración de OpenWebRx mediante web.

{% asset_img openwebrx_password.jpg 600 "Instalación OpenWebRX" %}

## Configuración

Una vez termine la instalación, accedemos desde un navegador web a la dirección IP de la Raspberry Pi y el puerto 8073.
```
http://[IP_RASPBERRY]:8073/
```

Se nos mostrará la ventana principal de OpenWebRX. Si solo tenemos un SDR conectado es posible que ya podamos comenzar a usarlo, pero si tenemos varios dispositivos conectados nos mostrará un error como el siguiente y que solventaremos en los siguientes pasos.

{% asset_img openwebrx_loaded.jpg 900 "OpenWebRX" %}

Ahora hacemos clic en el botón _"Settings"_ en la esquina superior derecha para acceder a la pantalla de configuración. Nos pedirá un usuario y una contraseña para poder entrar, para los que introduciremos _**"admin"**_ y la contraseña que pusimos en el paso de instalación.

{% asset_img openwebrx_config_login.jpg 900 "OpenWebRX - Configuración login" %}

Una vez accedemos, veremos un menú como el siguiente desde el que accederemos a los distintos ajustes.

{% asset_img openwebrx_config.jpg 900 "OpenWebRX - Configuración" %}

El primer ajuste será introducir los datos generales desde _"General settings"_. Aquí podemos indicar la ubicación de nuestra estación, nuestro indicativo, etc. Una vez introducimos los ajustes, hacemos clic en _"Apply and save"_ para guardarlos.

{% asset_img openwebrx_config_general.jpg 900 "OpenWebRX - Configuración general" %}

El siguiente paso es configurar nuestro dispositivo SDR. Para ello accedemos a los ajustes desde el menú principal en _"SDR devices and profiles"_. Aquí hacemos clic sobre el dispositivo que vayamos a configurar. Si el dispositivo no es ninguno de los mostrados, podemos añadirlo haciendo clic sobre _"Add new device"_, siempre y cuando esté soportado. Podemos ver los dispositivos soportados en [este enlace](https://github.com/jketterl/openwebrx/wiki/Supported-Hardware).

{% asset_img openwebrx_config_devices.jpg 900 "OpenWebRX - Configuración dispositivos SDR" %}

Una vez hemos accedido a la configuración del dispositivo elegido, podemos ir añadiendo los ajustes necesarios seleccionándolos y haciendo clic sobre _"Add"_, y posteriormente introduciendo los valores para cada uno.

{% asset_img openwebrx_config_rtl.jpg 900 "OpenWebRX - Configuración RTL-SDR" %}

Una vez introducidos los ajustes, nos quedaría configurar las bandas. OpenWebRX no permite moverse libremente por todas las frecuencias de la misma forma que hacen otros programas como SDR#. Para poder movernos en las distintas frecuencias tenemos que crear una serie de perfiles para cada frecuencia introduciendo los datos requeridos para cada una.

{% asset_img openwebrx_config_bands.jpg 900 "OpenWebRX - Configuración bandas" %}

Por último, para que OpenWebRW recargue todos los ajustes, reiniciamos el servicio desde la terminal con el siguiente comando:

```bash
sudo systemctl restart openwebrx.service
```
