---
title: Recibir imágenes HRPT desde satélites meteorológicos
date: 2022-09-25 18:10:49
tags: [Satélites, Satélites meteorológicos, Meteorología, HRPT]
author: EA7KOO
description: Guía para recibir imágenes HRPT desde los satélites meteorológicos LEO.
updated: 2023-07-02 17:11:12
---

Como ya vimos en artículos anteriores, podemos recibir imágenes meteorológicas desde los distintos satélites que fotografían continuamente la superficie terrestre desde una órbita baja. Hasta ahora habíamos visto como obtener esas imágenes de baja resolución en la banda de VHF desde los satélites NOAA y Meteor-M. En este artículo veremos cómo obtener imágenes en una resolución mucho mayor en la banda L.

<!-- more -->

Este artículo no es más que una breve adaptación del artículo de  ["Beginner's guide to HRPT reception"](https://sgcderek.github.io/blog/beginner-hrpt-guide.html) de [Derek OK9SGC](https://sgcderek.github.io/). En dicho artículo están descritos minuciosamente todos los pasos que vamos a ver aquí, por lo que es recomendable su lectura previamente a la de este artículo.
Todos los pasos que se van a mostrar a continuación son los que se han seguido hasta la obtención de imágenes de una forma bastante aceptable. Esto quiere decir, que no es el único ni el mejor método para obtener dichas imágenes, sino que existen muchas otras formas para obtenerlas.

# Satélites

Los satélites que emiten actualmente imágenes en modo HRPT en banda L son los siguientes.

| Satélite      | Frecuencia (MHz) |
|---------------|---------|
| NOAA-15       | 1.702,5 |
| NOAA-18       | 1.707   |
| NOAA-19       | 1.698   |
| Meteor-M N2-2 | 1.700   |
| Meteor-M N2-3 | 1.700   |
| MetOp-B       | 1.701,3 |
| MetOp-C       | 1.701,3 |
| FengYun-3B (*)| 1.704,5 |
| FengYun-3C (*)| 1.701,4 |

(*) Los satélites FengYun-3 emiten con ciertas limitaciones y de forma discontinua.


# Preparación

## El SDR

El único requisito que necesita nuestro dispositivo SDR para poder recibir estas señales es que pueda sintonizar esas frecuencias y que posea al menos 2,56 MSPS de tasa de muestreo. Los dispositivos como el RTL-SDR V3 y los Nooelec NESDR son perfectamente válidos para la recepción, pero se recomienda usar un dispositivo un poco más estable y con mayores tasas de muestreo como el AirSpy Mini o el AirSpy R2. Para este artículo se ha utilizado un AirSpy R2.


## El LNA

Dado que estamos trabajando en banda L, es casi imprescindible el uso de un amplificador para poder captar la señal correctamente. Podemos utilizar cualquier LNA que abarque esta banda y permita una correcta recepción de la señal.
También tenemos la opción de adquirir un LNA con filtro diseñado para estas frecuencias. Nooelec dispone de dos modelos de LNA con filtro SAW centrados en 1.688 MHz con similares prestaciones.

| Modelo | Ganancia | Observaciones |
| - | :-: | - |
| SAWbird GOES  | 20 dBm | Requiere 30 mA. Se puede usar con el _Bias-Tee_ del SDR. |
| SAWbird+ GOES | 30 dBm | Requiere 180 mA. Necesita alimentación externa. |

En este caso se ha utilizado el modelo SAWbird+ GOES alimentado de forma externa con una batería portátil de 5 voltios.

{% asset_img lna.jpeg 400 "Nooelec SAWbird+ GOES" %}


## La antena

Para la recepción vamos a utilizar una antena con reflector parabólico. En este caso se ha usado un reflector de 80 centímetros, pero lógicamente con uno de mayor tamaño recibiremos mucho mejor.
Para el _feed_ de la antena se ha construido la antena helicoidal para 1,7 GHz con las medidas que Derek OK9SGC indicó en el artículo. Si disponemos de impresora 3D, lo más fácil es imprimir la plantilla que el autor publicó en Thingiverse y que podemos encontrar en el siguiente enlace:

[<center>Helical antenna scaffold set (v4)</center>](https://www.thingiverse.com/thing:4980180)

{% asset_img helix.jpeg 600 "Helix" %}

Para realizar el acople al reflector, se ha diseñado una pieza para poder realizar el montaje usando la propia montura del LNB. Si el modelo de reflector que vamos a usar es de la marca Televés, es posible que se pueda usar la misma. Podemos descargar el STL de la pieza desde el siguiente enlace:

[<center>Helical antenna adapter for dish reflector</center>](https://www.thingiverse.com/thing:5437712)

{% asset_img helix_adapter.jpeg 600 "Adaptador" %}

# Montaje

Dado que en este caso se va a realizar el seguimiento manualmente, lo que se ha hecho es usar un trípode y colocar un tubo de PVC sobre el mismo (que hará de eje horizontal) en el que se ha colocado el reflector. Para el eje vertical se ha colocado el propio herraje del reflector, pero dejando solo un tornillo para que pueda moverse libremente hasta quedar casi en horizontal.

{% asset_img antena.jpeg 600 "Montaje de la antena" %}

La colocación de la antena helicoidal se hará en el sitio del LNB usando la pieza mencionada anteriormente. Después colocamos el LNA directamente a la antena y después el SDR. Ya que era demasiado el peso que debía soportar el conector SMA al colocar el SDR directamente tras el LNA, se ha optado por usar un latiguillo lo más corto posible.

{% asset_img montaje.jpeg 700 "Detalle del feed" %}


## El software

Para realizar tanto la grabación como la posterior decodificación existen distintas alternativas. Las más comunes son [SatDump](https://github.com/altillimity/SatDump) y [LeanHRPT](https://github.com/Xerbo/LeanHRPT-Demod). En este ejemplo se ha usado LeanHRPT que se compone de dos programas, uno para la grabación y otro para la decodificación y procesado. Podemos descargarlos desde los siguientes enlaces

- [LeanHRPT-Demod](https://github.com/Xerbo/LeanHRPT-Demod/releases/latest)

- [LeanHRPT-Decode](https://github.com/Xerbo/LeanHRPT-Decode/releases/latest)

La instalación de ambos programas en Windows es muy simple. Basta con descargar el archivo ZIP y extraer su contenido.

# Recepción
## Seguimiento

Llegamos ahora a la parte que en un principio puede resultar más complicada, si no disponemos de un rotor que realice el seguimiento de forma automática. En este caso se ha optado por la opción de hacerlo manualmente, por lo que vamos a tener que ir moviendo la antena y apuntando a la dirección del satélite de la mejor manera que podamos. En un principio puede parecernos algo muy complicado, pero con un poco de práctica, teniendo buen pulso y evitando los movimientos bruscos, se puede realizar bastante bien y obtener unos resultados más que aceptables.

Lo recomendable es usar alguna aplicación o programa que nos indique la posición del satélite para ayudarnos a apuntar. En este caso se ha usado la aplicación para móvil Android [Look4Sat: Satellite tracker](https://play.google.com/store/apps/details?id=com.rtbishop.look4sat). Esta aplicación usa los sensores del teléfono para ayudarnos a encontrar la posición actual del satélite que queramos.

{% asset_img Look4Sat.jpeg 400 "Look4Sat" %}
## Grabación

Puesto que hemos optado por usar el programa LeanHRPT para grabar la señal, debemos configurarlo antes de que comience el pase del satélite.

Los ajustes que debemos introducir son los siguientes:
- **Source.** Seleccionamos SDR para que utilice nuestro dispositivo. El dispositivo debe estar conectado para que cargue los drivers. El programa ya lleva los drivers para los dispositivos más comunes.
- **Downlink.** Seleccionamos el satélite que vamos a recibir. Dependiendo del satélite se grabará en un modo u otro.
- **Frequency.** Aquí debemos introducir la frecuencia del satélite. [Consultar el punto 1 del artículo.](#Satelites)
- **Sample Rate.** Tasa de muestreo. Consultar los valores recomendados por Derek OK9SGC. Para el AirSpy R2 hay que introducir 6 MSPS.
- **Gain.** Ganancia del SDR. Se activa después de pulsar _Start_. Ajustar según sea necesario.
- **Enable Bias Tee.** Activa el _Bias Tee_ del SDR si este lo permite. Debemos tener cuidado con activarlo si ya estamos alimentando el LNA de forma externa.
- **Output file.** Indicamos la ubicación del archivo de grabación.

Una vez esté todo configurado hacemos clic en _Start_ para iniciar la grabación.

{% asset_img LeanHRPT_Demod.jpeg 700 "LeanHRPT Demod" %}

También podemos abrir la ventana de FFT para ver el espectro de la señal.

{% asset_img lean_fft.jpeg 600 "LeanHRPT FFT" %}

Ahora el objetivo es realizar el seguimiento y asegurarse de que la demodulación se está realizando correctamente. Cuanto más definidos veamos los puntos en la ventana, más limpia saldrá la imagen una vez decodificada.

## Decodificación

Por último, una vez ha finalizado el pase y hemos detenido la grabación, vamos a decodificar el archivo generado y poder ver la imagen.
Para ello abrimos el programa LeanHRPT-Decode, hacemos clic en _File_ y _Open_ y seleccionamos el archivo.
Si la grabación ha sido buena, veremos que se procesa el archivo y aparece la imagen en pantalla.
Una vez tengamos la imagen, ya podemos jugar con las distintas configuraciones y canales para obtener la imagen a nuestro gusto.

{% asset_img LeanHRPT_Decode_NOAA19.jpeg "LeanHRPT Decode NOAA19" %}

{% asset_img LeanHRPT_Decode_MetOpB.jpeg "LeanHRPT Decode MetOpB" %}

# Agradecimientos

Como no podía ser de otra forma, quiero agradecer a Derek OK9SGC su trabajo en la elaboración de la guía en la que me he basado. Creo que la sencillez y la claridad de esta, han sido los incentivos que me han empujado a probar esta forma de recibir imágenes.
