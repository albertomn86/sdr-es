---
title: Recepción de mensajes ADS-B en Raspberry Pi
date: 2020-05-03 10:56:04
tags: [RTL-SDR, ADS-B, Raspberry Pi, dump1090]
author: AlbertoMN
---

ADS-B (_Automatic Dependent Surveillance Broadcast_) es una tecnología de control en la que un avión determina su posición a través de la navegación por satélite y la emite periódicamente, lo que permite realizar su seguimiento.

En este artículo veremos como convertir una Raspberry Pi en un receptor de mensajes ADS-B y poder determinar y visualizar la posición de las aeronaves que sobrevuelan nuestra ubicación.

<!-- more -->

Lo primero que haremos será instalar nuestro dispositivo SDR, si todavía no lo hemos hecho, siguiendo los pasos descritos en ["Instalación de dispositivos RTL-SDR en Raspberry Pi"](https://sdr-es.com/2020/04/10/instalacion-rtlsdr-raspberrypi/).

### Instalación de dump1090

Vamos a instalar la versión de _dump1090_ mantenida por FlightAware, ya que está actualizada y nos instala y levanta un servidor web en el que podemos ver las aeronaves sobre el mapa sin muchas complicaciones.

El primer paso es instalar el repositorio de FlightAware en nuestra Raspberry Pi dependiendo de la versión de Raspbian que tengamos. También podemos generar paquetes para otras distribuciones siguiendo los pasos descritos [aquí](https://github.com/flightaware/dump1090).

Si no conocemos la versión de Raspbian, podemos consultarla ejecutando:

```
cat /etc/os-release | grep VERSION_CODENAME
```

- Repositorio para **Raspbian Buster**:
```
wget https://flightaware.com/adsb/piaware/files/packages/pool/piaware/p/piaware-support/piaware-repository_3.8.1_all.deb
```
```
sudo dpkg -i piaware-repository_3.8.1_all.deb
```

- Repositorio para **Raspbian Stretch**:
```
wget https://flightaware.com/adsb/piaware/files/packages/pool/piaware/p/piaware-support/piaware-repository_3.8.1~bpo9+1_all.deb
```
```
sudo dpkg -i piaware-repository_3.8.1~bpo9+1_all.deb
```

Una vez instalado el repositorio correspondiente ejecutamos:
```
sudo apt update
```

Ahora instalamos _dump1090_:
```
sudo apt install -y dump1090-fa
```

Podemos ajustar las opciones de _dump1090_ en su archivo de configuración:
```
sudo nano /etc/default/dump1090-fa
```

Editamos la siguiente línea con la ganancia y valor de PPM. Es aconsejable establecer un valor para la ganancia, ya que por defecto el nivel viene establecido en automático (-10) y no siempre proporciona buenos resultados.
Si tenemos más de un dispositivo SDR conectado introducimos su número de serie en _device-index_.

```
RECEIVER_OPTIONS="--device-index 0 --gain -10 --ppm 0"
```

Reiniciamos el servicio para que se apliquen los cambios.
```
sudo service dump1090-fa restart
```

Por último, accedemos a nuestra Raspberry Pi desde cualquier navegador web:
```
http://IP_RASPBERRY:8080/
```

{% asset_img dump1090.jpg 900 "dump1090 FlightAware" %}

Esta interfaz web utiliza el puerto 8080 por defecto. Si queremos cambiarlo editamos el archivo de configuración de _Lighttpd_:
```
sudo nano /etc/lighttpd/conf-enabled/89-dump1090-fa.conf
```

Editamos la siguiente línea y modificamos el puerto 8080 por el que queramos utilizar:
```
$SERVER["socket"] == ":8080" {
```

Por último reiniciamos el servicio para que se apliquen los cambios:
```
sudo service lighttpd restart
```


### Enviar datos a FlightAware

[FlightAware](https://flightaware.com/) es una compañía con sede en Houston (TX, Estados Unidos) que ofrece servicios de software y datos para aviación. Esta compañía ofrece información de seguimiento de aeronaves de forma gratuita desde su página web y sus aplicaciones para móviles. Es actualmente la mayor plataforma de seguimiento de vuelos.

Podemos reenviar los datos de seguimiento a FlightAware desde nuestra Raspberry Pi. Estos serán utilizados para el seguimiento a nivel global y a cambio recibiremos una suscripción _[Enterprise](https://flightaware.com/commercial/premium/)_.

Los pasos para enviar los datos son los siguientes:

1. Lo primero será registrarnos en FlightAware:

[<center>https://es.flightaware.com/account/join</center>](https://es.flightaware.com/account/join)


2. Instalamos _piaware_. Este software será el encargado de establecer la comunicación con el servidor de FlightAware para enviar los datos y recibir ajustes.
```
sudo apt install -y piaware
```

3. Podemos ajustar _piaware_ para que se actualice de forma automática y para que podamos actualizarlo desde la interfaz web de FlightAware.
Si queremos que se actualice automático ejecutamos:
```
sudo piaware-config allow-auto-updates yes
```
Si queremos que se pueda hacer de forma manual vía web ejecutamos:
```
sudo piaware-config allow-manual-updates yes
```

4. Reiniciamos el servicio para que se apliquen los ajustes.
```
sudo service piaware restart
```

5. Accedemos a la siguiente dirección para vincular nuestra Raspberry Pi con la cuenta que acabamos de crear. Si accedemos desde la misma dirección IP que tiene la Raspberry Pi, la detectará de forma automática.

[<center>https://flightaware.com/adsb/piaware/claim</center>](https://flightaware.com/adsb/piaware/claim)

6. Vamos a nuestro panel de control y abrimos las opciones de configuración.

{% asset_img flightaware-panel.png 900 "FlightAware" %}

7. Por último, introducimos nuestros datos de latitud, longitud y altitud para poder usar el seguimiento con MLAT y reiniciamos el servicio desde la propia web pulsando el botón _Send_.

{% asset_img flightaware-config.jpg "FlightAware" %}


### Enviar datos a AirNav RadarBox

[RadarBox](https://www.radarbox.com/) es una compañía con sede en Tampa (FL, Estados Unidos) que ofrece servicios de información de vuelos. Podemos compartir los datos que recibimos en nuestra Raspberry Pi con RadarBox y a cambio obtendremos una suscripción _[Business](https://www.radarbox.com/subscribe)_.

Las pasos que seguiremos son los siguientes:

1. Instalamos _rbfeeder_. Será el programa que envíe los datos al servidor.
```
sudo bash -c "$(wget -O - http://apt.rb24.com/inst_rbfeeder.sh)"
```
Cuando pregunte si queremos instalar `dump978-rb` le decimos que no.

2. Instalamos el cliente de MLAT. La siguiente versión es para Raspbian. Si necesitamos paquete para otra versión, podemos generarlo siguiendo los pasos descritos [aquí](https://github.com/mutability/mlat-client).
```
wget https://sdr-es.com/2020/05/03/seguimiento-aviones-raspberry-pi/mlat-client_0.2.11_armhf.deb
```
```
sudo dpkg -i mlat-client_0.2.11_armhf.deb
```

3. Nos registramos en RadarBox.

[<center>https://www.radarbox.com/register</center>](https://www.radarbox.com/register)

4. Una vez registrados necesitamos vincular nuestro receptor con RadarBox. Para ello usaremos la clave que nos genera _rbfeeder_ la primera vez que se conecta al servidor. Consultamos la clave con el comando:
```
sudo rbfeeder --showkey --no-start
```

5. Accedemos a esta dirección, introducimos nuestra clave en _Sharing Key_ y pulsamos en **CLAIM!**.

[<center>https://www.radarbox.com/raspberry-pi/claim</center>](https://www.radarbox.com/raspberry-pi/claim)

{% asset_img radarbox-claim.jpg 900 "RadarBox" %}


6. Por último introducimos nuestras coordenadas cuando nos lo pida.


### Enviar datos a ADS-B Exchange

[ADS-B Exchange](https://www.adsbexchange.com/) es un servicio colaborativo de datos de seguimiento y es la mayor fuente de datos de vuelos **sin filtrar**. En este caso no obtendremos beneficios como suscripciones, ya que este servicio ofrece todos los datos de forma **gratuita para fines no comerciales**.

Para enviar nuestros datos a ADS-B Exchange tendremos que ejecutar un script de instalación que realizará el proceso de forma sencilla. Para ello ejecutamos el siguiente comando:
```
sudo bash -c "$(wget -nv -O - https://raw.githubusercontent.com/adsbxchange/adsb-exchange/master/install.sh)"
```

Se iniciará un asistente instalación en el que debemos indicar un nombre para nuestro _feeder_ y nuestra posición para los cálculos de MLAT.

{% asset_img adsb-script.png "Asistente instalación ADS-B Exchange" %}

Una vez finalice el asistente, ya estaremos conectados y enviando datos a ADS-B Exchange. Para conocer el estado del servicio tenemos los siguientes enlaces:

- Comprobar el estado de nuestro _feeder_: https://adsbexchange.com/myip/
- Comprobar el estado de los servidores de MLAT: http://adsbx.org/sync

Opcionalmente, podemos instalar la herramienta proporcionada por ADS-B Exchange para ver online los datos que estamos enviando desde nuestro receptor en tiempo real. Para instalarla basta con ejecutar el siguiente comando:
```
sudo bash -c "$(wget -nv -O - https://raw.githubusercontent.com/adsbxchange/adsbexchange-stats/master/stats.sh)"
```

Una vez instalada, ejecutamos el siguiente comando para obtener nuestra URL personalizada en la que consultar los datos:
```
adsbexchange-showurl
```

Obtendremos una URL que debemos copiar e introducir en el navegador web. Una vez accedemos, tendremos dos enlaces que nos llevarán a una página con los datos de las aeronaves que estamos recibiendo en nuestra estación y a un visor con el mapa en tiempo real. Podemos consultar el funcionamiento de las distintas opciones del visor en [este enlace](https://www.adsbexchange.com/map-help/).

{% asset_img adsb-exchange.jpg 900 "ADS-B Exchange" %}


### Enviar datos a Flightradar24

[Flightradar24](https://www.flightradar24.com/) es una compañía europea con sede en Estocolmo (Suecia) que ofrece servicios de información de vuelos. Compartiendo nuestros datos con Flightradar24 obtendremos una suscripción _[Business](https://www.flightradar24.com/premium)_.

Lo primero sera registrarse en Flightradar24.

[<center>https://www.flightradar24.com/premium/signup</center>](https://www.flightradar24.com/premium/signup)


Para enviar los datos debemos descargar e instalar _fr24feed_. Para ello ejecutamos el siguiente comando y seguimos los pasos del asistente de instalación.
```
sudo bash -c "$(wget -O - https://repo-feed.flightradar24.com/install_fr24_rpi.sh)"
```

1. Introducir el correo electrónico con el que nos hemos registrado.
```
Step 1.1 - Enter your email address (username@domain.tld)
```

2. Si tenemos ya una clave previa la introducimos. En caso contrario lo dejamos en blanco.
```
Step 1.2 - If you used to feed FR24 with ADS-B data before, enter your sharing key.
If you don't remember your sharing key, you can find it in your account on the website under "My data sharing".
https://www.flightradar24.com/account/data-sharing

Otherwise leave this field empty and continue.
```

3. Introducimos `yes` para activar MLAT.
```
Step 1.3 - Would you like to participate in MLAT calculations? (yes/no)$:yes
```

4. Introducimos nuestras coordenadas y altitud.
```
IMPORTANT: For MLAT calculations the antenna's location should be entered very precise!

Step 3.A - Enter antenna's latitude (DD.DDDD)

Step 3.B - Enter antenna's longitude (DDD.DDDD)

Step 3.C - Enter antenna's altitude above the sea level (in feet)

Using latitude: 37.XXXX, longitude: -3.XXXX, altitude: 720ft above sea level

Validating email/location information...OK

The closest airport found is ICAO:LEGR IATA:GRX near Granada.

Latitude: 37.188728
Longitude: -3.777350
Country: Spain

Flightradar24 may, if needed, use your email address to contact you regarding your data feed.

Would you like to continue using these settings?

Enter your choice (yes/no)$:yes
```

5. Introducimos `yes` para que usar la configuración automática y que utilice la instancia de _dump1090_ que ya tenemos instalada.
```
We have detected that you already have a dump1090 instance running. We can therefore automatically configure the FR24 feeder to use existing receiver configuration, or you can manually configure all the parameters.

Would you like to use autoconfig (*yes*/no)$:yes
```

6. Activamos el log si queremos. No es necesario.
```
Step 6 - Please select desired logfile mode:
 0 -  Disabled
 1 -  48 hour, 24h rotation
 2 -  72 hour, 24h rotation
Select logfile mode (0-2)$:0
```

7. Por último, reiniciamos el servicio.
```
sudo systemctl restart fr24feed
```
