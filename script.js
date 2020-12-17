let buttonEdit = document.querySelector('.profile__button-edit'); // находим элемент в DOM кнопку редоктировать profile
let buttonClose = document.querySelector('.popup__button-close'); // находим элемент в DOM кнопку закрыть popup



function popupVision() {
  let popup = document.querySelector('.popup'); // находим элемент в DOM

  let userName = document.querySelector('.profile__user-name').textContent; // находим в DOM сохраненой имя пользователя
  let userJob = document.querySelector('.profile__user-job').textContent; // находим в DOM сохраненую профессию пользователя

  let userInput = document.querySelector('.user-input'); // находим в DOM поле user-input (пока пустое)
  let jobInput = document.querySelector('.job-input'); // находим в DOM поле job-input (пока пустое)

  userInput.value = userName; // подставляем в поле user-input сохраненой имя пользователя
  jobInput.value = userJob; // подставляем в поле job-input сохраненую профессию пользователя

  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened'); // если есть класс popup_opened, удаляем его
  } else {
    popup.classList.add('popup_opened'); // иначе добавляем класс popup_opened
  }
}

buttonEdit.addEventListener('click', popupVision); // ждем клик по кнопке редоктировать profile
buttonClose.addEventListener('click', popupVision); // ждем клик по кнопке закрыть popup