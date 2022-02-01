---
title: Conceptos básicos
date: 2021-04-17 11:14:04
description: Terminología y breves conceptos básicos. SDR, Bias-T, filtros, LNA, TCXO, Up/Down converters.
tags: [SDR, Bias-T, filtros, LNA, TCXO, Up/Down converters]
---

# SDR

SDR son las siglas de _Software Defined Radio_. En español, radio definida por software.
Los dispositivos SDR  se diferencian de los dispositivos de radio convencionales en que parte de sus componentes están implementados por software. Componentes como filtros, moduladores, demoduladores que en los dispositivos de radio convencionales están implementados mediante electrónica, en un dispositivo SDR están implementados mediante software.

Un SDR está compuesto por un sintonizador con un oscilador de frecuencia variable, un amplificador, un mezclador y filtro que convierten la señal a frecuencia intermedia, y un conversor analógico digital que la procesa. Una vez tenemos la señal en forma digital, es cuando se usa la parte de software.

# Bias-T

BiasT es un circuito que permite suministrar corriente continua por el propio cable coaxial de la antena. Esto se hace principalmente para alimentar preamplificadores y otros dispositivos que requieren alimentación externa. De esta forma, si colocamos un preamplificador de antena para usarlo con nuestro SDR, y este es compatible para ser alimentado por Bias-T, no tendríamos que usar una alimentación externa para ello.
En algunos dispositivos SDR el Bias-T va siempre activado y en otros podemos activarlo y desactivarlo por software.

# Filtros

Sirven para filtrar determinadas frecuencias, es decir, para dejar pasar o bloquear la frecuencia o grupo de frecuencias que queramos. La principal característica de un filtro es su **frecuencia de corte**, que delimita las frecuencias que pasan y las que son bloqueadas.

Los filtros se pueden clasificar en tres tipos:

- **Filtros de paso alto:** dejan pasar las frecuencias desde la frecuencia de corte hacia arriba.
- **Filtros de paso bajo:** dejan pasar las frecuencias desde 0 hasta la frecuencia de corte.
- **Filtros de paso de banda:** dejan pasar solamente las frecuencias comprendidas entre una frecuencia de corte superior y otra inferior.

# LNA

LNA son las siglas de _Low Noise Amplifier_, amplificador de bajo ruido. Se utilizan para amplificar la señal antes de pasarla al SDR, de ahí que su nombre más adecuado sea el de preamplificador para diferenciarlo del amplificador interno del propio SDR.
Podemos encontrar distintos tipos de LNA, desde los de banda ancha que amplifican un gran rango de frecuencias a los que solo amplifican unas frecuencias determinadas.
Los LNA son dispositivos activos, por lo que necesitan alimentación externa. La mayoría de los que podemos encontrar se alimentan mediante Bias-T.

# TCXO

Son las siglas de, en español, oscilador de cristal compensado por temperatura.
Los osciladores varían su frecuencia dependiendo de la temperatura y lo que ocurre con algunos SDR que no llevan este tipo de oscilador, es que conforme se van calentando van variando su frecuencia. Con estos osciladores normalmente tenemos una variación mínima indicada por el propio fabricante. Esta variación se da en **PPM** (partes por millón) y normalmente la encontramos con valores comprendidos entre 0,1 y 1 para receptores de gama media/alta.


# Up/Down converters

Son unos dispositivos que se utilizan para variar la frecuencia de la señal que se recibe.
Si queremos recibir en HF y nuestro SDR no es capaz de hacerlo, podemos colocar un _Upconverter_ entre la antena y el SDR. De esta forma tendríamos la señal de entrada incrementada a un cierto rango que podríamos recibir sin problemas, ya que estaría dentro de las frecuencias que el SDR puede recibir.
El mismo caso sería para los _Downconverters_, pero en este caso para las frecuencias que están por encima y queremos reducir.
