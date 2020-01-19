---
title: Instalación de dispositivos RTL-SDR en Windows
date: 2020-01-19 19:26:40
tags: Windows, SDR#, SDRSharp, RTL-SDR
---

En este tutorial vamos ver cómo instalar nuestro nuevo dispositivo RTL-SDR en Windows 10.

Existen varias alternativas para Windows, pero en este tutorial vamos a utilizar SDR Sharp (SDR#). Este software es el más conocido y utilizado.

## Instalación de SDR Sharp.

El primer paso es descargar el software que necesitamos para poder usar nuestro SDR. Para ello nos vamos a la web de AIRSPY para descargar la última version disponible de SDR Sharp:

[Haz click aquí](https://airspy.com/download/)

Hacemos click en _Download_ y esperamos a que se descargue.

{% asset_img descarga.jpg "Descarga de SDR#" %}

Una vez descargado el archivo ZIP, extraemos su contenido en el directorio deseado. En este ejemplo vamos a usar el directorio _C:/SDR_.

El siguiente paso es descargar los drivers para nuestro dispositivo SDR. Para ello, el propio SDR# trae un script que nos descarga estos drivers directamente.
Solo tenemos que ejecutar el archivo **install-rtlsdr.bat** que encontraremos en el directorio en el que acabamos de extraer el SDR Sharp.

{% asset_img bat.jpg "install-rtlsdr.bat" %}

Una vez el script termine nos pedirá que pulsemos una tecla para finalizar.

## Instalación de los drivers con Zadig.

Por defecto, Windows nos instala sus propios drivers para nuestro dispositivo SDR. Estos drivers no nos sirven para poder utilizarlo con SDR Sharp por lo que tendremos que sustituirlos por otros.
Para ello utilizaremos el instalador Zadig. Este ejecutable se descarga automáticamente al ejecutar el script del paso anterior, por lo que solo tendremos que ir al directorio antes mencionado y ejecutar (como Administrador) el archivo **zadig.exe**.

{% asset_img zadig1.jpg "zadig.exe" %}

En la ventana del instalador seleccionamos **Options** y marcamos **List All Devices**.

{% asset_img zadig3.jpg "Zadig list devices" %}

Ahora tendremos que seleccionar nuestro dispositivo en el listado.

{% asset_img zadig4.jpg "Zadig replace" %}

Una vez lo tengamos seleccionado, hacemos click en **Replace Driver** y esperamos a que se instalen los nuevos drivers.

{% asset_img zadig5.jpg "Zadig instalado" %}

## Configuración de SDR Sharp.

Ya tenemos nuestro dispositivo conectado e instalado. Es el turno ahora de decirle a SDR Sharp que utilice nuestro dispositivo.
Para ello vamos al directorio del SDR sharp y ejecutamos **SDRSharp.exe** para iniciar el programa.

Una vez abierto, hacemos click en **Source** y seleccionamos **RTL-SDR (USB)**.

{% asset_img sdrsharp_source.jpg "Seleccionando dispositivo" %}

Después de haber seleccionado nuestro dispositivo, tenemos que editar sus ajustes. Para ello hacemos click en el icono de ajustes para mostrar la ventana de configuración.

{% asset_img sdrsharp.jpg "Ajustes" %}

En esta ventana encontramos las siguientes opciones:

{% asset_img sdrsharp_config.jpg "RTL-SDR Controller" %}

- **Device:**
- **Sample Rate:**
- **Sampling Mode:**
- **Offset tunning:**
- **RTL AGC:**
- **Tuner AGC:**
- **RF Gain:**
- **Frequency correction (ppm):**

Con todo ya configurado, solo queda pulsar el botón de **Start/Stop** para empezar a recibir.

{% asset_img sdrsharp_running.jpg "SDR Sharp recibiendo" %}
