---
title: Instalación de estación terrestre con SatNOGS
date: 2020-04-24 16:34:55
tags: [SatNOGS, Raspberry Pi, Satélites, Instalación]
author: EA7KOO
---

[SatNOGS](https://satnogs.org/) (Satellite Networked Open Ground Station) es una plataforma de software y hardware de código abierto con el propósito de crear una red global de estaciones terrestres de seguimiento de satélites.

En este artículo veremos como instalar una estación terrestre para el seguimiento de satélites de forma desatendida. Para ello vamos a utilizar un dispositivo SDR y una Raspberry Pi con el software SatNOGS.

<!-- more -->

## Registrar nuestra estación en la red

El primer paso será registrarnos en la red de SatNOGS para obtener nuestro identificador de estación y la _API key_.
Para ello vamos a la web de SatNOGS mediante el siguiente enlace:

[<center>https://network.satnogs.org/</center>](https://network.satnogs.org/)

Aquí podemos ver las estaciones conectadas a la red, a las que podemos acceder para programar y revisar pases.

Para registrarnos, hacemos clic en _Sign Up / Log In_.

{% asset_img satnogs_inicio.png 900 "SatNOGS" %}

A continuación introducimos nuestro correo electrónico, nombre de usuario y una contraseña. Hacemos clic en _SIGN UP_.

{% asset_img satnogs_registro.png "SatNOGS Sign Up" %}

Una vez registrados, vamos a crear una nueva estación. Para ello hacemos clic en _Add Ground Station_.

{% asset_img satnogs_registrado.png 900 "Nueva estación SatNOGS" %}

Ahora introducimos los datos requeridos de nuestra estación.

{% asset_img satnogs_crear_groundstation.png 900 "Datos estación SatNOGS" %}

Cuando los tengamos correctamente introducidos, hacemos clic en **_Submit_** para enviar los datos y registrar nuestra nueva estación.
Una vez registrada se nos mostrará una nueva página con los datos de la misma. Podemos ver que delante del nombre se nos ha asignado un identificador de estación (en este ejemplo el 1516) que debemos anotar para sucesivos pasos.

Ahora vamos al panel de control (_dashboard_) haciendo clic en el icono de la esquina superior derecha.

{% asset_img satnogs_groundstation_creada.png 900 "SatNOGS" %}

Hacemos clic en _API Key_ y copiamos nuestro token.

{% asset_img satnogs_api_key.png 900 "SatNOGS API Key" %}


## Descargar imagen de SatNOGS para Raspberry Pi

Vamos ahora a preparar la Raspberry Pi. Para ello vamos a instalar la imagen que hay creada del cliente de SatNOGS y que podemos descargar desde la siguiente página:

[<center>https://gitlab.com/librespacefoundation/satnogs/satnogs-pi-gen/-/tags</center>](https://gitlab.com/librespacefoundation/satnogs/satnogs-pi-gen/-/tags)

Aquí descargamos la última versión disponible.

{% asset_img descarga_imagen.png 900 "Descarga imagen SatNOGS" %}

Una vez descargado el archivo, extraemos la imagen y la grabamos en la tarjeta SD con el programa que tengamos para ello. En este ejemplo se ha usado [Win32 Disk Imager](https://sourceforge.net/projects/win32diskimager/).

{% asset_img grabar_imagen.png "Win32 Disk Imager" %}


## Configuración de Raspberry Pi

Ahora vamos a configurar algunos aspectos esenciales en nuestra Raspberry Pi.

Una vez que tengamos la Raspberry Pi iniciada, accedemos a ella mediante SSH (usuario **"pi"** y clave **"raspberry"**) y ejecutamos el siguiente comando:

```
sudo raspi-config
```

Se nos muestra en pantalla el menú de la herramienta de configuración de la Raspberry Pi.

{% asset_img raspi-config.png "Configuración de Raspberry Pi" %}

Los ajustes básicos que debemos llevar a cabo son:

- Cambiar la clave por defecto.
- Configurar la zona horaria a UTC. En _Localisation Options_, _Change Timezone_, _None of the above_, _UTC_.
- Expandir el sistema de archivos. En _Advanced Options_, primera opción:

{% asset_img raspi-config_advanced.png "Configuración de Raspberry Pi" %}

Por último, reiniciamos la Raspberry Pi para que se apliquen los cambios.


## Configuración de SatNOGS

Turno ahora de configurar el cliente SatNOGS. Para ello ejecutamos el siguiente comando:

```
sudo satnogs-setup
```

Se mostrará el menú principal de opciones:

{% asset_img satnogs-setup.png "SatNOGS Setup" %}

Lo primero es actualizar la propia herramienta de configuración desde _Update configuration tool_.
Esta operación tardará unos minutos y nos pedirá confirmación para descargar algunos paquetes. Al finalizar nos mostrará la siguiente ventana para indicar que servicios queremos reiniciar. Debemos darle a _Ok_.

{% asset_img satnogs-setup_restart.png "SatNOGS Setup" %}

Volvemos ahora al menú principal y vamos a **_Basic configuration options_**. Aquí vamos a introducir los datos de nuestra estación:

| Ajuste | Descripción |
| --- | --- |
| SATNOGS_API_TOKEN | API key obtenida anteriormente. |
| SATNOGS_SOAPY_RX_DEVICE | Dispositivo SDR que vamos a usar.<br>Para el RTL-SDR introducimos `driver=rtlsdr`.<br>Para otros dispositivos consultar en https://github.com/pothosware/SoapyRTLSDR/wiki (apartado _Modules_). |
| SATNOGS_ANTENNA | Para el RTL-SDR introducimos `RX`.<br>Para otros dispositivos debemos consultar el valor usando el comando `SoapySDRUtil --probe 2>&1 \| grep Antennas`.|
| SATNOGS_RX_SAMP_RATE | _Sample rate_ del dispositivo.<br>Para el RTL-SDR introducimos `2.048e6`. |
| SATNOGS_STATION_ELEV | Altitud de nuestra estación. |
| SATNOGS_STATION_ID | Identificador de nuestra estación obtenido anteriormente. |
| SATNOGS_STATION_LAT | Latitud de nuestra estación. |
| SATNOGS_STATION_LON | Longitud de nuestra estación. |

{% asset_img satnogs-setup_basic.png "SatNOGS Setup" %}

Volvemos al menú principal y vamos ahora a **_Advanced_** y **_Radio Settings_**. Aquí vamos a introducir los siguientes ajustes:

| Ajuste | Descripción |
| --- | --- |
| SATNOGS_PPM_ERROR | Valor de correción de frecuencia del dispositivo. |
| SATNOGS_RF_GAIN | Ganancia del dispositivo. Para el RTL-SDR introducimos cualquier valor de ganancia soportado: `0.0 0.9 1.4 2.7 3.7 7.7 8.7 12.5 14.4 15.7 16.6 19.7 20.7 22.9 25.4 28.0 29.7 32.8 33.8 36.4 37.2 38.6 40.2 42.1 43.4 43.9 44.5 48.0 49.6` |

{% asset_img satnogs-setup_advanced_radio.png "SatNOGS Setup" %}

Volvemos al menú principal y le damos a **_Apply_** para que se apliquen los ajustes. Cuando se termine de configurar podemos comprobar si se ha iniciado correctamente con:

```
systemctl status satnogs-client
```

Si todo ha ido bien tendremos la siguiente salida:

```
● satnogs-client.service - SatNOGS client
   Loaded: loaded (/etc/systemd/system/satnogs-client.service; enabled; vendor preset: enabled)
   Active: active (running) since Fri 2020-04-23 19:33:57 UTC; 26min ago
 Main PID: 27871 (satnogs-client)
    Tasks: 22 (limit: 2200)
   Memory: 55.7M
   CGroup: /system.slice/satnogs-client.service
           └─27871 /var/lib/satnogs/bin/python3 /var/lib/satnogs/bin/satnogs-client
```

## Programar seguimientos en SatNOGS

Con nuestra Raspberry Pi finalmente configurada, es el momento de comprobar que todo funciona correctamente y podemos realizar el seguimiento de satélites.

Para programar un pase debemos hacerlo desde el panel de control de SatNOGS. Nuestra Raspberry Pi se comunicará con la red de SatNOGS, realizará los seguimientos que le indiquemos y subirá los datos a la misma.

Tenemos dos formas de programar un seguimiento. La primera de ellas es calculando todos los pases de todos los satélites que pasarán por nuestra estación en las siguientes horas. Para ello vamos a nuestro panel de control, hacemos clic en nuestra estación y le damos a **_Calculate Future Passes_**.

{% asset_img satnogs_nuevo_pase.png "SatNOGS Nuevo pase" %}

Aparecen ahora los siguientes pases. Seleccionamos el deseado haciendo clic en **_schedule_**.

{% asset_img satnogs_nuevo_pase_2.png "SatNOGS Nuevo pase" %}

Comprobamos los datos de la observación y hacemos clic en **_Schedule_**.

{% asset_img satnogs_nuevo_pase_3.png "SatNOGS Nuevo pase" %}

La segunda forma de programar un pase es desde el panel del control. Aquí hacemos clic en **_New Observation_**.

{% asset_img satnogs_nuevo_pase_sat.png "SatNOGS Nuevo pase" %}

Seleccionamos el satélite que queremos seguir e indicamos un intervalos de tiempo. Después hacemos clic en **_Calculate_** para calcular los pases. Por último seleccionamos el pase que nos interese y hacemos clic en **_Schedule_**.

{% asset_img satnogs_nuevo_pase_sat_2.png "SatNOGS Nuevo pase" %}

Cuando se completen los pases que hemos programado, podemos ver el _"waterfall"_ del pase, el audio y los datos o imágenes obtenidas.


## Utilización de LNA

Incorporar un LNA a nuestra estación nos ayudará a mejorar la recepción de los satélites. Si disponemos de un LNA con alimentación mediante Bias-T y utilizamos un dispositivo SDR como el RTL-SDR V3, tendremos que activar la alimentación del mismo.

A continuación veremos como hacer que SatNOGS active de forma automática el Bias-T de nuestro RTL-SDR cuando vaya a recibir un pase y lo desactive al finalizar.

Necesitamos instalar la utilidad `rtl_biast` que será la encargada de activar y desactivar el Bias-T del dispositivo SDR. Para ello accedemos por SSH a la Raspberry Pi y realizamos los siguientes pasos:

1. Descargar el código fuente.

```
git clone https://github.com/rtlsdrblog/rtl_biast.git
```

2. Instalar las dependencias necesarias para compilar.

```
sudo apt install cmake libusb-1.0-0-dev
```

3. Accedemos a la carpeta descargada.

```
cd rtl_biast
```

4. Generamos el _makefile_.

```
cmake .
```

5. Compilamos.

```
make
```

6. Copiamos el binario compilado a `/usr/bin`.

```
sudo cp src/rtl_biast /usr/bin
```

Por último, nos aseguramos de que funciona correctamente ejecutando:

```
rtl_biast
```

Debemos obtener una salida como la siguiente:

```
Found 1 device(s):
  0:  Realtek, RTL2838UHIDIR, SN: 08201703

Using device 0: Generic RTL2832U OEM
Found Rafael Micro R820T tuner
```

Ahora vamos a configurar el cliente SatNOGS para que active y desactive el Bias-T de forma automática.

Accedemos al menú de configuración mediante:

```
sudo satnogs-setup
```

Vamos a **_Advanced_** y **_Pre/post observation scripts_** y establecemos los siguientes ajustes:

| Ajuste | Valor |
| --- | --- |
| SATNOGS_PRE_OBSERVATION_SCRIPT | `/usr/bin/rtl_biast -b 1` |
| SATNOGS_POST_OBSERVATION_SCRIPT | `/usr/bin/rtl_biast -b 0` |

Para finalizar volvemos al menú principal y le damos a **_Apply_** para que se apliquen los ajustes.
