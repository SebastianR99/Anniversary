document.addEventListener("DOMContentLoaded", () => {
  // Función para crear partículas de corazones
  function createHeartParticle() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    document.querySelector(".particles").appendChild(heart);

    // Generar una posición aleatoria en la pantalla
    const xPosition = Math.random() * window.innerWidth;
    const yPosition = Math.random() * window.innerHeight;

    heart.style.left = `${xPosition}px`;
    heart.style.top = `${yPosition}px`;

    // Animar la partícula
    setTimeout(() => {
      heart.style.animation = "floatHeart 5s ease-in-out forwards";
    }, 100);

    // Eliminar la partícula después de la animación
    setTimeout(() => {
      heart.remove();
    }, 5000);
  }

  // Crear partículas cada 300ms
  setInterval(createHeartParticle, 300);
});

document.addEventListener("DOMContentLoaded", () => {
  let score = 0;
  const answerButtons = document.querySelectorAll(".answer-btn");
  const scoreElement = document.getElementById("score");
  const resultSection = document.querySelector(".result");
  const retryBtn = document.getElementById("retry-btn");

  // Función para mostrar el popup
  function showPopup(questionElement, message, isCorrect) {
    // Creamos el popup dentro de la pregunta
    const popup = document.createElement('div');
    popup.classList.add('popup');
    questionElement.appendChild(popup);

    const popupMessage = document.createElement('span');
    popupMessage.classList.add('popup-message');
    popupMessage.textContent = message;
    popup.appendChild(popupMessage);

    const popupClose = document.createElement('button');
    popupClose.classList.add('popup-close');
    popupClose.textContent = 'Cerrar';
    popup.appendChild(popupClose);

    if (isCorrect) {
      popup.style.backgroundColor = "green";
    } else {
      popup.style.backgroundColor = "red";
    }

    // Mostrar el popup
    popup.style.display = 'block';

    // Cerrar el popup al hacer clic en el botón "Cerrar"
    popupClose.addEventListener("click", () => {
      popup.style.display = 'none';
      popup.remove();
    });
  }

  answerButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const correct = e.target.dataset.correct === "true";
      const questionElement = e.target.closest('.question'); // Obtener el contenedor de la pregunta
  
      // Mostrar el popup
      if (correct) {
        score++;
        showPopup(questionElement, "¡Correcto! 🎉", true);
      } else {
        showPopup(questionElement, "¡Incorrecto! 😕", false);
      }
  
      // Desactivar el botón y cambiar su color
      e.target.disabled = true;
      e.target.style.backgroundColor = "#cccccc"; // Cambiar color al responder
  
      // Verificar si todas las respuestas están deshabilitadas
      // Usamos querySelectorAll para obtener los botones actualizados
      const allButtons = document.querySelectorAll('.question button');
      if (Array.from(allButtons).every((btn) => btn.disabled)) {
        setTimeout(() => {
          console.log('Mostrando resultados');
          scoreElement.textContent = `${score} de 4`; // Actualizar el puntaje
          resultSection.style.display = "block"; // Mostrar la sección de resultados
        }, 1000); // Esperar 1 segundo para mostrar el puntaje
      }
    });
  });
  

  // Reiniciar el quiz
  retryBtn.addEventListener("click", () => {
    score = 0;
    answerButtons.forEach((button) => {
      button.disabled = false;
      button.style.backgroundColor = ""; // Restablecer el color del botón
    });
    resultSection.style.display = "none"; // Ocultar la sección de resultados
  });
});
