---
title: Ajuste de frecuencia en recepción de satélites
date: 2020-02-18 12:45:55
tags: [Satélites, Orbitron]
author: EA7KOO
updated: 2021-08-25 21:20:24
excerpt: Cómo corregir la desviación de frecuencia en la recepción de satélites de forma automática con Orbitron y DDETracker.
---

Cuando realizamos seguimiento de satélites nos encontramos con que la frecuencia en la que deberíamos recibir una señal no se ajusta con la que estamos recibiendo y además cambia durante el pase. Esto se debe al conocido como **efecto Doppler**.

El efecto Doppler, llamado así por el físico austriaco Christian Andreas Doppler, es el cambio de frecuencia asociado a la alta velocidad que presenta el satélite con respecto a una estación terrestre.

Usando Orbitron y el plugin DDETracker podemos hacer que SDR# realice la correción y el ajuste de la frecuencia de recepción de forma automática y en tiempo real. De esta forma evitaremos el tener que ajustarla manualmente y tendremos siempre la señal correctamente centrada.

<!-- more -->

## Corrección automática de la frecuencia con Orbitron

En el post anterior ["Seguimiento de satélites con Orbitron"](/seguimiento-satelites-orbitron/) vimos como instalar y configurar este programa para realizar el seguimiento de satélites. Este programa también nos va a permitir corregir en tiempo real la frecuencia del satélite que estemos siguiendo, y además podremos enviar esta frecuencia a SDR# para que la ajuste de manera automática. De esta forma no tendremos que preocuparnos por ajustarla manualmente y tendremos siempre la señal perfectamente sintonizada.


El primer paso es indicarle a Orbitron la frecuencia del satélite para que pueda llevar a cabo el ajuste. Para ello seleccionamos el satélite para marcarlo como activo y vamos a la pestaña _Sat/Orbit info_.

Hacemos doble clic en el cuadro de texto de la derecha para que nos cargue la plantilla por defecto.

{% asset_img orbitron-plantilla.jpg "Orbitron" %}

Ahora introducimos la frecuencia en MHz en la etiqueta **DNLINK**.

{% asset_img orbitron-dnlink.jpg "Introducir frecuencia en Orbitron" %}

Los demás datos son opcionales, pero podemos completarlos para tener más información sobre el satélite.


## Instalación de DDETracker

El siguiente paso es instalar un plugin en SDR# que nos permita cambiar la frecuencia de forma automática.
En este ejemplo vamos a usar el plugin **DDETracker** que podemos descargar desde el siguiente link:

[<center>Descargar DDE Tracker</center>](http://rtl-sdr.ru/uploads/download/ddetracker.zip)

Una vez descargado el archivo seguimos los siguientes pasos:

1. Vamos a la carpeta de instalación de SDR# y dentro de la carpeta **Plugins** creamos una nueva de nombre **DDETracker**.

2. Abrimos el archivo descargado y extraemos los archivos que se muestran en la siguiente captura dentro de la carpeta que hemos creado en el paso anterior.

    {% asset_img dde-archivos.jpg "Archivos de DDETracker" %}


3. Añadimos las siguientes líneas al archivo de configuración de Orbitron _**Setup.cfg**_, que encontramos dentro de la carpeta _Config_ en el directorio de instalación de Orbitron.
    Debemos indicar la ruta completa en la que hemos colocado el archivo _SDRSharpDriverDDE.exe_ en el paso anterior.

    ```
    [Drivers]
    SDRSharp=C:\SDR\SDRSharp\Plugins\DDETracker\SDRSharpDriverDDE.exe
    ```
    </br>
    {% asset_img orbitron-config.jpg "Orbitron" %}

    Por último, reiniciamos Orbitron para aplicar los cambios.


Ahora que tenemos el plugin instalado, iniciamos SDR# y abrimos el plugin desde el menú.

{% asset_img sdrsharp-menu.jpg "SDR# menú" %}

Lo activamos haciendo clic en _Scheduler_.

{% asset_img dde-plugin.jpg "DDETracker" %}


## Conexión con DDETracker

Ahora ya podemos decirle a Orbitron que mande los datos a SDR#. Para ello vamos a Orbitron y seleccionamos en Driver _"SDRSharp"_ y hacemos clic en el botón de conexión:

{% asset_img orbitron-driver.jpg "Orbitron" %}

Ahora ya podemos ver que DDETracker recibe los datos del satélite que tenemos activo en Orbitron.

{% asset_img dde-active.jpg "DDETracker activo" %}


## Configurar satélites en DDETracker

Para que el plugin pueda iniciar el seguimiento, debemos indicarle algunos datos sobre el satélite en cuestión.
Para introducir los datos, hacemos clic en sobre el botón **Config** que aparece en el plugin y se abrirá una ventana para introducir los datos.

{% asset_img dde-config.jpg "DDETracker config" %}


Hacemos clic en _"Add new satellite"_ para crear un nuevo satélite.
Lo primero es introducir el nombre. Este nombre debe coincidir exactamente con el nombre del satélite que aparece en el plugin.
Si el nombre es muy largo o contiene caracteres especiales, podremos usar el asterisco (*) para omitir ciertas partes.

Como podemos ver en la ventana tenemos dos bloques para introducir las acciones que SDR# debe realizar. En el bloque **AOS** (Acquisition of Signal) le diremos qué debe hacer cuando el satélite comience a verse sobre el horizonte en nuestra posición y en el bloque inferior **LOS** (Loss Of Signal) le indicamos que hará cuando termine el pase.

Estas acciones podemos escribirlas manualmente o seleccionarlas de la columna de la derecha e ir insertando con el botón "**<<**" dónde corresponda.

En el caso de nuestro ejemplo haremos las siguientes acciones:

**AOS:**
    ```
    radio_Start
    radio_modulation_type<USB>
    radio_bandwidth_Hz<4800>
    radio_center_frequency_Hz<145935000>
    radio_tracking_frequency_On
    ```

**LOS:**
    ```
    radio_tracking_frequency_Off
    radio_Stop
    ```

</br>
{% asset_img dde-configured.jpg "DDETracker FUNCUBE" %}

Con esto ya tendríamos los datos del satélite introducidos. Ahora cuando el satélite se acerque a nuestra posición, SDR# se iniciará para recibir la señal de forma automática y se detendrá cuando el satélite desaparezca por el horizonte.

{% asset_img sdr-sharp.jpg "DDETracker activo" %}
