---
title: Recibir satélites LoRa
date: 2021-03-29 18:55:34
tags: [Satélites, Cubesat, LoRa, tinyGS]
author: EA7KOO
---

<!-- more -->
{% asset_img logo.png 400 "TinyGS" %}
## Placas compatibles

- Heltec WiFi LoRa 32 V1/V2 (versiones de 433MHz y 863-928MHz).
- TTGO LoRa32 V1/V2 (versiones de 433MHz y 868-915MHz).
- TTGO T-BEAM + OLED (versiones de 433MHz y 868-915MHz).
- FOSSA 1W Ground Station (versiones de 433MHz y 868-915MHz).
- Placas de desarrollo ESP32 con SX126X/SX127X.

Consultar [la web del proyecto](https://github.com/G4lile0/tinyGS/wiki/Ground-Station-configuration#current-available-boards) para más detalles sobre placas compatibles.

## Instalación

Para la instalación seguiremos el método sencillo, que consiste en descargar un programa que realiza la instalación del _firmware_ de forma automática. Para ello accedemos al siguiente enlace para obtener la última versión disponible de TinyGS:

[<center>TinyGS releases</center>](https://github.com/G4lile0/tinyGS/releases/)

Buscamos el instalador en los archivos adjuntos de la última _release_ y descargamos la versión adecuada para el sistema operativo que estemos usando.

{% asset_img assets.png "TinyGS" %}

Una vez descargado, extramos el programa y lo ejecutamos.

{% asset_img tinygs-upload.png "TinyGS" %}

Ahora seleccionamos el puerto COM en el que tenemos conectada nuestra placa y hacemos clic en **_Upload tinyGS firmware!_**.
Si no nos aparece el puerto COM para seleccionar, debemos asegurarnos de que la placa está bien conectada y que tenemos los controladores previamente instalados.

Una vez termine de grabarse nuestra placa, esta se reiniciará (puede tardar algunos minutos) y quedará lista para el siguiente paso.
## Configuración
[<center>TinyGS Personal Bot</center>](https://t.me/tinygs_personal_bot)
{% asset_img telegram-mqtt.png "Telegram" %}

{% asset_img tinygs-configure.png "TinyGS" %}
{% asset_img tinygs-dashboard.png "TinyGS" %}
{% asset_img tinygs-red.png "TinyGS" %}

{% asset_img board.jpg "HELTEC" %}
{% asset_img board-wifi.jpg "HELTEC" %}
{% asset_img board-next.jpg "HELTEC" %}
{% asset_img board-confirmed.jpg "HELTEC" %}
{% asset_img board-error.jpg "HELTEC" %}
