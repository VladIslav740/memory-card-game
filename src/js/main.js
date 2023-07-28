{
  // Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.
  function createNumbersArray(count) {
    const numbersArray = [];

    for (let i = 0; i < count ** 2 / 2; i++) {
      numbersArray.push(i + 1);
      numbersArray.push(i + 1);
    }

    return numbersArray;
  }

  // Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел.
  function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
  }

  //------------------------------------------------------------//
  // Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.
  function startGame() {
    const container = document.querySelector(".container");
    const gameField = document.getElementById("game");
    const startForm = createStartForm();
    const restartGameBtn = createRestartBtn(gameField);
    let cardNumberArray;

    container.append(startForm.form);
    container.append(gameField);
    container.append(restartGameBtn);

    startForm.form.addEventListener("submit", (e) => {
      e.preventDefault();

      gameField.innerHTML = "";
      gameField.classList.remove("visually-hidden");

      if (
        startForm.input.value >= 2 &&
        startForm.input.value <= 10 &&
        !(startForm.input.value % 2)
      ) {
        cardNumberArray = shuffle(createNumbersArray(startForm.input.value));
        gameField.style.setProperty("--gameFieldSize", startForm.input.value);
      } else {
        cardNumberArray = shuffle(createNumbersArray(4));
        gameField.style.setProperty("--gameFieldSize", 4);
      }

      for (const num of cardNumberArray) {
        gameField.append(createNewCard(num));
      }

      startForm.input.value = "";
    });
  }
  //------------------------------------------------------------//

  function createStartForm() {
    let form = document.createElement("form");
    let input = document.createElement("input");
    let startButton = document.createElement("button");

    form.classList.add("form");
    input.classList.add("form__input");
    input.placeholder = "Введите число";
    startButton.classList.add("btn");
    startButton.textContent = "Начать игру";

    form.append(input);
    form.append(startButton);

    return {
      form,
      input,
      startButton,
    };
  }

  function createNewCard(number) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = number;

    card.addEventListener("click", () => {
      card.classList.add("open");
      checkOpenCards();
      checkGameOver();
    });

    return card;
  }

  function checkOpenCards() {
    const openCards = document.querySelectorAll(".open");

    if (openCards.length === 2) {
      if (openCards[0].textContent === openCards[1].textContent) {
        openCards.forEach((card) => {
          card.classList.add("success");
          card.classList.remove("open");
        });
      } else {
        openCards.forEach((card) => {
          setTimeout(() => card.classList.remove("open"), 600);
        });
      }
    }
  }

  function checkGameOver() {
    if (
      document.querySelectorAll(".success").length ===
      document.querySelectorAll(".card").length
    ) {
      document.querySelector(".restartBtn").classList.remove("visually-hidden");
    }
  }

  function createRestartBtn(gameField) {
    const restartBtn = document.createElement("button");
    restartBtn.classList.add("btn", "restartBtn", "visually-hidden");
    restartBtn.textContent = "Сыграть ещё раз";

    restartBtn.addEventListener("click", () => {
      gameField.innerHTML = "";
      gameField.classList.add("visually-hidden");
      restartBtn.classList.add("visually-hidden");
    });

    return restartBtn;
  }

  document.addEventListener("DOMContentLoaded", startGame());
}
