---
title: Instalación de dispositivos RTL-SDR en Windows
date: 2020-01-19 19:26:40
updated: 2021-10-21 09:26:40
tags: [RTL-SDR, SDRSharp, Windows, Instalación]
author: EA7KOO
---

En este tutorial vamos a ver como instalar nuestro nuevo dispositivo RTL-SDR en Windows 10.

Existen varias alternativas para Windows, pero en este tutorial vamos a instalar y configurar SDR# (SDR Sharp), ya que es el más conocido y utilizado.

<!-- more -->

## Instalación de SDR#

El primer paso es descargar el software que necesitamos para poder usar nuestro SDR. Para ello nos vamos a la web de AIRSPY para descargar la última versión disponible de SDR# haciendo clic en el siguiente enlace:

[<center>https://airspy.com/download/</center>](https://airspy.com/download/)

Primero necesitamos instalar el entorno de ejecución de .NET 5 para poder ejecutar SDR#. Para ello descargamos el instalador desde el enlace que encontramos en la página (**_.NET 5 Desktop x86 Runtime_**) y los instalamos.

Por último descargamos SDR# haciendo clic en el botón _Download_.

{% asset_img descarga.jpg "Descarga de SDR#" %}

Una vez descargado el archivo ZIP, extraemos su contenido en el directorio deseado. En este ejemplo vamos a usar el directorio _C:/SDR/SDRSharp_.

## Instalación de los controladores

El siguiente paso es descargar los controladores (_drivers_) para nuestro dispositivo RTL-SDR. Para ello, el propio SDR# trae un _script_ que nos los descarga automáticamente. Solo tenemos que ejecutar el archivo **install-rtlsdr.bat** que encontraremos en el directorio en el que acabamos de extraer SDR#.

{% asset_img bat.jpg "install-rtlsdr.bat" %}

Una vez el _script_ termine nos pedirá que pulsemos una tecla para finalizar.

Por defecto, Windows nos instala sus propios controladores para nuestro dispositivo RTL-SDR. El problema es que estos no nos sirven para poder utilizarlo con SDR#, por lo que tendremos que sustituirlos por otros.
Para ello utilizaremos el instalador **Zadig**. Este ejecutable se descarga automáticamente al ejecutar el script del paso anterior, por lo que solo tendremos que ir al directorio antes mencionado y ejecutar (**como Administrador**) el archivo **zadig.exe**.

{% asset_img zadig1.jpg "zadig.exe" %}

En la ventana del instalador seleccionamos **Options** y marcamos **List All Devices**.

{% asset_img zadig3.jpg "Zadig list devices" %}

Ahora tendremos que seleccionar nuestro dispositivo en el listado.
Tenemos que asegurarnos de que el dispositivo que seleccionemos se corresponde con el RTL-SDR. De lo contrario vamos a reemplazar el driver de otro dispositivo y dejará de funcionar.

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
| **Offset tunning** | R820T: Desactivado   E4000: Activado | Solo es necesario para los dispositivos basados en el chip E4000. |
| **RTL AGC** | Desactivado | Activa el control automático de ganancia del chip RTL2832U. |
| **Tuner AGC** | Desactivado | Activa el control automático de ganancia del sintonizador del dispositivo. |
| **RF Gain** |  | Permite ajustar la ganancia manualmente. En el siguiente punto veremos como ajustarla correctamente. |
| **Frequency correction (ppm)** | | Permite corregir la variación de la frecuencia que tienen la mayoría de dispositivos. Esta variación se debe al oscilador de baja calidad con el que normalmente vienen. Para establecer este valor, tendremos que sintonizar una frecuencia conocida y ajustarlo manualmente. |

Con todo ya configurado, solo queda pulsar el botón de **Start/Stop** para empezar a recibir.

## Ajuste de la ganancia

En este último paso vamos a ajustar la ganancia de nuestro dispositivo manualmente. Como hemos visto anteriormente, el ajuste de la ganancia se puede dejar para que el dispositivo lo haga automáticamente. El problema es que este ajuste muy pocas veces se hace correctamente, por lo que es muy recomendable hacerlo manualmente. Para ello sintonizamos cualquier señal en la frecuencia para la que vamos a ajustar la ganancia y abrimos los ajustes del dispositivo.
Ahora el objetivo es ajustar el valor de **RF Gain** hasta que consigamos el máximo valor de SNR (Signal to Noise Ratio).

{% asset_img ganancia0.jpg "Ajuste de la ganancia manualmente" %}
{% asset_img ganancia_max.jpg "Ajuste de la ganancia manualmente" %}
{% asset_img ganancia.jpg "Ajuste de la ganancia manualmente" %}

Una vez tengamos la ganancia ajustada, ya tendremos listo nuestro dispositivo SDR.
