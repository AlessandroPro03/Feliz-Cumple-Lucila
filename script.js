document.addEventListener('DOMContentLoaded', () => {
    const envelope = document.getElementById('envelope');
    const instruction = document.querySelector('.instruction');
    const modal = document.getElementById('cake-modal');
    const cake = document.querySelector('.cake-container_new');
    const closeButton = document.querySelector('.close-button');

    let clickCount = 0;
    const clicksToOpen = 3;

    envelope.addEventListener('click', () => {
        clickCount++;
        
        // Actualizamos el estado visual del sobre (solo hasta 3 para las animaciones CSS)
        if (clickCount <= 3) {
            envelope.setAttribute('data-state', clickCount);
        }

        // Control de los mensajes de instrucción y acciones por clic
        if (clickCount === 1) {
            instruction.textContent = "Un clic más...";
        } else if (clickCount === 2) {
            instruction.textContent = "Ya casi...";
        } else if (clickCount === 3) {
            // Aquí la carta sale y se queda a la vista
            instruction.textContent = "¡Haz clic en la invitación para continuar!";
            
            // Hemos eliminado el 'setTimeout' automático que tenías antes
            
        } else if (clickCount === 4) {
            // En el CUARTO clic, ocultamos el sobre y mostramos el modal elegante
            modal.style.display = 'block';
            
            // Ocultamos el sobre y el texto con una transición rápida
            envelope.style.opacity = '0';
            instruction.style.opacity = '0';
            setTimeout(() => {
                envelope.style.display = 'none';
                instruction.style.display = 'none';
            }, 300);
        }
    });

  // --- LÓGICA DEL TEMPORIZADOR ---
// Meses en JavaScript van de 0 a 11 (0 = Enero, 1 = Febrero, etc.)
// Año 2026, Mes 1 (Febrero), Día 28, Hora 20 (8 PM), Minuto 0, Segundo 0
const fechaFiesta = new Date(2026, 4, 16, 18, 30, 0).getTime();

const actualizarTemporizador = () => {
    const ahora = new Date().getTime();
    const diferencia = fechaFiesta - ahora;

    if (diferencia > 0) {
        // Cálculos matemáticos para el tiempo
        const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        // Actualizar el HTML y forzar siempre 2 dígitos (ej: "09" en vez de "9")
        document.getElementById('dias').textContent = dias.toString().padStart(2, '0');
        document.getElementById('horas').textContent = horas.toString().padStart(2, '0');
        document.getElementById('minutos').textContent = minutos.toString().padStart(2, '0');
        document.getElementById('segundos').textContent = segundos.toString().padStart(2, '0');
    } else {
        // Si la fecha ya pasó, dejar todo en cero
        document.getElementById('dias').textContent = "00";
        document.getElementById('horas').textContent = "00";
        document.getElementById('minutos').textContent = "00";
        document.getElementById('segundos').textContent = "00";
    }
};

// Ejecutar la función cada 1000 milisegundos (1 segundo)
setInterval(actualizarTemporizador, 1000);

// Ejecutarla una vez inmediatamente para que no haya retraso al abrir el modal
actualizarTemporizador();

    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // --- LÓGICA DEL VIDEO ---
const btnConfirmar = document.querySelector('.btn-confirmar');
const videoOverlay = document.getElementById('video-overlay');
const videoElement = document.getElementById('cumple-video');
const closeVideoBtn = document.getElementById('close-video-btn');

// Al presionar "Confirmar Asistencia"
btnConfirmar.addEventListener('click', () => {
    // 1. Mostrar la capa del video
    videoOverlay.style.display = 'block';

    // 2. Solicitar pantalla completa (compatible con varios navegadores)
    if (videoOverlay.requestFullscreen) {
        videoOverlay.requestFullscreen();
    } else if (videoOverlay.webkitRequestFullscreen) { /* Safari */
        videoOverlay.webkitRequestFullscreen();
    } else if (videoOverlay.msRequestFullscreen) { /* IE11 */
        videoOverlay.msRequestFullscreen();
    }

    // 3. Reproducir el video
    videoElement.play();
});

// Función para salir del video
// Función para salir del video y mostrar los datos finales
const cerrarVideo = () => {
    // 1. Pausar y ocultar el video
    videoElement.pause();
    videoElement.currentTime = 0; 
    videoOverlay.style.display = 'none';
    
    // 2. Salir de pantalla completa si está activa
    if (document.fullscreenElement || document.webkitFullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        }
    }

    // 3. Modificar el DOM: Limpiar el modal e inyectar la foto y los datos
    const modalContent = document.querySelector('.modal-content');
    
    // Asegúrate de que "mamá_2.jpg" sea el nombre exacto de tu imagen
    modalContent.innerHTML = `
        <span class="close-button" id="btn-cerrar-final"></span>
        <div class="timer timer-left">
                <div class="time-box"><span id="dias">00</span><small>Días</small></div>
                <div class="time-box"><span id="horas">00</span><small>Hrs</small></div>
            </div>

            <div class="timer timer-right">
                <div class="time-box"><span id="minutos">00</span><small>Min</small></div>
                <div class="time-box"><span id="segundos">00</span><small>Seg</small></div>
            </div>
        <img src="mamá_3.jpg" alt="Lucila" class="mom-photo">
        <h2 class="modal-title">¡Te espero!</h2>
        <div class="party-details">
            <p><strong>📅 Fecha:</strong> Sábado, 16 de Mayo</p>
            <p><strong>⏰ Hora:</strong> 6:30 PM</p>
            <p><strong>📍 Lugar:</strong> <a href="https://www.google.com/maps/search/?api=1&query=Calle+las+Nutrias,+La+Joya,+Puerto+Maldonado" target="_blank" class="map-link">La Joya, Calle las Nutrias</a></p>
        </div>
    `; 

    // 4. Volver a darle funcionalidad a la "X" para cerrar el modal
    document.getElementById('btn-cerrar-final').addEventListener('click', () => {
        document.getElementById('cake-modal').style.display = 'none';
        // Opcional: pausar la música si cierran la ventana
        document.getElementById('audio-fondo-1').pause();
        document.getElementById('audio-fondo-2').pause();
    });

    // ... tu código anterior dentro de cerrarVideo (la inyección del HTML, etc.)

    // 5. Reproducir los audios en secuencia (Playlist en bucle)
    const audio1 = document.getElementById('audio-fondo-1');
    const audio2 = document.getElementById('audio-fondo-2');

    // Escuchador de eventos: cuando el audio 1 termina, le da "play" al audio 2
    audio1.addEventListener('ended', () => {
        audio2.play();
    });

    // Escuchador de eventos: cuando el audio 2 termina, vuelve a darle "play" al audio 1
    audio2.addEventListener('ended', () => {
        audio1.play();
    });

    // Damos el "Play" inicial solo al primer audio después de que cargue la pantalla
    setTimeout(() => {
        audio1.play();
    }, 300);
};

// Cerrar al darle clic a la "X"
closeVideoBtn.addEventListener('click', cerrarVideo);

// Cerrar automáticamente cuando el video termine (opcional pero recomendado)
videoElement.addEventListener('ended', cerrarVideo);
});