---
title: Recibir imágenes HRPT desde satélites meteorológicos
date: 2022-09-25 18:10:49
tags: [Satélites, Satélites meteorológicos, Meteorología, HRPT]
author: EA7KOO
description: Guía para recibir imágenes HRPT desde los satélites meteorológicos LEO.
---

Como ya vimos en artículos anteriores, podemos recibir imágenes meteorológicas desde los distintos satélites que fotografían contínuamente la superficie desde una órbita baja. Hasta ahora habíamos visto como obtener esas imágenes de baja resolución en la banda de VHF desde los satélites NOAA y Meteor-M. En este artículo veremos cómo obtener imágenes en una resolución mucho mayor en la banda L.

<!-- more -->

Este artículo no es más que una breve adaptación del artículo de Derek OK9SGC ["Beginner's guide to HRPT reception"](https://sgcderek.github.io/blog/beginner-hrpt-guide.html). En dicho artículo están descritos minuciosamente y todos los pasos que vamos a ver aquí, por lo que es recomendable su lectura previamente a la de este artículo.
Todos los pasos que se van a mostrar a continuación son los que se han seguido hasta la optención de imágenes de una forma bastante aceptable. Esto quiere decir que no es el único ni el mejor método para obtener dichas imágenes, sino que existen muchas otras formas obtenerlas.

# Satélites

Los satélites que emiten actualmente en banda L son los siguientes.

| Satélite      | Frecuencia (MHz) |
|---------------|---------|
| NOAA-15       | 1.702,5 |
| NOAA-18       | 1.707   |
| NOAA-19       | 1.698   |
| Meteor-M N2   | 1.700   |
| Meteor-M N2-2 | 1.700   |
| MetOp-B       | 1.701,3 |
| MetOp-C       | 1.701,3 |
| FengYun-3B (*)| 1.704,5 |
| FengYun-3C (*)| 1.701,4 |

(*) Los satélites FengYun-3 emiten con ciertas limitaciones y de forma discontínua.


# Preparación

## El SDR

El único requisito que necesita nuestro dispositivo SDR para poder recibir estas señales es que pueda sintonizar esas frecuencias y que posea al menos 2,56 MSPS de tasa de muestreo. Los dispositivos como el RTL-SDR V3 y los Nooelec NESDR son perfectamente válidos para la recepción, pero se recomienda usar un dispositivo un poco más estable y con mayores tasas de muestreo como el AirSpy Mini o el AirSpy R2. Para este artículo se ha utilizado un AirSpy R2.


## El LNA

Dado que estamos trabajando en banda L, es casi imprencindible el uso de un amplificador para poder captar la señal correctamente. Podemos utilizar cualquier LNA que abarque esta banda y permita una correcta recepción de la señal.
También tenemos la opción de adquierir in LNA con filtro diseñado para estas frecuencias. Nooelec dispone de dos modelos de LNA con filtro SAW centrados en 1.688MHz con similares prestaciones.

| Modelo | Ganancia | Observaciones |
| - | :-: | - |
| SAWbird GOES  | 20 dBm | Requiere 30mA. Se puede usar con Bias-Tee del SDR. |
| SAWbird+ GOES | 30 dBm | Requiere 180mA. Necesita alimentación externa. |

En este caso se ha utilizado el modelo SAWbird+ GOES alimentado de forma externa con una batería portatil de 5V.

{% asset_img lna.jpeg 400 "Nooelec SAWbird+ GOES" %}


## La antena

Para la reepción vamos a utilizar una antena con reflector parabólico. En este caso se ha usado un reflector de 80 centímetros, pero logicamente con uno de mayor tamaño recibiremos mucho mejor.
Para el _feed_ de la antena se ha construido la antena helicoidal para 1,7 GHz con las medidas que Derek OK9SGC indicó en el artículo. Si disponemos de impresora 3D, lo más facil es imprimir la plantilla que el autor publicó en Thingiverse y que podemos encontrar en el siguiente enlace:

[<center>Helical antenna scaffold set (v4)</center>](https://www.thingiverse.com/thing:4980180)

{% asset_img helix.jpeg 600 "Helix" %}

Para realizar el acople al reflector, se ha diseñado una pieza para poder realizar el montaje usando la propia montura del LNB. Si el modelo de reflector que vamos a usar es de la marca Televés, es posible que se pueda usar la misma. Podemos descargar el STL de la pieza desde el siguiente enlace:

[<center>Helical antenna adapter for dish reflector</center>](https://www.thingiverse.com/thing:5437712)

{% asset_img helix_adapter.jpeg 600 "Adaptador" %}

# Montaje

dado que en este caso se va a relizar el seguimiento manualmente, lo que se ha hecho es usar un trípode y colocar un tubo de PVC soble el mismo (que hará de eje horizontal) en el que se ha colocado el reflector. Para el eje vertical se ha colocado el propio herraje del reflector pero dejando solo un tornillo para que pueda moverse manualmente.

{% asset_img antena.jpeg 600 "Montaje de la antena" %}

La colocación de la antena helicoidal se hará en el sitio del LNB usando la pieza mencionada anteriormente. Despues colocamos el LNA directamente a la antena y después el SDR. Ya que era demasiado el peso que debía soportar el conector SMA al colocar el SDR directamente tras el LNA, se ha optado por usar un latiguillo lo más corto posible.

{% asset_img montaje.jpeg 600 "Detalle del feed" %}


## El software


https://github.com/Xerbo/LeanHRPT-Demod
https://github.com/Xerbo/LeanHRPT-Decode

https://github.com/altillimity/SatDump

# Recepción

## Seguimiento

## Grabación
{% asset_img lean_fft.jpeg 600 "Helix" %}
## Decodificación

# Agradecimientos
