---
title: Instalación de estación terrestre con SatNOGS (II)
date: 2020-04-27 16:34:55
tags: [SatNOGS, RTL-SDR, Linux, Raspberry Pi, Satélites]
author: AlbertoMN
---

En el artículo anterior ["Instalación de estación terrestre con SatNOGS"](https://sdr-es.com/2020/04/24/instalacion-satnogs/) vimos como crear una estación terrestre para el seguimiento de satélites usando una Raspberry Pi, y para ello utilizamos la imagen ya generada para el cliente de SatNOGS.
En este artículo veremos como realizar la instalación del cliente SatNOGS en una Raspberry Pi previamente configurada, en la que ya tenemos otros servicios corriendo.

<!-- more -->


Si bien este artículo se centra en la instalación en una Raspberry Pi, es posible realizar la instalación en otros dispositivos Linux mediante este mismo procedimiento. El _playbook_ de Ansible que vamos a utilizar es compatible con las siguientes distribuciones y versiones:

- **Debian:** _stretch_, _buster_.
- **Raspbian:** _stretch_, _buster_.


### Instalación de Ansible

Lo primero que haremos será instalar la última versión de Ansible. Para ello seguimos los siguientes pasos:

1. Añadir el repositorio de Ansible.

```
echo "deb http://ppa.launchpad.net/ansible/ansible/ubuntu trusty main" | sudo tee -a /etc/apt/sources.list
```

2. Añadir la clave del repositorio.

```
sudo apt-key adv --keyserver keyserver.ubuntu.com --recv-keys 93C4A3FD7BB9C367
```

3. Actualizar lista de repositorios.

```
sudo apt update
```

4. Instalar Ansible.

```
sudo apt install -y ansible
```

### Instalación del cliente Ansible de SatNOGS

A continuación vamos a descargar e instalar el instalador del cliente SatNOGS.

1. Instalamos las dependencias que vamos a necesitar:

```
sudo apt install -y git needrestart
```

2. Descargamos el repositorio:

```
git clone -b stable https://gitlab.com/librespacefoundation/satnogs/satnogs-client-ansible.git
```

3. Accedemos a la carpeta descargada:

```
cd satnogs-client-ansible
```

4. Copiamos y renombramos el siguiente directorio:

```
cp -r production.dist production
```

5. Ahora editamos el archivo `hosts` con nuestros datos de conexión SSH a la Raspberry Pi:

```
nano production/inventory/hosts
```

Debemos editar el _host_, el usuario y la clave:

```
all:
  hosts:
    satnogs:
      ansible_host: 'localhost'
      ansible_user: 'pi'
      ansible_ssh_pass: 'raspberry'
...
```

6. Comprobamos la conexión SSH:

```
ssh pi@localhost true
```

7. Por último ejecutamos el _playbook_:

```
ansible-playbook -i production/inventory -K site.yml
```

La instalación tardará unos minutos (pueden ser bastantes dependiendo de nuestra conexión y la CPU de la Raspberry Pi) y al finalizar mostrará un mensaje como el siguiente:

```
- Play recap -
  satnogs                    : ok=121  changed=49   unreachable=0    failed=0    rescued=0    ignored=0
```

### Configuración de SatNOGS

Los pasos para la configuración del cliente son idénticos a los descritos en el artículo anterior en este mismo apartado.

La única observación es que ahora al tener más de un dispositivo SDR conectado, debemos indicar cual de ellos debe utilizar.
Necesitaremos el número de serie del dispositivo para diferenciarlos. Para extraerlo usamos la herramienta `rtl_test`:

```
pi@raspberrypi:~ $ rtl_test
Found 2 device(s):
  0:  Realtek, RTL2838UHIDIR, SN: 02201602
  1:  Realtek, RTL2838UHIDIR, SN: 08201703
...
```

En este caso vamos a utilizar el segundo dispositivo, y por lo tanto se lo debemos indicar a SatNOGS. Para ello en **_Basic configuration options_** realizaremos el siguiente cambio:

| Ajuste | Descripción |
| --- | --- |
| SATNOGS_SOAPY_RX_DEVICE | Dispositivo SDR que vamos a usar y número de serie: `driver=rtlsdr,serial=08201703`. |


{% asset_img satnogs-config.png "SatNOGS Setup" %}
