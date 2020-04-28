---
title: Elección del dispositivo SDR
date: 2020-03-16 12:07:36
tags: RTL-SDR
author: AlbertoMN
---

Existen actualmente en el mercado distintos tipos de dispositivos SDR con determinadas características y prestaciones, y por supuesto con distinto rango de precios. Desde los dispositivos de unos pocos euros, hasta los dispositivos de varios cientos de euros, todos nos pueden servir para recibir señales de radio.
La finalidad este artículo es orientarnos para escoger el dispositivo que más se ajuste a nuestras necesidades y casos de uso. Para ello se han seleccionado algunos de los dispositivos más conocidos y que habitualmente se recomiendan, y se ha elaborado una breve descripción de cada uno de ellos con algunas de sus características más reseñables.

<!-- more -->

| Dispositivo | Sintonizador | Ancho de Banda | Rango frecuencias | Bias Tee | Precio |
| --- | --- | --: | --- | --- | --: |
| RTL-SDR Blog V3           | R820T2 | 2.4 MHz | 500 kHz – 1766 MHz | Sí | ~27€ |
| Nooelec NESDR SMArt v4    | R820T2 | 2.4 MHz | 25 MHz - 1750 MHz | No | ~27€ |
| Nooelec NESDR SMArTee v2  | R820T2 | 2.4 MHz | 25 MHz - 1750 MHz | Sí | ~27€ |
| Nooelec NESDR SMArt XTR   | E4000  | 2.4 MHz | 65 MHz - 2300 MHz | No | ~40€ |
| Nooelec NESDR SMArTee XTR | E4000  | 2.4 MHz | 65 MHz - 2300 MHz | Sí | ~40€ |
| Nooelec NESDR Nano 3      | R820T2 | 2.4 MHz | 25 MHz - 1700 MHz | No | ~32€ |
| Airspy Mini               | R820T2 |  6 MHz | 24 MHz - 1700 MHz | Sí | ~140€ |
| Airspy R2                 | R820T2 |  10 MHz | 24 MHz - 1700 MHz | Sí | ~235€ |
| Airspy HF+ Discovery      |  -  | 610 kHz | 0.5 kHz - 31 MHz, 60 - 260 MHz | No | ~210€ |
| Airspy HF+ Dual Port      |  -  | 610 kHz | 9 kHz - 31 MHz, 60 - 260 MHz | No | ~240€ |
| SDRplay RSP1A             |  -  | 10 MHz | 1 kHz - 2000 MHz | Sí | ~115€ |
| SDRplay RSPdx             |  -  | 10 MHz | 1 kHz - 2000 MHz | Sí | ~228€ |
| SDRplay RSPduo            |  -  | 10 MHz | 1 kHz - 2000 MHz | Sí | ~290€ |


## RTL-SDR Blog V3

{% asset_img rtlsdrblog.jpg 500 "RTL-SDR Blog V3" %}

- **Ancho de banda:** Hasta 2.4 MHz.
- **ADC:** RTL2832U 8-bits.
- **Sintonizador:** R820T2.
- **Rango de frecuencias:** 500 kHz – 1766 MHz (500 kHz – 24 MHz en modo *Direct Sampling*).
- **Bias-Tee:** Sí, activación por software (4.5V 180mA).
- **Conector:** SMA hembra.
- Disponible en RTL-SDR.com y Astroradio.
- Más información: [Datasheet (PDF)](https://www.rtl-sdr.com/wp-content/uploads/2018/02/RTL-SDR-Blog-V3-Datasheet.pdf).


## Nooelec NESDR SMArt v4

{% asset_img smartv4.jpg 500 "Nooelec NESDR SMArt v4" %}

- **Ancho de banda:** Hasta 2.4 MHz.
- **ADC:** RTL2832U 8-bits.
- **Sintonizador:** R820T2.
- **Rango de frecuencias:** 25 MHz - 1750 MHz.
- **Bias-Tee:** No.
- **Conector:** SMA hembra.
- Disponible en nooelec.com y Amazon España.
- Más información: [Nooelec](https://www.nooelec.com/store/sdr/sdr-receivers/nesdr-smart-sdr.html).


## Nooelec NESDR SMArTee v2

{% asset_img smarteev2.jpg 500 "Nooelec NESDR SMArTee v2" %}

- **Ancho de banda:** Hasta 2.4 MHz.
- **ADC:** RTL2832U 8-bits.
- **Sintonizador:** R820T2.
- **Rango de frecuencias:** 25 MHz - 1750 MHz.
- **Bias-Tee:** Sí, siempre activo (4.5V 250mA).
- **Conector:** SMA hembra.
- Disponible en nooelec.com y Amazon España.
- Más información: [Nooelec](https://www.nooelec.com/store/sdr/sdr-receivers/nesdr-smartee-sdr.html).


## Nooelec NESDR SMArt XTR

{% asset_img smartxtr.jpg 450 "Nooelec NESDR SMArt XTR" %}

- **Ancho de banda:** Hasta 2.4 MHz.
- **ADC:** RTL2832U 8-bits.
- **Sintonizador:** E4000.
- **Rango de frecuencias:** 65 MHz - 2300 MHz. No recibe en un pequeño intervalo sobre los 1100 MHz.
- **Bias-Tee:** No.
- **Conector:** SMA hembra.
- Disponible en nooelec.com y Amazon España.
- Más información: [Nooelec](https://www.nooelec.com/store/sdr/sdr-receivers/nesdr-smart-xtr-sdr.html).


## Nooelec NESDR SMArTee XTR

{% asset_img smarteextr.jpg 500 "Nooelec NESDR SMArTee XTR" %}

- **Ancho de banda:** Hasta 2.4 MHz.
- **ADC:** RTL2832U 8-bits.
- **Sintonizador:** E4000.
- **Rango de frecuencias:** 65 MHz - 2300 MHz. No recibe en un pequeño intervalo sobre los 1100 MHz.
- **Bias-Tee:** Sí, siempre activo (3.3V 100mA).
- **Conector:** SMA hembra.
- Disponible en nooelec.com y Amazon España.
- Más información: [Nooelec](https://www.nooelec.com/store/sdr/sdr-receivers/nesdr-smartee-xtr-sdr.html).


## Nooelec NESDR Nano 3

{% asset_img nano3.jpg 200 "Nooelec NESDR Nano 3" %}

- **Ancho de banda:** Hasta 2.4 MHz.
- **ADC:** RTL2832U 8-bits.
- **Sintonizador:** R820T2.
- **Rango de frecuencias:** 25 MHz - 1750 MHz.
- **Bias-Tee:** No.
- **Conector:** MCX hembra. Incluye adaptador a SMA hembra.
- Disponible en nooelec.com y Amazon España.
- Más información: [Nooelec](https://www.nooelec.com/store/sdr/sdr-receivers/nesdr-nano-three.html).


## Airspy Mini

{% asset_img airspymini.jpg 400 "Airspy Mini" %}

- **Ancho de banda:** Hasta 6 MHz.
- **ADC:** 12-bit (16-bit en *Oversampling Mode*).
- **Sintonizador:** R820T2.
- **Rango de frecuencias:** 24 MHz - 1700 MHz.
- **Bias-Tee:** Sí, activación por software (4.5V).
- **Conector:** SMA hembra.
- Disponible en WiMo.
- Más información: [Airspy](https://airspy.com/airspy-mini/).


## Airspy R2

{% asset_img airspyr2.jpg 350 "Airspy R2" %}

- **Ancho de banda:** Hasta 10 MHz.
- **ADC:** 12-bit (16-bit en *Oversampling Mode*).
- **Sintonizador:** R820T2.
- **Rango de frecuencias:** 24 MHz - 1700 MHz.
- **Bias-Tee:** Sí, activación por software (4.5V).
- **Conector:** SMA hembra.
- Disponible en WiMo.
- Más información: [Airspy](https://airspy.com/airspy-r2/).


## Airspy HF+ Discovery

{% asset_img hfplusdiscovery.jpg 400 "Airspy HF+ Discovery" %}

- **Ancho de banda:** Hasta 610 kHz (660 kHz mediante ajuste).
- **ADC:** 18-bit DDC.
- **Rango de frecuencias:** 0.5 kHz - 31 MHz (HF) y 60 - 260 MHz (VHF).
- **Bias-Tee:** No.
- **Conector:** SMA hembra.
- Disponible en Astroradio y WiMo.
- Más información: [Airspy](https://airspy.com/airspy-hf-discovery).


## Airspy HF+ Dual Port

{% asset_img hfplusdual.jpg "Airspy HF+ Dual Port" %}

- **Ancho de banda:** Hasta 660 kHz.
- **ADC:** 18-bit DDC.
- **Rango de frecuencias:** 9 kHz - 31 MHz (HF) y 60 - 260 MHz (VHF).
- **Bias-Tee:** No.
- **Conector:** 2 x SMA hembra.
- Disponible en Astroradio y WiMo.
- Más información: [Airspy](https://airspy.com/airspy-hf-plus).


## SDRplay RSP1A

{% asset_img RSP1A.jpg 550 "SDRplay RSP1A" %}

- **Ancho de banda:** Hasta 10 MHz.
- **ADC:** 14-bit.
- **Rango de frecuencias:** 1 kHz - 2000 MHz.
- **Bias-Tee:** Sí, activación por software (4.7V 100mA).
- **Conector:** SMA hembra.
- Disponible en sdrplay.com y Astroradio.
- Más información: [Datasheet (PDF)](https://www.sdrplay.com/docs/RSP1Adatasheetv1.9.pdf), [Información técnica (PDF)](https://www.sdrplay.com/wp-content/uploads/2018/01/RSP1A-Technical-Information-R1P1.pdf).


## SDRplay RSPdx

{% asset_img RSPdx.jpg 500 "SDRplay RSPdx" %}

- **Ancho de banda:** Hasta 10 MHz.
- **ADC:** 14-bit.
- **Rango de frecuencias:** 1 kHz - 2000 MHz.
- **Bias-Tee:** Sí, activación por software (4.7V 100mA).
- **Conector:** 2 x SMA hembra, 1 x BNC (hasta 200 MHz). Seleccionables por software.
- Disponible en sdrplay.com y Astroradio.
- Más información: [Datasheet (PDF)](https://www.sdrplay.com/resources/RSPdxDatasheet.pdf).


## SDRplay RSPduo

{% asset_img RSPduo.jpg 550 "SDRplay RSPduo" %}

- **Ancho de banda:** Hasta 10 MHz (modo *single tuner*) o 2 fragmentos de hasta 2MHz (modo *dual tuner*).
- **ADC:** 14-bit.
- **Rango de frecuencias:** 1 kHz - 2000 MHz.
- **Bias-Tee:** Sí, activación por software (4.7V 100mA).
- **Conector:** 2 x SMA hembra, 1 x Conector alta impedancia (1kHz - 30MHz) . Seleccionables por software.
- Disponible en sdrplay.com y Astroradio.
- Más información: [Datasheet (PDF)](https://www.sdrplay.com/wp-content/uploads/2018/05/RSPduoDatasheetV0.6.pdf), [Información técnica (PDF)](https://www.sdrplay.com/wp-content/uploads/2018/06/RSPDuo-Technical-Information-R1P1.pdf).
