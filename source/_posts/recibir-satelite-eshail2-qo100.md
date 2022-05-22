---
title: Recibir satélite Es'hail-2/QO-100
date: 2022-05-22 13:13:01
tags: [Satélites, Es'hail-2/QO-100, SDRSharp, SDR Console]
author: EA7KOO
description: Guía para la recepción del satélite geoestacionario Es'hail-2/QO-100.
---


[Es'hail-2/Qatar-OSCAR 100](https://amsat-dl.org/en/eshail-2-amsat-phase-4-a/) es un satélite geoestacionario catarí construido por Mitsubishi Electric que ofrece servicios de retransmisión de televisión para las regiones del Medio Oeste y Norte de África. Además de estos servicios de retransmisión, este satélite incorpora dos transpondedores para comunicaciones de radioaficionado por satélite.

En este artículo veremos como recibir la señal de estos transpondedores usando una antena parabólica y nuestro dispositivo SDR.

<!-- more -->

## Datos del satélite

| Satélite | Es'hail-2/QO-100 |
|-----------------|---|
| **NORAD ID**    | 43700 |
| **COSPAR ID**   | 2018-090A |
| **Posición**    | 26° Este |
| **Masa de lanzamiento** | 5.300 Kg |
| **Fecha de lanzamiento** | 15 de Noviembre de 2018 |
| **Transpondedores bajada** | **NB:** 10.489,5 MHz - 10.490 MHz (Pol. V) <br> **WB:** 10.491 MHz - 10.499 MHz (Pol. H) |


## Material necesario

### Antena

Para la recepción de este satélite necesitamos una antena parabólica con un disco de al menos 40 centímetros para el transpondedor de banda estrecha y de 80 centímetros para el de banda ancha. El LNB puede ser cualquiera de nuestra elección. Si bien los LNB normales de TV para banda Ku presentan el problema de la desviación de la señal (_LNB drift_), veremos como resolver este problema usando la opción que **SDR Console** proporciona para ello. Aunque lo más recomendable es utilizar un LNB con TCXO, ya que proporciona una mejor recepción en este caso. El LNB recomendado, y que se utiliza en este ejemplo, es el [**Bullseye LNB**](https://www.rtl-sdr.com/qo-100-bullseye-tcxo-ultra-stable-lnb-now-available-in-our-store-for-29-95-with-free-shipping/).

{% asset_img lnb.jpeg 600 "Bullseye LNB" %}

### Bias-Tee

Para hacer funcionar el LNB vamos a necesitar alimentarlo con una tensión de 13V a 18V. Los dispositivos SDR normales pueden proporcionar hasta un máximo de 4,5V, por lo que vamos a requerir de otra forma de alimentación. Podemos encontrar muchas formas distintas de hacerlo si buscamos por internet (inyectores de tensión de TV por satélite, receptores de TV por satélite, etc.), pero en este ejemplo vamos a usar un Bias-Tee externo. Podemos adquirir fácilmente estos dispositivos en cualquier sitio y su coste no es muy elevado (unos 14€).

{% asset_img biast.jpeg 400 "Bias-Tee" %}

Para alimentar el LNB necesitaremos una fuente que nos pueda proporcionar dos voltajes distintos. Unos 13V a 14V para activar la polarización vertical y unos 17V a 18V para la horizontal.

### SDR

Para la recepción en estas frecuencias podemos usar cualquier SDR, ya que el propio LNB actúa como un _Downconverter_, reduciendo la frecuencia de entrada a un rango de salida que comienza en 739MHz y que la mayoría de los dispositivos SDR reciben sin ningún problema.

## Instalación y orientación de la antena

El satélite esta situado en los 26° Este. Para orientar nuestra antena podemos usar algunas aplicaciones existentes para móviles, o bien utilizar una [aplicación online](https://eshail.batc.org.uk/point/) y una brújula.

Una vez colocada y orientada (parcialmente, ya que posiblemente después haya que afinar para mejorar la recepción), vamos a realizar la conexión con nuestro SDR. Para ello necesitamos conectar el LNB (conector verde si usamos el Bullseye) a la entrada del Bias-Tee marcada con RF+DC y el SDR a la salida marcada con RF. En este ejemplo se ha utilizado un cable coaxial para TV con dos conectores F y un adaptador a SMA para conectarlo al Bias-Tee.

{% asset_img sdr-biast.jpeg 900 "Conexiones SDR, Bias-Tee y LNB" %}


## Recepción del transpondedor NB

Como ya se ha mencionado anteriormente, el satélite incorpora dos transpondedores para su uso por radioaficionados. Un transpondedor lineal de banda estrecha (_Narrow Band_) en polarización vertical y otro de banda ancha (_Wide Band_) para televisión digital de radioaficionado (DATV) en polarización horizontal. En este artículo nos vamos a centrar en la recepción del transpondedor de banda estrecha. Para seleccionar el transpondedor bastará con cambiar la tensión de alimentación del LNB en cada caso.

En la siguiente imagen podemos ver la distribución de las bandas en este transpondedor.

{% asset_img AMSAT-QO-100-NB-Transponder-Bandplan-Graph.png 900 "QO-100 NB Bandplan © AMSAT-DL" %}

Más información en la [página web de AMSAT-DL](https://amsat-dl.org/en/new-qo-100-band-plan/).


### Recepción con SDR#

Para recibir la señal del satélite iniciamos SDR# y sintonizamos la frecuencia de 739,770 MHz. Si todo está correctamente conectado y la antena medianamente orientada, deberíamos poder ver la señal de la baliza del satélite. Podemos usar la misma para ajustar nuestra antena lo mejor posible y recibir el máximo de señal.

{% asset_img sdr-sharp-beacon.jpeg 900 "Baliza QO-100" %}

Ahora vamos a aplicar el desplazamiento en SDR# para que las frecuencias se correspondan con las reales del satélite. Esto no es imprescindible, pero nos hará más fácil la búsqueda e identificación de las mismas. Para ello basta con restar a la frecuencia central de la baliza (10.489,750 MHz) la frecuencia en la que nos encontramos dicha señal en el programa (739,771 MHz en nuestro caso).

<center><b>10.489.750.000 Hz - 739.771.000 Hz  = 9.749.979.000 Hz</b></center>

Por último, introducimos este resultado en el campo _Shift_ y lo activamos para aplicar el desplazamiento.

{% asset_img sdr-sharp-recibiendo.jpeg 900 "Recepción QO-100" %}

### Recepción con SDR Console

Como ya se mencionó anteriormente, si estamos usando un LNB que no tenga TCXO es posible que veamos que las señales se desplazan continuamente, lo que hace muy difícil recibirlas correctamente. Para solucionar este inconveniente mediante _software_ podemos usar una utilidad que incorpora el programa [SDR Console](https://www.sdr-radio.com/download).
Seguiremos los pasos indicados en su [página web](https://www.sdr-radio.com/EsHail-2) y que se describen a continuación.

El primer paso es habilitar que se muestren las frecuencias superiores a 9 GHz. Para ello vamos a los ajustes y marcamos el rango indicado en la siguiente imagen.

{% asset_img sdr-console-ajustar-rango.jpeg 900 "SDR Console - Ajuste rango" %}

El siguiente paso es aplicar el desplazamiento de la señal. Para introducir el valor de desplazamiento debemos editar los valores de definición de nuestro dispositivo SDR. Para modificar este valor seleccionamos nuestra radio y le damos a **Definitions** y en la ventana que aparece marcamos **Converter selection** y hacemos clic en **Edit**.

{% asset_img sdr-console-add-converter.jpeg 900 "SDR Console - Desplazamiento" %}

Ahora introducimos el valor de desplazamiento que vimos como calcular en el apartado anterior.

{% asset_img sdr-console-set-converter.jpeg 700 "SDR Console - Converter" %}

Hacemos clic en **Save** y seleccionamos ahora el nuevo _converter_ que acabamos de crear.

{% asset_img sdr-console-seleccionar-converter.jpeg 500 "SDR Console - Converter" %}

Por último, vamos a activar la utilidad de corrección de frecuencia usando la baliza. Para ello vamos a **"View"** en el menú de opciones, le damos a **"Select"** y activamos la opción **"Geostationary Beacon"**. Nos pedirá reiniciar el programa.

{% asset_img sdr-console-geo-beacon-activar.jpeg 900 "SDR Console" %}

Una vez se ha reiniciado el programa, sintonizamos la frecuencia de la baliza y después accedemos a esta nueva opción que acabamos de habilitar. Ahora hacemos clic en el icono del círculo indicado en la siguiente imagen para iniciar la visualización del espectro.

{% asset_img sdr-console-geo-beacon-iniciar.jpeg 900 "SDR Console" %}

El objetivo ahora es seleccionar la baliza haciendo clic en el centro de la señal (podemos usar los botones ⊕ y ⊝ para hacer zoom). Una vez la señal esté marcada, hacemos clic en el icono ▶ para comenzar la corrección.

{% asset_img sdr-console-recibiendo.jpeg 900 "SDR Console" %}


## Decodificar telemetría

Es posible decodificar la señal de la baliza PSK que hemos visto en los apartados anteriores. Esta baliza transmite telemetría y datos del satélite y de la estación de control terrestre.

Usaremos el programa **AO40Rcv** que podemos descargar desde el siguiente enlace:

[<center>Descargar AO40Rcv</center>](https://www.moetronix.com/ae4jy/ao40rcv.htm)

Lo primero es sintonizar la señal en modo **USB** y un ancho de banda de 1,5KHz. Sacamos el audio por el cable de audio virtual.

{% asset_img sdr-sharp-beacon-decode.jpeg 900 "Baliza telemetría QO-100" %}

Ahora iniciamos el programa y seleccionamos como entrada de audio el cable de audio virtual.

{% asset_img beacon-decoder-input.jpeg 350 "SDR Console" %}

Veremos que ahora le llega la señal al programa.

{% asset_img beacon-decoder-signal.jpeg 800 "SDR Console" %}

Una vez se sincronice la señal comenzaremos a visualizar los datos.

{% asset_img beacon-decoder-status.jpeg 800 "SDR Console" %}
