---
title: Recibir satélites meteorológicos NOAA en Linux
date: 2022-02-02 18:21:07
tags: [Satélites, Satélites meteorológicos, NOAA, Meteorología, Linux, WXtoIMG]
author: EA7KOO
description: Guía detallada para recibir imágenes en formato APT desde los satélites meteorológicos NOAA en Linux.
---

En el artículo ["Recibir satélites meteorológicos NOAA"](/recepcion-satelites-meteorologicos-NOAA/) vimos cómo recibir imágenes en formato APT desde los satélites meteorológicos NOAA. El proceso para la recepción y decodificación se realizó íntegramente en Windows, y en este artículo veremos como realizar el mismo proceso usando Linux (Ubuntu) como sistema operativo.

<!-- more -->

{% asset_img noaa18.jpg 500 "NOAA 18" %}

## Datos de los satélites

Actualmente podemos recibir imágenes APT desde los siguientes satélites meteorológicos NOAA.

| Satélite        | NOAA 15 | NOAA 18 | NOAA 19 |
|-----------------|---|---|---|
| **NORAD ID**    | 25338 | 28654 | 33591 |
| **COSPAR ID**   | 1998-030A | 2005-018A | 2009-005A |
| **Masa de lanzamiento** | 1.457 Kg | 1.457 Kg | 1.440 Kg |
| **Fecha de lanzamiento** | 13 de Mayo de 1998 | 20 de Mayo de 2005 | 6 de Febrero de 2009 |
| **Señal APT**   | 137,620 MHz | 137,9125 MHz | 137,100 MHz |


## Instalación de WXtoImg

Disponemos de diferentes formas para decodificar las imágenes APT de estos satélites. En este artículo vamos a utilizar **WXtoImg** al que le pasaremos el audio para generar la imagen en tiempo real. Podemos descargarlo desde el siguiente enlace (descargar la versión beta 2.11.2 para la distribución Linux que usemos):

[<center>Descargar WXtoImg</center>](https://wxtoimgrestored.xyz/downloads/)

En esta guía estamos usando la última versión de Ubuntu para escritorio, así que descargaremos el paquete _.deb_ correspondiente.

La instalación la haremos en modo gráfico, simplemente abriendo el archivo descargado con el gestor de paquetes de Ubuntu y haciendo clic en 'Instalar'.

{% asset_img wxtoimg_instalar.jpg 900 "Instalación de WXtoIMG" %}

Cuando finalice la instalación, iniciamos el programa ejecutando el siguiente comando desde una terminal:

```
xwxtoimg
```

Una vez se inicie el programa, seguiremos los siguientes pasos para configurar los ajustes básicos necesarios:

1. El primer paso será introducir la clave de registro para poder desbloquear todas las funcionalidades. En la misma página desde dónde hemos descargado el programa podemos encontrar los datos para registrarlo.

2. Introducir los datos de nuestra ubicación. Estos datos los necesita WXtoImg para calcular los pases de los satélites y para colocar la capa de líneas con los contornos. Cuanto más ajustados sean estos valores, mejor se ajustará esta capa a la imagen. Para introducirlos vamos a **_\"Options\"_** y **_\"Ground Station Location...\"_**. En esta ventana introducimos nuestras coordenadas y altitud.

{% asset_img wxtoimg_location.jpg 500 "WXtoIMG - Ajustes GS" %}

3. Ajustes de grabación. Tenemos que indicarle a WXtoImg que le vamos a pasar la señal de audio mediante un cable de audio virtual (veremos más adelante cómo hacerlo). Para ello vamos a **_\"Options\"_** y **_\"Recording Options\"_**. Aquí seleccionamos "Default audio" en _soundcard_.

{% asset_img wxtoimg_recording_options.jpg 600 "WXtoIMG - Recording options" %}

4. Marcamos la opción de resincronizado en **_\"Options\"_**, **_\"Resync\"_**.

5. Podemos hacer que WXtoImg nos genere las imágenes que queramos añadiendo los datos de la telemetría una vez termine de recibir la imagen del satélite. Para ello vamos a **_\"Options\"_**, **_\"Auto Processing Options...\"_** y marcamos **_\"Create image(s)\"_**. Después hacemos clic en **_\"Image Settings...\"_** y elegimos las imágenes que queramos.

6. Por último actualizamos los datos de posición de los satélites en WXtoImg. Vamos a **_\"File\"_** y hacemos clic en **_\"Update Keplers\"_**. Una vez se actualicen, el programa nos mostrará en la parte inferior de la ventana la información del siguiente pase sobre nuestra ubicación.

7. Es importante tener la hora del sistema lo mejor ajustada posible, ya que de ello dependerá en gran medida el ajuste de las capas que WXtoImg superpone a la imagen.


## Cable de audio virtual

Necesitamos crear un cable de audio virtual para poder pasar el audio desde el programa de SDR a WXtoImg para que genere la imagen.
Existen diferentes formas de hacer este procedimiento. En Linux tenemos una forma nativa de generar un cable virtual activando el _loopback_ del kernel ALSA. Para hacerlo simplemente ejecutamos el siguiente comando en una terminal:

```
sudo modprobe snd-aloop
```

Esto nos redirige la salida de audio general del sistema a una entrada de audio. Podemos verificar este cambio si vamos los ajustes de audio de Ubuntu.
Este cambio no es permanente y se perderá la próxima vez que iniciemos el equipo. Para hacerlo fijo debemos añadir un cambio en el sistema para que cargue nuevamente este módulo al iniciar. Para ello ejecutamos el siguiente comando:

```
sudo echo 'snd-aloop' >> /etc/modules-load.d/modules.conf
```

Por último, debemos asegurarnos que el _loopback_ esté activado en el servicio de ALSA. Para ello ejecutamos el siguiente comando:

```
alsamixer
```

Ahora buscamos el _loopback_ en los dispositivos de audio y nos aseguramos de que está activado.

Para finalizar, nos aseguramos que tenemos disponible el control de volumen de PulseAudio. Podemos comprobarlo ejecutándolo desde la terminal mediante el siguiente comando:

```
pavucontrol
```

Si no lo tenemos instalado, podemos hacerlo con:

```
sudo apt install pavucontrol
```

## Recepción

Para recibir la señal del satélite podemos utilizar cualquier programa SDR que funcione en Linux. En este ejemplo vamos a utilizar **SDR++**, el cual ya vimos como instalar en el artículo ["Instalar SDR++"](/instalacion-sdrpp/).

Para el ajuste de frecuencia se ha utilizado **Gpredict**, que también vimos como instalar y configurar en el artículo ["Seguimiento de satélites con Gpredict"](/seguimiento-satelites-gpredict/).

El primer paso será iniciar SDR++ y realizar los ajustes necesarios para la recepción. **Usaremos NFM y un ancho de banda de 36 kHz.**

{% asset_img sdrpp.jpg 900 "SDR++" %}

Para hacerle llegar el audio a WXtoImg debemos marcar como salida por defecto la salida de audio que vemos activa en el control de volumen de PulseAudio. Para ver cual es la que hay activa debemos iniciar la recepción en SDR++ para ver la actividad.

{% asset_img volumen_entrada.jpg 700 "Volumen entrada" %}

Por último, iniciamos WXtoImg y si todo está correctamente configurado, veremos que comienza a decodificar la imagen cuando empieza a recibirse la señal del satélite en SDR++.

{% asset_img wxtoimg_recibiendo.jpg 900 "WXtoImg - Recibiendo imagen APT" %}

Una vez termine el pase, WXtoImg nos generará de forma automática las imágenes que le hayamos indicado en el paso anterior.

{% asset_img wxtoimg_recibida.jpg 900 "WXtoIMG - Imagen recibida" %}
