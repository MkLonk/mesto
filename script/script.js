let profile = document.querySelector('.profile'); //находим блок "profile" в DOM
let buttonEdit = profile.querySelector('.profile__button-edit'); //находим кнопку button-edit в блоке "profile"
let userName = profile.querySelector('.profile__user-name'); //находим userName в блоке "profile"
let userJob = profile.querySelector('.profile__user-job'); //находим userJob в блоке "profile"

let popup = document.querySelector('.popup'); // находим блок "popup" в DOM
let formPopup = popup.querySelector('.popup__form');// находим форму "popup__container" в блоке "popup"
let buttonSave = formPopup.querySelector('.popup__button-save'); //находим кнопку button-save в блоке "popup"
let buttonClose = formPopup.querySelector('.popup__button-close'); //находим кнопку button-close в блоке "popup"
let userNameInput = formPopup.querySelector('.popup__input_user_name'); //находим в блоке "popup" поле popup__input_user_name
let userJobInput = formPopup.querySelector('.popup__input_user_job'); //находим в блоке "popup" поле popup__input_user_job

userNameInput.value = userName.textContent; // подставляем в поле user-input сохраненой имя пользователя
userJobInput.value = userJob.textContent; // подставляем в поле job-input сохраненую профессию пользователя

// Функция открытия/закрытия popup
function togglePopup() {
  popup.classList.toggle('popup_opened');
}

// Функция для закрытия popup, если клик за границами popup
function clikPopup(evt) {
  if (evt.target === evt.currentTarget) {
    togglePopup()
  }
}

// Функция сохренения данных из формы "popup__form"
function handleFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value; // сохраняем значение поля user-name-input на странице
  userJob.textContent = userJobInput.value; // сохраняем значение поля user-job-input на странице
  togglePopup(); // закрываем popup после изменений
}

// Все слушатели
buttonEdit.addEventListener('click', togglePopup); // ждем клик по кнопке button-edit в блоке "profile"
buttonClose.addEventListener('click', togglePopup); // ждем клик по кнопке button-close в блоке "popup"
popup.addEventListener('click', clikPopup) // ждем клик за границами popup
formPopup.addEventListener('submit', handleFormSubmit); // ждем клик по кнопке "сохранить" в блоке "popup"