---
title: "Recepción de los satélites CAS-4"
date: 2020-10-10 19:23:32
tags: [KISS, Satélites]
author: EA7KOO
---

Los satélites CAS-4A y CAS-4B son unos micro-satélites construidos por Zhuhai Orbita Control Engineering Ltd. para el sistema orbital de observación terrestre de China. Su principal componente es una cámara de 1,98m de resolución. Estos satélites envían datos de telemetría en VHF, y son estos datos los que vamos a recibir, decodificar y visualizar en este artículo.

<!-- more -->

## Datos de los satélites

| Satélite        | ZHUHAI-1 01 (CAS-4A) |
|-----------------|---|
| **Operador**    | Zhuhai Orbita Control Engineering Co. Ltd. |
| **NORAD ID**    | 42761 |
| **COSPAR ID**   | 2017-034D |
| **Tamaño**      | Microsatélite 494Lx499Wx630H mm (55 Kg) |
| **Lanzamiento** | 15 de Junio de 2017 |
| **Señal**       | Telemetría: 145,835 MHz (AX.25 4,8k Baud GMSK) <br> Baliza: 145,855 MHz (CW) <br> Transpondedor linear: 145,870 MHz (Bajada) - 435,220 MHz (Subida)|


| Satélite        | ZHUHAI-1 02 (CAS-4B) |
|-----------------|---|
| **Operador**    | Zhuhai Orbita Control Engineering Co. Ltd. |
| **NORAD ID**    | 42759 |
| **COSPAR ID**   | 2017-034B |
| **Tamaño**      | Microsatélite 494Lx499Wx630H mm (55 Kg) |
| **Lanzamiento** | 15 de Junio de 2017 |
| **Señal**       | Telemetría: 145,890 MHz (AX.25 4,8k Baud GMSK) <br> Baliza: 145,910 MHz (CW) <br> Transpondedor linear: 145,925 MHz (Bajada) - 435,280 MHz (Subida)|

{% asset_img satelite.jpg 600 "Satélites CAS-4" %}


## Recepción

Los satélites envían los datos de telemetría en las frecuencias **145.835 MHz** (CAS-4A) y **145.890 MHz** (CAS-4B). Para recibir la señal debemos realizar los pasos habituales para el seguimiento de satélites que ya vimos en el artículo ["Ajuste de frecuencia en recepción de satélites"](/2020/02/18/ajuste-frecuencia-doppler-orbitron/).

Los datos para DDETracker son los siguientes:

**AOS:**
    ```
    radio_Start
    radio_modulation_type<nfm>
    radio_bandwidth_Hz<10000>
    radio_tracking_frequency_On
    ```


## Decodificar la señal

Estos satélites utilizan el protocolo AX.25 en modo KISS. Para decodificar este modo necesitamos instalar el software [Packet-Radio TNC](http://uz7.ho.ua/packetradio.htm) que utiliza la tarjeta de sonido de nuestro ordenador como un modem para AX.25.
Podemos descargar el programa desde el siguiente enlace:
[<center>Descargar High-Speed SoundModem by UZ7HO</center>](http://uz7.ho.ua/modem_beta/hs_soundmodem27.zip)

Una vez descargado el archivo, extraemos el contenido en el directorio que queramos. Posteriormente ejecutamos el archivo **_hs\_soundmodem.exe_** y se nos abrirá la interfaz del programa.

El siguiente paso es configurar el programa para que reciba el audio desde SDR#. Para ello hacemos clic en _Settings_ y en **Input device** seleccionamos el [cable de audio virtual](/2020/01/21/instalacion-virtual-cable-audio/). También debemos activar el **KISS Server Port**.

{% asset_img HS_SoundModem_settings.png 400 "Ajustes de HS SoundModem" %}

Por último, seleccionamos el modo **FSK G3RUH 4800bd** en la ventana principal del programa.

{% asset_img HS_SoundModem.png 370 "HS SoundModem" %}


## Procesar los datos

Una vez tenemos la parte que decodifica la señal, necesitamos configurar la parte que se va a encargar de procesar los datos en modo KISS decodificados y generar un archivo con todos los mensajes para su posterior visualización. Para ello vamos a usar el software **GetKISS** de [DK3WN](https://www.dk3wn.info/wp/ueber-mich/), que podemos descargar desde el siguiente enlace:
[<center>Descargar GetKISS</center>](https://www.dk3wn.info/files/getkiss.zip)

Una vez descargado y extraído el contenido, tenemos que editar algunos ajustes en el archivo **_conf.ini_**:

```
#
# This is the ini file for GetKISS
#
# use tcp port 52002 for ubuntu decoder and port 8100 for windows soundmodem
#

FILE_PATH = D:\Amateurfunk <-- Carpeta en la que se guardarán los datos
#
CALLSIGN = DK3WN
#
# use QTH height in km
#
QTH_LAT = 49.7 <-- Latitud
QTH_LONG = 8.95  <-- Longitud
QTH_HEIGHT = 0.2 <-- Altitud en kilómetros
#
TLEFILE = D:\Amateurfunk\Orbitron\TLE\amateur.txt <-- Archivo TLE que contenga los satélites CAS-4
#

#
#TCP_SERVER = 192.168.178.28
#TCP_PORT = 52002

TCP_SERVER = localhost
TCP_PORT = 8100
```

Una vez modificado el archivo, iniciamos el programa haciendo clic en **getkiss.exe**. Es posible que nos de algún error al iniciar si no tenemos instalados ciertos componentes Active-X. Para solucionarlo debemos descargar el siguiente archivo que contiene los archivos OCX que suelen faltar:
[<center>Descargar archivos OCX</center>](https://www.dk3wn.info/files/ocx.zip)

Una vez descargado, extraemos el archivo OCX que falte dentro de la carpeta en la que hemos guardado GetKISS en el paso anterior. Después registramos el archivo OCX en el sistema ejecutando el siguiente comando en una consola del sistema (como Administrador):

```
regsvr32 RUTA_COMPLETA_DEL_ARCHIVO.OCX
```

{% asset_img regsvr32.png 800 "regsvr32" %}

Si todo ha ido bien, al ejecutar el programa GetKISS nos debe aparecer una ventana como la siguiente:

{% asset_img GetKISS.png 600 "GetKISS" %}

Ahora debemos seleccionar el satélite que vamos a recibir (CAS-4A o CAS-4B). Si el satélite seleccionado está sobre el horizonte, nos aparecerá debajo la posición de este en color verde.

Por último, marcamos la casilla **TCP client**. Si tenemos el programa **HS SounModem** iniciado y correctamente configurado, debe conectarse y mostrar el indicador de color verde.


## Recibiendo el pase

Si tenemos todos los pasos anteriores correctamente configurados, toca ahora esperar a que pasen los satélites y comenzar a recibir mensajes.

{% asset_img CAS-4B.png 800 "CAS-4B" %}
<br/>
{% asset_img CAS-4A.png 800 "CAS-4A" %}


## Decodificando la telemetría

Una vez hemos recibido el pase de uno de de estos satélites, y si todo ha ido bien, tendremos un archivo generado con los datos dentro la carpeta que le indicamos a GetKISS en el archivo de configuración. Para visualizar estos datos vamos a usar el programa **CAS-4 Telemetry Beacon Decoder** de [DK3WN](https://www.dk3wn.info/wp/ueber-mich/), que podemos descargar desde el siguiente enlace:
[<center>Descargar CAS-4AB digital telemetry decoder v.0.2</center>](https://www.dk3wn.info/files/cas4ab.zip)

Una vez descargado, extraemos el contenido y ejecutamos el programa. Puede que nos de problemas con los archivos OCX, pero podemos solucionarlos siguiendo los pasos descritos anteriormente.

Una vez abierto, vamos a **File**, **Open Kissfile** y seleccionamos el archivo _.kss_ que queramos visualizar.

{% asset_img decoder.png 500 "CAS-4 Telemetry Decoder" %}


## Agradecimientos

Gracias a [Andrei (UZ7HO)](http://uz7.ho.ua/) y a [Mike Rupprecht (DK3WN)](https://www.dk3wn.info/wp/ueber-mich/) por crear y compartir algunos de los programas usados en este artículo.
Si te han parecido útiles y quieres agradecer su trabajo, puedes realizarles un donativo desde su web.
