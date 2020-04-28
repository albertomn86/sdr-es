---
title: "Recepción de satélites Inmarsat"
date: 2020-03-06 11:22:33
tags: [Satélites, Inmarsat, L-Band]
author: AlbertoMN
---

Inmarsat es un proveedor de comunicaciones vía satélite con sede en Reino Unido. La constelación de satélites Inmarsat se compone actualmente de 12 satélites geoestacionarios que proporcionan cobertura en el 90% del planeta.
Inmarsat utiliza sus satélites de tercera y cuarta generación para ofrecer servicios de comunicaciones utilizando la **banda L** (1 a 2 GHz). Estos servicios son:

- **AERO**. Es la versión de ACARS a través de satélite. Son mensajes enviados desde los controles aéreos en tierra a los aviones en vuelo.

- **SafetyNET (SDT-C)**. Es un servicio de comunicaciones por satélite para embarcaciones. Ofrecen servicio de mensajería entre barcos, mensajes de alerta, partes meteorológicos, mensajes de rescate, etc.

En este artículo nos centraremos en cómo poder recibir la señal y en los sucesivos artículos veremos como recibir datos de cada uno de estos servicios.

<!-- more -->

## Antenas

Existen diferentes tipos de antenas que nos permiten recibir la señal de los satélites en la banda L. A continuación veremos algunos ejemplos de antenas que podemos utilizar.


### Antena patch PCB

Nooelec comercializa una antena específica para Inmarsat y que podemos adquirir desde su tienda en Estados Unidos o desde España a través de Amazon. Para poder recibir la señal tendremos que acompañarla de un LNA.

| Frecuencia | Ganancia | Especificaciones |
| --- | --- | --- |
| 1546 - 1554 MHz | ~3.5 dBi | [Datasheet](https://www.nooelec.com/store/downloads/dl/file/id/91/product/314/inmarsat_antenna_datasheet_revision_1.pdf) |

{% asset_img antenna_nooelec.jpg "Antena Nooelec" %}


### Antena patch air-gap

Esta antena se comercializaba para Outernet (ahora [Othernet](https://othernet.is/)) en 2016 y quedó descatalogada cuando cambiaron de satélite y de banda. Aunque ya no se comercializa, podemos encontrar algunas existencias en eBay. Con esta antena necesitaremos un LNA para recibir la señal del satélite.

| Frecuencia | Ganancia | Especificaciones |
| --- | --- | --- |
| 1525 - 1559 MHz | 8 dBi | [Othernet](https://othernet.is/products/l-band-patch-antenna) |

{% asset_img antena_patch.jpg "Antena Patch" %}

También podemos optar por construir nuestra propia antena. Las medidas son las que se indican en la siguiente imagen.
Podemos encontrar más información sobre esta antena en [este enlace](https://www.semanticscholar.org/paper/Design-of-a-parabolic-patch-antenna-in-band-L%2C-with-DavidAguirre-Yanyachi/8eaf743c9569e60b1891e964026693766f2727a4).

{% asset_img antena_patch_medidas.jpg "Antena Patch medidas" %}


### Antena patch activa

El blog __RTL-SDR.com__ puso a la venta en 2019 una antena para banda L que podemos usar para Inmarsat. Podemos adquirirla desde su propia tienda online.
Se trata de una antena activa que amplifica y filtra la señal, por lo que no necesitaremos un LNA.

| Frecuencia | Ganancia | Especificaciones |
| --- | --- | --- |
| 1525 – 1637 MHz | - | [RTL-SDR](https://www.rtl-sdr.com/preorder-sale-active-l-band-1525-1637-inmarsat-to-iridium-patch-antenna-set-for-34-95/) |

{% asset_img antena_activa.jpg "Antena de RTL-SDR.com" %}


### Antena helicoidal

Este tipo de antenas se pueden utilizar en combinación con un reflector parabólico o directamente. En los siguientes enlaces podemos ver ambas opciones con ganancias entre comprendidas entre 10 dBi y 16 dBi.


- [Antena helicoidal](http://www.satellitenwelt.de/l-band.htm).
{% asset_img antena_helix.jpg "Antena helicoidal" %}

- [Antena helicoidal con reflector parabólico](https://diebastelkammer.wordpress.com/2014/09/21/helix-antenne-fur-parabolspiegel-um-inmarsat-zu-empfangen/).
{% asset_img antena_helix_parabolica.jpg "Antena helicoidal + parabólica" %}


### Antena helicoidal cuadrifilar

Estas antenas también nos permiten recibir en la banda L. En el siguiente enlace podemos ver como se pueden usar antenas recicladas de radiosondas Vaisala RS92 para recibir la señal del satélite.

[Re-purposing Vaisala RS92 Radiosondes as L-Band Active Antennae](https://rfhead.net/archives/665)
{% asset_img antena_qfh.jpg "Radiosonda Vaisala" %}


## Amplificación de la señal

Si usamos una antena pasiva para la recepción de señales desde el satélite Inmarsat, vamos a necesitar amplificarla para poder recibirla correctamente. Para ello usaremos un amplificador o LNA. Existen distintos tipos de LNA que abarcan también la banda L, y además existen modelos específicos para Inmarsat.
Nooelec ofrece dos modelos de LNA para Inmarsat que podemos adquirir desde su tienda en Estados Unidos o desde Amazon España.

### Nooelec SAWbird iO

Este modelo de LNA incorpora filtro SAW centrado en la frecuencia en la que tenemos los servicios de Inmarsat y se alimenta mediante Bias-T.

{% asset_img lna.jpg "Nooelec SAWbird iO" %}

### Nooelec SAWbird+ iO

Este modelo mejora el filtro de la versión anterior y añade otras dos opciones para poder alimentarlo. Además de la opción de alimentarlo mediante Bias-T, incorpora dos pines para conectarle alimentación externa y también un conector micro-USB para alimentarlo por USB. También ofrece una versión _Premium_ con caja metálica.
**Este modelo necesita un DC block para poder usarse con dispositivos SDR que no lleven diodo de protección ESD.** De lo contrario, tendremos paso de corriente desde el LNA al dispositivo SDR y no podremos recibir la señal correctamente. Los últimos modelos de Nooelec NESDR SMArt llevan este filtro, pero la mayoría de dispositivos, como por ejemplo el V3 de RTL-SDR.com, no lo llevan.

{% asset_img lna2.jpg "Nooelec SAWbird+ iO" %}

## Recepción

Para recibir la señal basta con apuntar nuestra antena a cualquiera de los satélites de los que tengamos cobertura. En España tenemos cobertura del satélite **Inmarsat-4A F4 (Alphasat)** en 24.8°E y del **Inmarsat-3 F5** en 54°O.


{% asset_img inmarsat.jpg "Inmarsat" %}

Ahora iniciamos SDR#, subimos la ganancia del SDR al máximo y ajustamos la antena hasta recibir el máximo posible de señal.

{% asset_img sdrsharp.jpg "SDR# Inmarsat" %}
