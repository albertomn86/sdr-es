---
title: Instalar dispositivo RTL-SDR en Windows
date: 2020-01-19 19:26:40
updated: 2022-01-06 17:26:40
tags: [RTL-SDR, SDRSharp, Windows, Instalación]
author: EA7KOO
excerpt: En este tutorial veremos cómo instalar nuestro dispositivo RTL-SDR en Windows y usarlo con SDR# (SDR Sharp).
---

En este tutorial vamos a ver cómo instalar nuestro nuevo dispositivo RTL-SDR en Windows 10.

Existen varias alternativas para Windows, pero en este tutorial vamos a instalar y configurar SDR# (SDR Sharp), ya que es el más conocido y utilizado.

<!-- more -->

## Instalación de SDR#

El primer paso es descargar el software que necesitamos para poder usar nuestro SDR. Para ello nos vamos a la web de AIRSPY para descargar la última versión disponible de SDR# haciendo clic en el siguiente enlace:

[<center>https://airspy.com/download/</center>](https://airspy.com/download/)

Descargamos SDR# haciendo clic en el botón _Download_.

{% asset_img descarga.jpg 800 "Descarga de SDR#" %}

Una vez descargado el archivo ZIP, extraemos su contenido en el directorio deseado. En este ejemplo vamos a usar el directorio _C:/SDR/SDRSharp_.

## Instalación de los controladores

El siguiente paso es descargar los controladores (_drivers_) para nuestro dispositivo RTL-SDR. Para ello, el propio SDR# trae un _script_ que nos los descarga automáticamente. Solo tenemos que ejecutar el archivo **install-rtlsdr.bat** que encontraremos en el directorio en el que acabamos de extraer SDR#.

{% asset_img bat.jpg 800 "install-rtlsdr.bat" %}

Una vez el _script_ termine nos pedirá que pulsemos una tecla para finalizar.

Por defecto, Windows nos instala sus propios controladores para nuestro dispositivo RTL-SDR. El problema es que estos no nos sirven para poder utilizarlo con SDR#, por lo que tendremos que sustituirlos por otros.
Para ello utilizaremos el instalador **Zadig**. Este ejecutable se descarga automáticamente al ejecutar el script del paso anterior, por lo que solo tendremos que ir al directorio antes mencionado y ejecutar (**como Administrador**) el archivo **zadig.exe**.

{% asset_img zadig1.jpg 800 "zadig.exe" %}

En la ventana del instalador seleccionamos **Options** y marcamos **List All Devices**.

{% asset_img zadig3.jpg "Zadig list devices" %}

Ahora tendremos que seleccionar nuestro dispositivo en el listado.
Tenemos que asegurarnos de que el dispositivo que seleccionemos se corresponde con el RTL-SDR. De lo contrario vamos a reemplazar el controlador de otro dispositivo y dejará de funcionar.

{% asset_img zadig4.jpg "Zadig replace" %}

Una vez lo tengamos seleccionado correctamente, hacemos clic en **Replace Driver** y esperamos a que se instalen los nuevos controladores.

{% asset_img zadig5.jpg "Zadig instalado" %}

## Configuración de SDR#

Ya tenemos nuestro dispositivo conectado e instalado. Es el turno ahora de decirle a SDR# que utilice nuestro dispositivo.
Para ello vamos al directorio en el que hemos instalado SDR# y ejecutamos **SDRSharp.exe** para iniciar el programa.

Una vez abierto, hacemos clic en **Source** y seleccionamos **RTL-SDR USB**.

{% asset_img sdrsharp_source.jpg "Seleccionando dispositivo" %}

Después de haber seleccionado nuestro dispositivo, tenemos que editar sus ajustes. Para ello hacemos clic en el icono de ajustes para mostrar la ventana de configuración.

{% asset_img sdrsharp.jpg "Ajustes" %}

En esta ventana encontramos las siguientes opciones:

{% asset_img sdrsharp_config.jpg "RTL-SDR Controller" %}

| Ajuste | Recomendado | Descripción |
|---|---|---|
| **Device** |  | Nos permite indicarle el dispositivo RTL-SDR que utilizaremos. Si no hemos instalado los controladores del paso anterior correctamente, no nos aparecerá ninguno disponible. |
| **Sample Rate** | 2.4 MSPS | Permite elegir el ancho de banda que nos mostrará por pantalla. Lógicamente, a mayor valor, mayor consumo de recursos de nuestro PC. Por lo que si tenemos un PC poco potente, debemos seleccionar un valor más bajo. |
| **Sampling Mode** | Quadrature Sampling | Permite elegir el modo de muestreo.|
| **Offset tunning** | R820T: Desactivado   E4000/FC0012: Activado | Solo es necesario para los dispositivos basados los chips E4000 y FC0012. |
| **RTL AGC** | Desactivado | Activa el control automático de ganancia del chip RTL2832U. |
| **Tuner AGC** | Desactivado | Activa el control automático de ganancia del sintonizador del dispositivo. |
| **RF Gain** |  | Permite ajustar la ganancia manualmente. En el siguiente punto veremos como ajustarla correctamente. |
| **Frequency correction (ppm)** | | Permite corregir la variación de la frecuencia que tienen la mayoría de dispositivos. Esta variación se debe al oscilador de baja calidad con el que normalmente vienen. Para establecer este valor, tendremos que sintonizar una frecuencia conocida y ajustarlo manualmente. |

Con todo ya configurado, solo queda pulsar el botón de **Start/Stop** para empezar a recibir.

{% asset_img sdrsharp_start.jpg "SDR# Start/Stop" %}

## Ajuste de la ganancia

En este último paso vamos a ajustar la ganancia de nuestro dispositivo manualmente. Como hemos visto anteriormente, el ajuste de la ganancia se puede dejar para que el dispositivo lo haga automáticamente. El problema es que este ajuste muy pocas veces se hace correctamente, por lo que es muy recomendable hacerlo manualmente. Para ello sintonizamos cualquier señal en la frecuencia para la que vamos a ajustar la ganancia y abrimos los ajustes del dispositivo.
Ahora el objetivo es ajustar el valor de **RF Gain** hasta que consigamos el máximo valor de SNR (Signal to Noise Ratio).

{% asset_img ganancia0.jpg "Ajuste de la ganancia manualmente" %}
{% asset_img ganancia_max.jpg "Ajuste de la ganancia manualmente" %}
{% asset_img ganancia.jpg "Ajuste de la ganancia manualmente" %}

Una vez tengamos la ganancia ajustada, ya tendremos listo nuestro dispositivo SDR.

## SDR# Big Book

En el siguiente enlace podemos consultar la guía de uso de SDR# traducida al español por Miguel Iborra (EA4BAS):

[<center>SDR# Big Book en español (PDF)</center>](https://airspy.com/downloads/SDRSharp_Guia_v2.2_ESP.pdf)
