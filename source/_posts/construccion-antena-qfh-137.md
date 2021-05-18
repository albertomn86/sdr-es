---
title: Construcción de antena QFH para satélites meteorológicos
date: 2021-04-10 14:25:54
tags: [Antenas, QFH, Satélites meteorológicos, NOAA]
author: EA7KOO
---

En este artículo veremos como construir paso a paso una antena QFH para la recepción de satélites meteorológicos. Estos satélites, como ya hemos visto en artículos anteriores, envían imágenes en las frecuencias de 137 MHz a 138 MHz y por ello construiremos nuestra antena para que resuene en 137,5 MHz.

<!-- more -->

Para la construcción de esta antena me he basado tanto en la [antena fabricada por EA3IBC](https://twitter.com/ea3ibc/status/1061292310783295488), como en [la antena de EA5WA](https://www.ea5wa.com/antenas/antena-qfh) que incorpora la varilla roscada y que facilita enormemente tanto el montaje como el ajuste de la misma.
Las medidas orientativas se han obtenido de la web de [John Coppens ON6JC/LW3HAZ](http://jcoppens.com/) para la construcción de una antena con una relación diámetro/altura de 0,4.

## Materiales necesarios

El listado de materiales que se muestra a continuación es el que he empleado para la construcción de esta antena. En mi caso he empleado  aluminio y acero. Esta combinación presenta el problema de la [corrosión galvánica](https://es.wikipedia.org/wiki/Corrosi%C3%B3n_galv%C3%A1nica) que puede ser notable en zonas húmedas. Si vamos a instalar la antena a la intemperie en una zona húmeda, lo ideal es evitar la combinación de estos materiales si queremos que nuestra antena nos dure bastante tiempo. Podemos optar en ese caso por construirla entera de aluminio como la antena de EA3IBC, o bien usar cinta perforada de acero en lugar de la pletina de aluminio y hacerla entera de acero.
Indicar también que si usamos otros componentes metálicos muy distintos tanto en diámetro como en el tipo de material, el ajuste de la antena podría no corresponder con el obtenido siguiendo esta guía.

| Cantidad (uds.) | |
|-:|-|
| 1,5 m | Tubo de PVC Ø 40 mm |
| 1 | Tapón para tubo de PVC Ø 40 mm |
| 2 | Varilla roscada acero Ø 5 mm |
| 4 | Pletina aluminio 2 mm x 10 mm |
| 32 | Tuerca Ø 5 mm |
| 28 | Arandela Ø 5 mm |
| 20 cm | Cable de cobre |
| 4 | Terminal faston redondo Ø 5 mm |
| - | Cable coaxial 50Ω |

{% asset_img materiales.jpg 800 "Materiales" %}

## Construcción

Empezamos cortando el tubo de PVC a la medida que queramos. En mi caso voy a usar el propio tubo como parte del mástil de colocación de la antena, por lo que voy a usar una longitud total de 1,5 metros. Si lo preferimos, podemos dejar el tubo más largo o más corto según nos interese.

Una vez cortado, vamos a hacer los agujeros por los que pasaremos las varillas posteriormente.
Para los agujeros superiores podemos ayudarnos de la plantilla que se genera en [la web de John Coppens](http://jcoppens.com/ant/qfh/calc.en.php) en el apartado de _"Generate a drilling template"_, indicando el diámetro del tubo (40 mm) y el diámetro del soporte horizontal (5 mm).
Le damos primeramente a _Calculate_ en el apartado superior de _"Input data"_ y después a _Generate_. Esto nos crea un PDF que podemos imprimir y usar para marcar los agujeros y que queden centrados. Recordar que **solo vamos a utilizar esta plantilla para marcar la distribución de los agujeros superiores en el perímetro del tubo y no debemos hacer caso a las medidas que indica**.

{% asset_img plantilla.jpg "Plantilla" %}

Las medidas (**en milímetros**) que usaremos son las siguientes (las dimensiones no están a escala):

{% asset_img medidas_tubo.png "Medidas tubo" %}


El siguiente paso será cortar y taladrar las pletinas de aluminio. Cortaremos dos pletinas por cada longitud usando el siguiente esquema:

{% asset_img medidas_pletinas.png "Medidas pletinas" %}

Por último, cortamos las varillas roscadas para obtener las siguientes piezas:

| Medidas (en mm) | Descripción |
|:-:|-|
| 300 | Varilla inferior para _loop_ largo. |
| 280 | Varilla inferior para _loop_ corto. |
| 155 | (2 unidades) Varilla superior para _loop_ largo. |
| 145 | (2 unidades) Varilla superior para _loop_ corto. |

{% asset_img piezas.jpg 900 "Piezas cortadas" %}

### Montaje

Una vez tenemos las piezas preparadas, comenzamos el proceso de montaje empezando por las varillas roscadas.

{% asset_img antena_varillas.jpg 400 "Antena con varillas colocadas" %}

El siguiente paso es colocar las pletinas, pero primero tendremos que darles la forma. La manera más sencilla de hacerlo es primero hacerles el arco y posteriormente hacerles el giro. Es conveniente dejarlas bien dobladas antes de colocarlas para que no apliquen tensión a las varillas.

{% asset_img antena_pletinas.jpg 400 "Antena con pletinas colocadas" %}

A continuación vamos a colocar el cable coaxial. La longitud del cable será la que estimemos necesaria y el tipo de cable podemos usar cualquiera. Es recomendable usar un cable no muy grueso y de bajas pérdidas. En mi caso he usado un cable _Aircell-5_.

Hacemos un agujero del mismo diámetro del cable en la parte superior del tubo por debajo de las varillas y pasamos el cable coaxial. Es recomendable que pasemos bastante cable para poder trabajar con comodidad.
Ahora necesitamos sacar dos conexiones desde el vivo del coaxial y otras dos desde la malla. Para ello yo he utilizado trozos de cable de cobre a los que he soldado una arandela, aunque lo recomendable es usar los terminales faston.

{% asset_img conexiones.jpg 600 "Conexiones" %}

Ahora insertamos los terminales en las varillas conforme el siguiente esquema:

{% asset_img conexiones_qfh.png 400 "Vista superior de la antena" %}

Siendo A y C los lados que conforman el _loop_ corto, y los lados B y D los que forman el _loop_ largo, conectaremos los terminales con el vivo del coaxial a las varillas A y B y los terminales con la malla a las varillas C y D.

{% asset_img conexiones_interior.jpg 500 "Conexiones" %}

Una vez conectados, ajustamos el cable que queda dentro del tubo con cuidado y le damos 4 vueltas para hacer una [bobina choque](https://es.wikipedia.org/wiki/Bobina_de_choque). Aquí podemos hacer otro agujero y pasar el resto del cable por dentro de la antena, o bien podemos dejarlo por fuera.

{% asset_img choque.jpg 500 "Choque" %}

Por último, colocamos el tapón al tubo y ponemos el conector que queramos al cable y ya tenemos lista nuestra antena a falta de ajustarla a la frecuencia exacta.

## Ajuste de la antena

Para finalizar la construcción de nuestra antena, vamos a medirla usando un analizador de antenas **NanoVNA**. Si hemos seguido los pasos de esta guía y hemos usado las medidas indicadas, la antena debe resonar sobre los 135 MHz ya que las medidas de las varillas son un poco más largas para poder colocar las tuercas con facilidad. Para ajustar la antena a la frecuencia exacta debemos ajustar la distancia entre las pletinas de aluminio de la siguiente manera:

- Para el _loop_ largo **282 mm**.
- Para el _loop_ corto **268 mm**.

Para la parte superior habrá que sumar a esta distancia la separación entre los conectores.

Una vez ajustada, nos dará unos resultados similares a los siguientes:

{% asset_img nanovna.jpg 600 "NanoVNA" %}

## Instalación

Para un mejor funcionamiento colocaremos nuestra antena conforme el siguiente esquema:

{% asset_img orientacion.png 300 "Orientación de la antena" %}

Orientaremos los lados conectados a la malla (D y C) hacia el norte y los lados conectados al vivo (A y B) hacia el sur.
