---
title: Recibir imágenes SSTV desde la ISS
date: 2020-12-26 18:15:55
tags: [ISS, SSTV]
author: AlbertoMN
---

[ARISS](https://www.ariss.org/) organiza ocasionalmente eventos conmemorativos en los que se envían imágenes [SSTV](https://es.wikipedia.org/wiki/SSTV) desde la ISS (_International Space Station_). Estas imágenes se pueden recibir de forma sencilla con cualquier dispositivo SDR y en este artículo veremos como hacerlo.

<!-- more -->

{% asset_img sstv.jpg 500 "Imagen SSTV" %}

## Recepción

Las imágenes son enviadas en la frecuencia **145,800 MHz**. Para recibir la señal debemos realizar los pasos habituales para el [seguimiento de satélites](/2020/02/18/ajuste-frecuencia-doppler-orbitron/).

Los datos para DDETracker son los siguientes:

**AOS:**
    ```
    radio_Start
    radio_modulation_type<NFM>
    radio_bandwidth_Hz<20000>
    radio_center_frequency_Hz<145800000>
    radio_tracking_frequency_On
    ```
</br>


## Decodificación

Para decodificar las imágenes usaremos el programa RX-SSTV que podemos descargar desde el siguiente enlace:

[<center>Descargar RX-SSTV v2.1.5</center>](http://users.belgacom.net/mysoftware/Setup_RXSSTV.exe)

Una vez descargado el instalador, lo ejecutamos e instalamos el programa.

Las imágenes se envían actualmente en modo **PD120** con un tiempo de espera de dos minutos entre cada imagen. Podemos indicarle a RX-SSTV que utilice este modo por defecto y evitarnos el tener que cambiarlo cada vez y que se nos olvide. Para ello vamos a **_Setup_** y **_Setup RX-SSTV_**. En esta ventana de ajustes le indicamos que utilice PD120 por defecto.

{% asset_img Config.png 300 "Ajustes" %}

El siguiente paso es configurar el programa para que reciba el audio desde cable de audio virtual. Para ello vamos a **_Setup_** y **_Sound Control and Devices_**. Se abrirá la ventana de ajustes de audio en la que tenemos que marcar el cable de audio virtual como el dispositivo predeterminado de grabación. Es posible que este cambio afecte a otros programas que tengamos, así que si detectamos problemas de audio debemos revertir este cambio y volver a realizarlo cuando usemos RX-SSTV.

Una vez tengamos todo correctamente configurado, cuando el programa detecte la señal de una nueva imagen, iniciará la recepción de la misma de forma automática.

{% asset_img SDRSharp.png 900 "Recibiendo imagen" %}

Si nos aparece el mensaje _"Overflow"_ en el programa, significa que tenemos el audio demasiado alto. Para solucionarlo simplemente bajamos el volumen del audio en SDR# hasta que desaparezca el mensaje.

Al terminar la recepción de una imagen, el programa la guarda automáticamente y queda a la espera de detectar la siguiente imagen.

{% asset_img RX-SSTV.png 500 "RX-SSTV" %}
