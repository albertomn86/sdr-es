---
title: Recepción de satélites meteorológicos Meteor-M
date: 2020-03-27 12:10:49
tags: [Windows, Satélites, Satélites meteorológicos, SDRSharp]
---

Tras varios años de desarrollo y pruebas, en 1969 se presentó en la antigua URSS la familia de satélites meteorológicos Meteor. Como muchos de los avances tecnológicos soviéticos de esa época, estos satélites tenían un doble propósito, siendo el principal el militar. Durante la Guerra Fría, la unión soviética necesitaba conocer las condiciones meteorológicas actualizadas en todo el mundo para la coordinación de sus bombarderos y flota naval. Tras la presión por parte de los militares, que veían que Estados Unidos creaba sus sistemas de predicción meteorológica vía satélite, la unión soviética decidió finalmente crear su propia red de satélites meteorológicos.

La serie Meteor-M fue planificada para la primera década del siglo XXI e incluiría tres nuevos satélites con dos diseños diferentes. El objetivo principal de los dos primeros satélites (Meteor-M N1 y Meteor-M N2) sería proveer de información meteorológica, así como la monitorización de la capa de ozono, los niveles de radiación en el espacio y la observación de los mares y la capa de hielo. El tercero (Meteor-M N3) incorporaría una antena radar de nueva generación para la observación oceánica.
Estos satélites transmiten imágenes en formato [LRPT](https://en.wikipedia.org/wiki/Low-rate_picture_transmission) en 137 MHz y en formato [HRPT](https://en.wikipedia.org/wiki/High-resolution_picture_transmission) en 1,7 GHz. En este articulo veremos como recibir la señal con nuestro dispositivo SDR y obtener las imágenes LRPT.

<!-- more -->

{% asset_img Meteor-M_2.jpg 600 "Meteor-M N2-1" %}

Más información sobre los satélites Meteor-M en [este enlace](http://www.russianspaceweb.com/meteor-m.html) (en inglés).


## Datos de los satélites

Tenemos en órbita tres satélites Meteor-M, pero actualmente solo uno de ellos emite imágenes en LRPT. El último satélite puesto en órbita sufrió a finales de 2019 el impacto de un micro-meteorito que le produjo daños y dejó el sistema de LRPT fuera de servicio. Solo consiguieron restablecer el sistema de HRPT. [Enlace a la publicación de Roscosmos.](https://www.roscosmos.ru/27891/)

| Satélite        | Meteor-M N1 | Meteor-M N2 | Meteor-M N2-2 |
|-----------------|-------------|-------------|---------------|
| **NORAD ID**    | 35865       | 40069       | 44387         |
| **COSPAR ID**   | 2009-049A   | 2014-037A   | 2019-038A     |
| **Masa de lanzamiento**  | 2.900 Kg | 2.900 Kg | 2.900 Kg |
| **Fecha de lanzamiento** | 17 de Septiembre de 2009 | 8 de Julio de 2014 | 5 de Julio de 2019 |
| **Señal LRPT**  | Inactivo    | 137,100 MHz | Averiado      |

Podemos conocer el estado actual de los satélites en la siguiente página: [Meteor Status (por Happysat)](http://happysat.nl/Meteor/html/Meteor_Status.html).


## Instalación de Meteor Demodulator

Vamos a instalar un *plugin* para SDR# que nos permitirá demodular la señal del satélite en tiempo real. Existen otras formas de demodular dicha señal mediante otro software utilizando la grabación de banda base, pero nos podemos ahorrar estos pasos usando el *plugin* **Meteor Demodulator**. Para instalarlo seguiremos los siguientes pasos:

1. Descargar el plugin desde el siguiente enlace:
    [<center>Meteor Demodulator v2.3</center>](http://rtl-sdr.ru/uploads/download/meteor.zip)

2. Extraemos el contenido del archivo ZIP descargado y copiamos los archivos _**SDRSharp.PluginsCom.dll**_ y _**SDRSharp.Meteor.dll**_ dentro del directorio de instalación de SDR#.

3. Insertamos la siguiente línea dentro del archivo _**Plugins.xml**_ que encontraremos dentro de la carpeta de SDR#.

    ``` XML
    <add key="Meteor" value="SDRSharp.Meteor.MeteorPlugin,SDRSharp.Meteor" />
    ```

4. Iniciamos SDR# y desplegamos el nuevo *plugin*.

    {% asset_img meteor_plugin.jpg "SDR#" %}

    Los ajustes que vamos a utilizar son:

    - **Modulation type**: aquí le indicamos el tipo de modulación de pendiendo del satélite. Este ajuste lo haremos de forma automática desde DDE Tracker.

    - **SymbolRate**: el satélite usa los modos 72K y 80K de forma aleatoria. Lo dejaremos en **Auto** para que lo detecte automático.

    - **Tracking**: lo marcamos para corregir el efecto *Doppler* en la señal.

    En *Output* marcamos la opción que vayamos a utilizar para sacar los datos (podemos marcar ambas). Las opciones que tenemos son:

    - **TCP Socket**: levanta un socket TCP al que el programa **LRPT Decoder** se conectará y recibirá los datos para decodificar la imagen en tiempo real.
    - **File**: genera un archivo con los datos para procesarlos posteriormente con **LRPT Decoder**. La ubicación de este archivo se la indicamos haciendo click en _**Configure**_ y _**Select folder**_.

    {% asset_img meteor_plugin_config.png "Meteor Demodulator" %}

## Instalación de LRPT Decoder

El programa LRPT Decoder nos va a permitir decodificar los datos obtenidos con el demodulador de Meteor y generar la imagen.
Para descargarlo hacemos click en el siguiente enlace y simplemente extraemos su contenido.

[<center>M2 LRPT Decoder V56</center>](http://happysat.nl/LRPT_Decoder_v56.zip)

Como vimos en el apartado anterior, LRPT Decoder es capaz de procesar los datos desde dos fuentes distintas, ya sea desde el socket TCP o desde un archivo. Dependiendo de la opción que elijamos debemos modificar el archivo de configuración _**M2_LRPT_Decoder.ini**_ de una forma u otra. A continuación veremos los ajustes para cada una de las opciones.

- Ajustes para decodificar mediante **socket**:

```
[IN]
source=TCP
mode=auto
sat=auto
host=localhost
port=2011

[OUT]
rgb=123.jpg
rgb_q=100
mono=yes
logs=no
APID70=no
VCDU=no
path=C:\SDR\MeteorM2\imágenes

[FAST]
FORMAT=jpg
R=1
G=2
B=3
```

- Ajustes para decodificar mediante **archivo**:

```
[IN]
source=man
sat=M2
mode=72k

[OUT]
rgb=123.jpg
rgb_q=100
mono=yes
logs=no
APID70=yes
VCDU=no
path=C:\SDR\MeteorM2\imágenes

[FAST]
FORMAT=jpg
R=1
G=2
B=3
```

## Recepción

Para recibir la señal debemos realizar los pasos habituales para el seguimiento de satélites que ya vimos en el artículo ["Ajuste de frecuencia en recepción de satélites"](https://sdr-es.com/2020/02/18/ajuste-frecuencia-doppler-orbitron/).

Los datos para DDETracker son los siguientes:

### Meteor-M N2

**AOS:**
    ```
    radio_Start
    radio_modulation_type<wfm>
    radio_center_frequency_Hz<137100000>
    radio_frequency_Hz<137100000>
    radio_bandwidth_Hz<100000>
    QPSK_demodulator_Start
    send_tracking_frequency_On
    start_programm_Path<C:\SDR\MeteorM2\Decoder\M2_LRPT_Decoder.exe>
    ```

En este ejemplo se ha usado la opción de enviar los datos por socket, por lo que en los ajustes anteriores se ha añadido el comando **start_programm_Path** para que se inice LRPT Decoder de forma automática cuando se inicie el seguimiento. Si optamos por la decodificación desde el archivo, este comando no es necesario.

Una vez configurado todo correctamente, en el instante en el que el satélite comience a verse por nuestra localización, comenzará el seguimiento automático.

{% asset_img sdr_sharp_preparado.jpg 900 "SDR#" %}

En el momento en que la señal sea detectada por el *plugin*, este comenzará a demodularla y a procesarla. Veremos que aparece _**Locked**_ en la interfaz.

{% asset_img sdr_sharp_inicio.jpg 900 "SDR#" %}
</br>
{% asset_img sdr_sharp_recibiendo.jpg 900 "SDR#" %}

Durante el pase podemos ver como LRPT Decoder genera la imagen si hemos optado por sacar los datos por el socket.

{% asset_img meteor_analizer.jpg 900 "LRPT Decoder" %}

Una vez termine el pase vamos a LRPT Decoder para generar la imagen final. El satélite tiene seis canales de los cuales utiliza tres de forma simultanea. Los tres primeros corresponden a espectro visible y los tres últimos al espectro infrarrojo. A veces podemos encontrar los tres canales del espectro visible o bien dos del visible uno del infrarrojo. La imagen final a color se puede componer uniendo los tres canales RGB del espectro visible, o bien con dos de ellos.

{% asset_img meteor_analizer_finalizado.jpg 900 "LRPT Decoder" %}

Para generarla seleccionamos los canales y hacemos click en **Generate RGB**. Nos aparecerá una ventana con la vista previa. Ahora hacemos click en **Save** y seleccionamos el formato de salida de la imagen que se guardará en la ruta que le hemos indicado en el archivo _**M2_LRPT_Decoder.ini**_.

{% asset_img meteor_analizer_guardar.jpg "LRPT Decoder" %}

## Corrección de la distorsión de la imagen

Si abrimos la imagen que hemos recibido veremos que presenta una distorsión en los laterales de la misma. Esta distorsión es posible corregirla de forma sencilla usando el software **Smooth Meteor** que podemos descargar desde el siguiente enlace:

[<center>Smooth Meteor v1.68</center>](https://leshamilton.co.uk/soft/smoothmeteor-setup.exe)

Una vez lo tengamos instalado, abrimos la imagen y le aplicamos las rectificaciones necesarias.

{% asset_img smooth_meteor.jpg "Smooth Meteor" %}
