---
title: Instalación de dispositivos RTL-SDR en macOS
date: 2020-06-14 10:32:42
tags: [RTL-SDR, macOS, CubicSDR, Instalación]
author: AlbertoMN
---


En este tutorial veremos como instalar nuestro dispositivo RTL-SDR en macOS. También veremos como instalar CubicSDR para poder usarlo.

<!-- more -->

## Instalación de los drivers

Para poder instalar los drivers necesitamos tener instalado previamente un gestor de paquetes. El más conocido y recomendado es **Homebrew**. Si no lo tenemos aún instalado podemos seguir los pasos descritos en su página web:

[<center>https://brew.sh/index_es</center>](https://brew.sh/index_es)

Si ya lo tenemos instalado, procedemos a instalar los drivers ejecutando el siguiente comando desde la consola.
```
brew install rtl-sdr
```

Con el dispositivo SDR conectado, ejecutamos el siguiente comando para comprobar que se ha instalado correctamente.
```
rtl_test
```

Si todo ha ido bien, tendremos una salida como la siguiente.
```
Found 1 device(s):
  0:  Realtek, RTL2838UHIDIR, SN: 02201602

Using device 0: Generic RTL2832U OEM
Found Rafael Micro R820T tuner
Supported gain values (29): 0.0 0.9 1.4 2.7 3.7 7.7 8.7 12.5 14.4 15.7 16.6 19.7 20.7 22.9 25.4 28.0 29.7 32.8 33.8 36.4 37.2 38.6 40.2 42.1 43.4 43.9 44.5 48.0 49.6
[R82XX] PLL not locked!
Sampling at 2048000 S/s.

Info: This tool will continuously read from the device, and report if
samples get lost. If you observe no further output, everything is fine.

Reading samples in async mode...
```

## Instalación de CubicSDR

[CubicSDR](https://cubicsdr.com/) es una aplicación multiplataforma para SDR que nos permite navegar por el espectro radioeléctrico de forma visual y demodular señales de forma sencilla.

Para descargar CubicSDR debemos ir a su repositorio en GitHub y descargar la última versión disponible para macOS. Para ello accedemos su repositorio a través del siguiente enlace y descargamos el instalador para macOS.

[<center>https://github.com/cjcliffe/CubicSDR/releases</center>](https://github.com/cjcliffe/CubicSDR/releases)

{% asset_img download_cubicsdr.png 700 "Descarga de CubicSDR" %}

Una vez descargado, lo ejecutamos y en la ventana que aparece arrastramos el binario a nuestro directorio de aplicaciones.

{% asset_img install_cubicsdr.png 700 "Instalación de CubicSDR" %}

Ahora ejecutamos CubicSDR desde las aplicaciones instaladas para iniciarlo. Nos mostrará una ventana como la siguiente en la que debemos seleccionar nuestro dispositivo SDR y hacemos click en _Start_.

{% asset_img cubicsdr_devices.png 700 "Configuración de CubicSDR" %}

Finalmente, CubicSDR se iniciará y ya podremos utilizarlo.

{% asset_img cubicsdr.png 900 "CubicSDR" %}

CubicSDR también nos permite sacar el audio demodulado para poder usarlo con otros programas. Podemos seguir los pasos descritos en el tutorial ["Instalación de cable de audio virtual"](/2020/01/21/instalacion-virtual-cable-audio/) para configurarlo.
