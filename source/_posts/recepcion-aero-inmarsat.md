---
title: Recepción de mensajes Inmarsat Aero
date: 2020-03-10 12:26:30
tags: [Satélites, Inmarsat, L-Band, SDRSharp, Windows]
author: AlbertoMN
---

Como ya hemos visto en artículos anteriores, es posible recibir y decodificar algunas señales desde los satélites Inmarsat.
En este artículo veremos como decodificar y recibir mensajes Aero.

Inmarsat Aero es el protocolo utilizado para las comunicaciones entre las estaciones de control terrestres y las aeronaves en vuelo mediante satélite. Usando este protocolo se transmiten mensajes [ACARS](https://es.wikipedia.org/wiki/ACARS), ADS-C, fax y voz digital.

<!-- more -->

Para decodificar este protocolo utilizaremos el software Open Source **JAERO**. Podemos descargarlo desde el siguiente enlace:

[<center>JAERO x64 v1.0.4.11</center>](https://github.com/jontio/JAERO/releases/download/v1.0.4.11/JAERO-x64-setup.exe)

Una vez descargado e instalado, procedemos a configurar algunos ajustes. Para ello iniciamos el programa y hacemos click en *Tools* y en *Settings*. Esto abre la ventana de ajustes de JAERO.

{% asset_img jaero_config.jpg "Configuración JAERO" %}

El primer ajuste es indicarle en el apartado de *Soundcard* que le vamos a pasar el audio desde SDR# por el cable de audio virtual.
El siguiente ajuste es indicarle la ubicación de la base de datos con los datos de las aeronaves. Para ello en el apartado *Database* nos aseguramos de que la ruta es correcta y le damos a **Download** para que se descargue una base de datos actualizada. Si todo ha ido bien, deberíamos tener un archivo CSV con los datos en la ruta indicada.

Para recibir datos bastaría con sintonizar SDR# en la frecuencia requerida y ajustar JAERO para que decodifique los mensajes.

Inmarsat emite la señal en diferentes modulaciones y frecuencias. A continuación veremos ejemplos cada una.


## Aero 600 bps

- **Modulación:** Aviation-BPSK.
- **Ancho de banda:** 800 Hz.
- **Frecuencia:** 1545,10 - 1545,25 MHz (IOR).

{% asset_img acars_600_sdr.jpg "AERO 600 bps" %}
</br>
{% asset_img acars_600_jaero.jpg "AERO 600 bps" %}
</br>
{% asset_img acars_600_planelog.jpg "AERO 600 bps planelog" %}


## Aero 1200 bps

- **Modulación:** Aviation-BPSK.
- **Ancho de banda:** 1600 Hz.
- **Frecuencia:** 1545,10 - 1545,25 MHz (IOR).

{% asset_img acars_1200_sdr.jpg "AERO 1200 bps" %}
</br>
{% asset_img acars_1200_jaero.jpg "AERO 1200 bps" %}


## Aero-H, Aero-H+

- **Modulación:** Aviation-QPSK
- **Ancho de banda:** 10,5 KHz
- **Frecuencia:** 1546,0 - 1546,2 MHz (IOR).

{% asset_img aero_sdr.jpg "AERO 10.5k" %}
</br>
{% asset_img aero_jaero.jpg "AERO 10.5k" %}
</br>
{% asset_img aero_planelog.jpg "AERO 10.5k planelog" %}


## Voz Digital

- **Modulación:** Aviation-QPSK.
- **Ancho de banda:** 6 KHz.
- **Frecuencia:** 1546,13 - 1546,18 MHz (IOR).

{% asset_img aero_call_sdr.jpg "AERO 10.5k" %}
</br>
{% asset_img aero_call_jaero.jpg "AERO 10.5k" %}
