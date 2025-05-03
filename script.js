document.addEventListener("DOMContentLoaded", () => {
  function createHeartParticle() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    document.querySelector(".particles").appendChild(heart);

    const xPosition = Math.random() * window.innerWidth;
    const yPosition = Math.random() * window.innerHeight;

    heart.style.left = `${xPosition}px`;
    heart.style.top = `${yPosition}px`;

    setTimeout(() => {
      heart.style.animation = "floatHeart 5s ease-in-out forwards";
    }, 100);

    setTimeout(() => {
      heart.remove();
    }, 5000);
  }

  setInterval(createHeartParticle, 500);
});

document.addEventListener("DOMContentLoaded", () => {
  let score = 0;
  let total = 1;
  const answerButtons = document.querySelectorAll(".answer-btn");
  const scoreElement = document.getElementById("score");
  const resultSection = document.querySelector(".result");
  const retryBtn = document.getElementById("retry-btn");

  function showPopup(questionElement, message, isCorrect) {
    const popup = document.createElement("div");
    popup.classList.add("popup");
    questionElement.appendChild(popup);

    const popupMessage = document.createElement("span");
    popupMessage.classList.add("popup-message");
    popupMessage.textContent = message;
    popup.appendChild(popupMessage);

    const popupClose = document.createElement("button");
    popupClose.classList.add("popup-close");
    popupClose.textContent = "Cerrar";
    popup.appendChild(popupClose);

    if (isCorrect) {
      popup.style.backgroundColor = "green";
    } else {
      popup.style.backgroundColor = "red";
    }

    popup.style.display = "block";

    popupClose.addEventListener("click", () => {
      popup.style.display = "none";
      popup.remove();
    });
  }

  answerButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      console.log("Botón clicado");
      console.log(total);
      const correct = e.target.dataset.correct === "true";
      const questionElement = e.target.closest(".question");

      if (correct) {
        score++;
        showPopup(questionElement, "¡Correcto! 🎉", true);
      } else {
        showPopup(questionElement, "¡Incorrecto! 😕", false);
      }

      e.target.disabled = true;
      e.target.style.backgroundColor = "#cccccc";

      if (total >= 12) {
        scoreElement.textContent = `${score} de 12`; 
        resultSection.style.display = "block"; 
        resultSection.style.display = "block"; 
      }
      total++;
    });
  });

  retryBtn.addEventListener("click", () => {
    score = 0;
    answerButtons.forEach((button) => {
      button.disabled = false;
      button.style.backgroundColor = ""; 
    });
    resultSection.style.display = "none"; 
  });
});
