//Los trabajadores web deben estar en un fichero separado
import contadorPorConsola from './contadorPorConsola.js';

// Escuchar mensajes del hilo principal
//self.onmessage = function(event) {
self.addEventListener("message", evento=>{
    if (evento.data=="comienza"){
        const resultado = contadorPorConsola();
        self.postMessage({ estado: "terminado", resultado });
    }
});