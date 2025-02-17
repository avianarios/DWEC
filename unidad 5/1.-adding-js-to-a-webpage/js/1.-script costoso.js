//  El ciclo de renderizado es el proceso que sigue el navegador web para dibujar en pantalla el código HTML de una web. Comprende los siguientes pasos:
//     1- Descarga de recursos
//     2- Análisis del HTML
//     3- Construcción en memoria del DOM como un árbol de nodos
//     4- Análisis del CSS
//     5- Construcción de un modelo de objetos usando las reglas CSS (CSS Object Model)
//     6- Construcción del árbol de renderizado, combinando el DOM y el CSSOM
//     7- Disposición -> cálculo del tamaño y posición que ocuparán los elementos del árbol de renderizado en la página
//     8- Composición -> cuando se usan animaciones, transformaciones o capas complejas como imágenes flotantes o transformaciones 3D, el navegador organiza los elementos en capas. Esta fase implica combinar dichas capas para formar la imagen final en pantalla
//     9- Dibujado en pantalla de los elementos

// Estas 9 pasos se podrían clasificar en dos fases:
//     1- Construcción (pasos 1 a 6). Es la creación de esa estructura en memoria a partir del HTML que se encuentra en el archivo.
//     2- Renderizado (pasos 7 a 9). Es el proceso que sigue, donde el navegador comienza a pintar los elementos en la pantalla. En este proceso también se cargan y se representan los recursos visuales (como imágenes, fuentes, etc.).


//Proceso de ejecución de la web en un navegador
//   La ejecución de una web en un navegador se divide en hilos a los que se les asignan tareas. Hay un hilo principal, en el que el navegador procesa la mayoría de las tareas relacionadas con la renderización de la página web y la ejecución de scripts y otros secundarios que permiten que el navegador realice otras tareas sin bloquear la carga de la página.

//  En un entorno de ejecución como el de los navegadores web, JavaScript se ejecuta por defecto en el hilo principal. Esto significa que todas las tareas relacionadas con la manipulación del DOM, la ejecución de eventos (como clics o desplazamientos), y la ejecución de código JavaScript se llevan a cabo en este hilo.


// Ejemplos de hilos secundarios:
//     1- Trabajadores web (Web workers) -> ideales para tareas largas o intensivas como el procesamiento de grandes volúmenes de datos o cálculos pesados, sin afectar la experiencia del usuario.
//     Estos trabajadores se ejecutan en un hilo separado y se comunican con el hilo principal a través de mensajes, por lo que no tienen acceso directo al DOM.
//     2- Hilo de renderizado: Algunos navegadores usan un hilo de renderizado separado del hilo principal. Este hilo es responsable de pintar los elementos en la pantalla, procesar la capa de composición y otros aspectos gráficos.
//     Aunque la mayor parte del trabajo de renderización está vinculado al hilo principal, el proceso de compositing (organizar las capas antes de pintar) y algunas optimizaciones gráficas se pueden realizar en hilos separados para mejorar el rendimiento.
//     3- Hilos de red (network threads) para gestionar las peticiones de red
//     4- Hilo asíncrono para ejecutar tareas asíncronas como promesas, setTimeout y las API Fetch

//Formas de cargar un script externo:
    // 1- Sin parámetro <script src="miScript.js"></script>. Cuando un script se carga sin ninguno de estos atributos, se descarga y ejecuta de manera sincrónica. Esto significa que, durante la descarga y ejecución del script, el navegador detiene el procesamiento del resto de la página, incluyendo el análisis de HTML y la renderización de contenido visual.

    // 2- Con async <script src="script.js" async></script> el script se descarga de manera asíncrona, es decir, en paralelo con el procesamiento del HTML y se ejecuta tan pronto como se descarga, sin esperar a que el DOM esté completamente construido. 
    // Por tanto, si el script intentar interactuar con el DOM, como éste aún no estará  completamente disponible, podría causar errores al intentar acceder a elementos que aún no existen en el DOM.

    // 3- Con defer <script src="script.js defer"></script> el script se ejecuta cuando el DOM se ha construido completamente (Fase 1, pasos 1 a 6), lo que significa que el navegador ha analizado completamente el HTML y ha construido todos los nodos del DOM. Esto asegura que si el script interactúa con elementos del DOM, esos elementos ya existan y estén listos para ser manipulados.
    // Sin embargo, el script se ejecuta después de que el DOM esté construido, pero antes de que el navegador haya completado el proceso de renderizado visual (fase 2, pasos 7 a 9). Es decir, el DOM está listo en memoria, pero el navegador aún puede no haber terminado de pintar todo en pantalla.
    // El comportamiento que todo el mundo esperaría es que se pintase toda la web y luego se ejecutase el script, pero esto no tiene por qué ser así siempre. Recordemos que tanto los scripts "normales" como la  "renderización" visual se ejecutan en el hilo principal. Por tanto, si el hilo principal está ocupado ejecutando un script costoso o bloqueante (como un bucle largo), puede hacer que la página no se termine de renderizar hasta que ese código termine de ejecutarse, aunque el DOM ya esté construido.



// Este script bloquea el hilo principal durante 5 segundos con una operación costosa.
// Formas de cargar el script
//  - Sin parámetros. El script se descarga de forma síncrona, bloqueando tanto la construcción del DOM como su renderización hasta que se complete la ejecución del script.
//  - con async. El script se descarga de forma asíncrona. En cuanto el navegador lo encuentra lo descarga mientras construye el DOM. En cuanto termina de descargarlo, lo ejecuta SIN ESPERAR a que el DOM esté completamente construido. Si el script es bloqueante, el DOM no terminará de construirse antes de que éste se ejecute y, por tanto, si el script intenta acceder a un elemento del DOM que aún no ha sido construido, daría error.
//  - con defer. El navegador construirá el DOM y, cuando haya acabado, descargará y ejecutará el script. Si el script no es bloqueante, el navegador renderizará el DOM mientras se ejecuta. Si el script es bloqueante y el DOM es sencillo, éste se renderizará mientras el script se ejecuta, pero si el DOM es complejo o requiere recursos externos, la renderización se retrasará hasta que el script acabe de ejecutarse.
 

//Ese while bloqueante detiene el hilo principal. Aunque se cargue con defer, este bloqueo impide que el navegador continúe procesando otras tareas relacionadas con el renderizado, incluso si el DOM ya está listo.
console.log("Inicio del script");
const start = Date.now();
while (Date.now() - start < 5000) {
    // Bloquea el hilo principal durante 5 segundos
}
console.log("Fin del script");


// El temporizador (setTimeout) no bloquea el hilo principal del navegador, porque lo que hace es programar una tarea futura (en este caso, ejecutar el callback después de 10 segundos). Mientras tanto, el navegador puede seguir construyendo el DOM y cargando/mostrando los recursos ya detectados (como la imagen).