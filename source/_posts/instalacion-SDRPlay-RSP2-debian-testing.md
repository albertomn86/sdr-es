---
title: Instalación de SDRPlay RSP2 en Debian Testing
date: 2021-04-05 19:40:25
tags: [Linux, SDRPlay, Instalación]
author: EA4GRG
description: Notas para la instalación de SDRPlay RSP2 en Debian Testing.
---

Esto son solo notas tomadas al vuelo mientras he instalado y probado la versión citada del driver/API de SDRPlay RSP2 en Debian Testing x64. Han sido realizadas en una máquina con el SO recién instalado y los paquetes _Soapy_ mínimamente necesarios, aunque según el caso y la instalación pudieran ser necesarios otros más para cumplir dependencias.

<!-- more -->

Todos los paquetes Soapy para la mayoría de dispositivos SDR están incluidos en la distribución, a excepción de SDRPlay que hay que compilarlo según sus instrucciones. Previamente hay que instalar el paquete **libsoapysdr-dev**.
Si no se quiere, no es necesario instalar los módulos Soapy para el resto de dispositivos si no se van a usar.

Primeramente, hay que descargar y ejecutar el driver/API (la más actual en este momento es la API 3.07) desde la web de sdrplay.com (Linux x86, distribución Other).
Se descarga un archivo **.run** al que hay que darle permisos con el comando **chmod** y se ejecuta. No es necesario hacerlo con _sudo_ en un primer momento ya que tras la lectura y aprobación de la licencia, preguntará la contraseña si se da el caso.

Tras la instalación, indica que para iniciar o parar el servicio de SDRPlay se hace con los respectivos comandos:

```
sudo systemctl start sdrplay
sudo systemctl stop sdrplay
```

Es aconsejable aquí reiniciar el sistema para que dicho servicio arranque bien.

Después, hay que compilar el soporte de SoapySDR para SDRPlay (SoapySDRPlay). Para ello es necesario, como se ha comentado al principio, instalar el paquete **libsoapysdr-dev**. Además necesitaremos el paquete **cmake**.
A continuación, nos descargamos el zip con el código fuente desde [su repositorio en GitHub](https://github.com/pothosware/SoapySDRPlay3/archive/refs/heads/master.zip) (en mi caso he tenido problemas con "git clone" y similares ya que siempre pedía usuario y contraseña de GitHub y para esto no es necesario). Descomprimimos el paquete ZIP en un directorio y hacemos la siguiente secuencia de pasos:

```BASH
mkdir build
cd build
cmake ..
sudo make install
sudo ldconfig
```

Comprobar si la compilación e instalación nos ha fallado o no, ya que pudiera ser necesaria la instalación de algún paquete adicional.

Para comprobar que todo está bien, ejecutaremos los siguientes comandos:
```BASH
SoapySDRUtil -info # En los Available Factories nos debe aparecer, entre otros, SDRPlay.
SoapySDRUtil --probe="driver=sdrplay" # Para ver información más detallada del SDRPlay.
```

Por último, queda arrancar la aplicación SDR que pueda utilizar SoapySDR. Yo utilizo principalmente 2: CubicSDR y GQRX.
Para CubicSDR, observo últimamente que da problemas con el módulo para RFSpace al arrancar (yo no lo tengo, así que he desinstalado el paquete soapysdr0.7-module-rfspace). Si CubicSDR arranca bien, se deberá poder ver el dispositivo SDRPlay.

Para GQRX, igual. Al arrancarlo debería encontrar el SDRPlay sin mayores problemas.

Las aplicaciones de SDR que he probado son las que trae Debian Testing en sus repositorios que, a día de hoy son CubicSDR 0.2.5 y GQRX 2.14.4. También he probado el receptor DAB/DAB+ welle.io que viene en el repositorio.
