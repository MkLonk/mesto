let buttonEdit = document.querySelector('.profile__button-edit'); // находим кнопку button-edit в DOM
let buttonClose = document.querySelector('.popup__button-close'); // находим кнопку button-close в DOM
let formProfile = document.querySelector('.popup__form');// находим форму popup__container в DOM

// Функция открытия/закрытия popup
function popupVision() {
  let popup = document.querySelector('.popup'); // находим блок popup в DOM

  // находим в DOM сохраненой имя пользователя
  let userName = document.querySelector('.profile__user-name').textContent;
  // находим в DOM сохраненую профессию пользователя
  let userJob = document.querySelector('.profile__user-job').textContent;

  // находим в DOM поле user-name-input (пока пустое)
  let userNameInput = document.querySelector('.user-name-input');
  // находим в DOM поле user-job-input (пока пустое)
  let userJobInput = document.querySelector('.user-job-input');

  // подставляем в поле user-input сохраненой имя пользователя
  userNameInput.value = userName;
  // подставляем в поле job-input сохраненую профессию пользователя
  userJobInput.value = userJob;

  if (popup.classList.contains('popup_opened')) {
    popup.classList.remove('popup_opened'); // если есть класс popup_opened, удаляем его
  } else {
    popup.classList.add('popup_opened'); // иначе добавляем класс popup_opened
  }
}

// Функция сохраниния данных формы "popup", в блок "profile" на странице
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  // находим в DOM поле user-name-input
  let userNameInput = document.querySelector('.user-name-input');
  // находим в DOM поле user-job-input
  let userJobInput = document.querySelector('.user-job-input');

  // находим в DOM сохраненой имя пользователя
  let userName = document.querySelector('.profile__user-name');
  // находим в DOM сохраненую профессию пользователя
  let userJob = document.querySelector('.profile__user-job');

  // сохраняем значение поля user-name-input на странице
  userName.textContent = userNameInput.value
  // сохраняем значение поля user-job-input на странице
  userJob.textContent = userJobInput.value

  // реализуем закрытие формы "popup" после изменения данных
  let popup = document.querySelector('.popup');
  popup.classList.remove('popup_opened');
}


// Все наши слушатели
buttonEdit.addEventListener('click', popupVision); // ждем клик по кнопке редоктировать profile
buttonClose.addEventListener('click', popupVision); // ждем клик по кнопке закрыть popup
formProfile.addEventListener('submit', handleFormSubmit); //// ждем клик по кнопке "сохранить" в popup