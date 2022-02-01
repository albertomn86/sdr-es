---
title: Seguimiento de satélites con Gpredict
date: 2021-12-23 13:50:15
tags: [Gpredict, Tracking, Satélites]
author: EA7KOO
description: En este artículo veremos cómo instalar y configurar Gpredict en Windows, Linux y macOS.
---

[Gpredict](http://gpredict.oz9aec.net/) es un programa para el seguimiento en tiempo real y predicción de órbitas para satélites. Este programa es muy similar a Orbitron, el cual ya vimos cómo instalar y configurar en el artículo ["Seguimiento de satélites con Orbitron"](/seguimiento-satelites-orbitron). Pero al contrario de este, Gpredict es multiplataforma, por lo que podremos usarlo en diferentes sistemas operativos.
En este artículo veremos cómo instalar y configurar Gpredict en Windows, Linux y macOS.

<!-- more -->

## Instalación

### Windows

Para instalar Gpredict en Windows bastará con descargar el archivo comprimido con los binarios desde cualquiera de los repositorios siguientes:

- [GitHub](https://github.com/csete/gpredict/releases/latest)
- [Sourceforge](https://sourceforge.net/projects/gpredict/)

Una vez descargado el archivo extraemos su contenido en la ubicación deseada y lo iniciamos desde el archivo ejecutable.


### Linux

En Linux podemos instalarlo desde consola usando el gestor de paquetes de nuestra distribución. Para Debian/Ubuntu usaremos el siguiente:

```
sudo apt install gpredict
```

Para iniciarlo podemos buscarlos en el listado de programas instalados o hacerlo desde una terminal.


### macOS

Para instalar Gpredict en macOS necesitamos un gestor de paquetes como por ejemplo [Homebrew](https://brew.sh/index_es). Si ya lo tenemos, bastaría con ejecutar el siguiente comando:

```zsh
brew install gpredict
```

Para iniciar Gpredict debemos usar una terminal:

```zsh
gpredict
```


{% asset_img Gpredict.jpg 800 "Gpredict" %}


## Configuración

Una vez tenemos Gpredict instalado e iniciado, seguimos los pasos enumerados a continuación para actualizarlo y configurarlo.

1. El primer paso es descargarnos los archivos TLE actualizados para poder realizar el cálculo de las órbitas correctamente. Es recomendable realizar esta actualización regularmente para tener siempre las correcciones lo más exactas posibles.
Para ello vamos a _"Edit"_ y seleccionamos _"Update TLE data from network"_. Esto inicia el proceso de descarga de los archivos TLE más recientes.

    {% asset_img Gpredict-update-tle.jpg 300 "Gpredict - Update TLE" %}


2. A continuación descargamos los datos de los transpondedores activos de cada satélite. Esto incorpora las frecuencias en las que emite cada satélite para que solo tengamos que seleccionarlas. Para descargarlos vamos a _"Edit"_ y hacemos clic en _"Update transponder data"_.

    {% asset_img Gpredict-update-tp.jpg 300 "Gpredict - Update transponder" %}


3. El siguiente paso es configurar nuestra posición. Para ello vamos a _"Edit"_ y hacemos clic en _"Preferences"_. Ahora se nos abre una nueva ventana en la que seleccionamos _"Ground Stations"_. Para añadir los datos de nuestra _ground station_ hacemos clic en _"Add new"_.

    {% asset_img Gpredict-config-qth.jpg 800 "Gpredict - Ground station" %}

    En la nueva ventana que aparece introducimos los datos de nuestra ubicación y guardamos haciendo clic en _"OK"_. Si no conocemos los datos, podemos buscar nuestra población haciendo clic en _"Select"_. Esto nos auto-completará todos los datos aunque no sean los más exactos.

    {% asset_img Gpredict-config-qth-new.jpg 800 "Gpredict - Ground station" %}

    Por último, eliminamos la _ground station_ que viene por defecto para dejar la nuestra marcada por defecto.

    {% asset_img Gpredict-config-qth-delete.jpg 800 "Gpredict - Ground station" %}


4. Ahora vamos a configurar la conexión con programas externos para que podamos realizar el tracking de forma automática en nuestro programa de SDR. Para ello vamos a _"Interfaces"_, _"Radios"_ y  hacemos clic en _"Add new"_.

    {% asset_img Gpredict-radios.jpg 800 "Gpredict - Radios" %}

    Introducimos el nombre que queramos y guardamos haciendo clic en _"Ok"_.

    {% asset_img Gpredict-radios-new.jpg 800 "Gpredict - Radios" %}


5. Para finalizar, vamos a seleccionar ahora que satélites vamos a seguir. Para ello hacemos clic en el botón indicado en la siguiente captura y después en _"Configure"_. En Linux el botón puede aparecer con un icono distinto.

    {% asset_img Gpredict-configure.jpg 300 "Gpredict - configurar" %}

    A continuación iremos buscando y añadiendo los satélites deseados a la lista.

    {% asset_img Gpredict-sats.jpg 800 "Gpredict - configurar satélites" %}


## Conectar con programas de SDR

Para realizar la correción en nuestros programas de SDR tenemos que conectar Gpredict a estos. Para ello necesitamos que nuestro programa tenga el servicio a la escucha para que Gpredict pueda enviarle la frecuencia que debe sintonizar en cada momento. En el siguiente punto veremos como habilitar este servicio en SDR# y SDR++. Si ya tenemos el programa preparado, abrimos el control de radio de Gpredict desde el icono indicado en la siguiente captura y hacemos clic en _"Radio Control"_.

{% asset_img Gpredict-radio-control.jpg 300 "Gpredict - Radio control" %}

Ahora seleccionamos el satélite y la frecuencia y hacemos clic en _"Track"_ para iniciar la corrección, y posteriormente seleccionamos la radio y hacemos clic en _"Engage"_ para conectar con el programa SDR.

{% asset_img Gpredict-radio-control-2.jpg 800 "Gpredict - Radio control" %}

Si todo ha ido bien, veremos que la frecuencia se va moviendo en programa para corregir el efecto _Doppler_ de la señal del satélite.


### SDR#

Para conectar Gpredict con SDR# vamos a usar el plugin **GpredictConnector** que podemos descargar desde el siguiente repositorio:

[<center>Releases GpredictConnector</center>](https://github.com/alexwahl/SDRSharp.GpredictConnector/releases/latest)

El proceso para instalarlo es el mismo que para cualquier otro plugin de SDR#. Creamos una carpeta dentro de _Plugins_ e introducimos el contenido del archivo descargado en su interior.
Una vez instalado iniciamos SDR# y abrimos el plugin.

{% asset_img GpredictConnector-disabled.png 300 "SDR# - GpredictConnector" %}

Ahora marcamos _enable_ para ponerlo a la escucha.

{% asset_img GpredictConnector-listening.png 300 "SDR# - GpredictConnector listening" %}

Cuando conectemos desde Gpredict veremos que aparece _connected_ y la frecuencia a la que debe sintonizar.

{% asset_img GpredictConnector-connected.png 300 "SDR# - GpredictConnector connected" %}


### SDR++

En el caso de SDR++ ya viene incluido un módulo para poder conectar Gpredict. Lo único que debemos hacer es hacer clic en _"Start"_ en el módulo **Rigctl Server** para ponerlo a la escucha.

{% asset_img sdrpp-listening.png 300 "SDR++ - Rigctl listening" %}

Una vez conectado veremos que aparece _Connected_.

{% asset_img sdrpp-connected.png 300 "SDR++ - Rigctl connected" %}
