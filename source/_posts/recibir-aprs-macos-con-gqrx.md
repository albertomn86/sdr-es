---
title: Recibir APRS en macOS con Gqrx
date: 2021-04-02 17:06:10
tags: [APRS, ISS, macOS, Gqrx]
author: EA5EMA
description: En esta guía os queremos proponer la recepción de paquetes APRS provenientes de la Estación Espacial (ISS) usando Gqrx.
---

En esta guía os queremos proponer la recepción de paquetes APRS provenientes de la Estación Espacial (ISS) usando [Gqrx](https://gqrx.dk/).
El APRS, es un protocolo de comunicaciones basado en AX.25, usado en el envío de telemetría, paquetes de datos meteorológicos,  posicionamiento GPS, etc. En este caso nos ocuparemos del envío de mensajería entre estaciones de radioaficionados, en la que la Estación Espacial (ISS) es una estación repetidora.

<!-- more -->

Vamos a interceptar esa mensajería de dominio público entre las distintas estaciones de radioaficionado que se mantiene en esos pocos minutos que dura el pase de la ISS por nuestro cielo.

Dentro del ecosistema Apple no hay mucha diversidad de programas SDR, pero que en este caso, la suerte nos ha sonreído con GQRX.
Es un programa que tiene muchos seguidores, ya que brinda sencillez y no consume muchos recursos. Pero que en este caso nos ofrece todo aquello que necesitamos para la recepción de esa mensajería APRS.

## Instalación de Gqrx

La instalación es sencilla, y más aún para todos aquellos que ya tienen instalado el sistema de administración de paquetes Homebrew previamente.

Si no tienes un administrador de programas, proponemos su instalación siguiendo [esta guía](https://franyerverjel.com/blog/instalacion-de-homebrew-en-mac).

Para la instalación, usando el administrador de paquetes, abrimos una ventana de terminal y escribimos:
```
brew install --cask gqrx
```

Una vez finalizada la instalación, iniciamos desde el icono de la aplicación:

{% asset_img icono.png 90 "Gqrx" %}

En el momento de empezar esta guía la versión del programa es la 2.14.4.


## Funcionamiento

Ya finalizada la instalación y familiarizados con el programa, sintonizamos la frecuencia en la que trabaja la ISS, que en este caso es 145.825.000 Hz.
Elegimos el modo WFM (mono) y abrimos el único _plugin_ que trae de serie el programa, y que lo podemos encontrar dentro de la pestaña **Tools** con el título de **AFSK1200 Decoder**.

{% asset_img gqrx-menu.png 900 "Gqrx" %}

Se abrirá una ventana muy simple en la que irán apareciendo los mensajes interceptados y decodificados.

{% asset_img mensajes.png 800 "Gqrx - Mensajes" %}

Y hasta  aquí la guía. Espero que os animéis a intentarlo.

73 para todos.
