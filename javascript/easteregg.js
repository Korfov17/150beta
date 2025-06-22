let keysPressed = {};
let intervalId = null;
let counter = 0;

function mostrarAlerta() {
  alert('¡Has mantenido F6 + Flecha Izquierda durante 5 segundos!');

  // Eliminar divs con las clases indicadas
  const largeButtons = document.querySelectorAll('.large-button-container');
  largeButtons.forEach(div => div.remove());

  const smallButtons = document.querySelectorAll('.small-button-container');
  smallButtons.forEach(div => div.remove());

  // Crear un h3 centrado
  const mensaje = document.createElement('h3');
  mensaje.textContent = '¡Esto es un mensaje de prueba y se esta Desarrollando un Easter Egg para dar un Legado a nuestro Grupo Caído TU PS4 HEN, del cual se le ha hechado mucho tiempo y ganas y todo se ha esfumado como si nada hubiera pasado. Pronto se completara este apartado.';
  
  // Estilos para centrar y dar formato
  mensaje.style.position = 'fixed';
  mensaje.style.top = '50%';
  mensaje.style.left = '50%';
  mensaje.style.transform = 'translate(-50%, -50%)';
  mensaje.style.color = 'white';
  mensaje.style.background = 'rgba(0,0,0,0.3)';
  mensaje.style.border = '2px solid white';
  mensaje.style.padding = '30px 85px';
  mensaje.style.borderRadius = '8px';
  mensaje.style.boxShadow = '0 0 12px 2px white';
  mensaje.style.userSelect = 'none';
  mensaje.style.zIndex = '1000';
  mensaje.style.fontWeight = '600';
  mensaje.style.fontSize = '24px';
  mensaje.style.textAlign = 'center';

  document.body.appendChild(mensaje);
}

function iniciarContador() {
  counter = 0;
  intervalId = setInterval(() => {
    counter++;
    if (counter >= 5) {
      clearInterval(intervalId);
      intervalId = null;
      mostrarAlerta();
    }
  }, 1000);
}

function cancelarContador() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  counter = 0;
}

document.addEventListener('keydown', (e) => {
  keysPressed[e.keyCode] = true;

  if (keysPressed[117] && keysPressed[37] && !intervalId) {
    iniciarContador();
  }
});

document.addEventListener('keyup', (e) => {
  delete keysPressed[e.keyCode];
  if (!keysPressed[117] || !keysPressed[37]) {
    cancelarContador();
  }
});
