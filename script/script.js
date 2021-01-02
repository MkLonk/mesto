let profile = document.querySelector('.profile'); //находим блок "profile" в DOM
let buttonEdit = profile.querySelector('.profile__button-edit'); //находим кнопку button-edit в блоке "profile"
let userName = profile.querySelector('.profile__user-name'); //находим userName в блоке "profile"
let userJob = profile.querySelector('.profile__user-job'); //находим userJob в блоке "profile"

let popup = document.querySelector('.popup'); // находим блок "popup" в DOM
let formPopup = popup.querySelector('.popup__form');// находим форму "popup__container" в блоке "popup"
let buttonClose = formPopup.querySelector('.popup__button-close'); //находим кнопку button-close в блоке "popup"
let userNameInput = formPopup.querySelector('.popup__input_user_name'); //находим в блоке "popup" поле popup__input_user_name
let userJobInput = formPopup.querySelector('.popup__input_user_job'); //находим в блоке "popup" поле popup__input_user_job


const galleryElementTemplate = document.querySelector('.card-template').content; //находим блок-шаблон "card-template" в DOM
const galleryContainer = document.querySelector('.gallery__photo-grid'); //находим блок-шаблон "card-template" в DOM


// Функция заполнения блока Галерея элементами «из коробки»
function fillGallery() {

  initialCards.forEach(element => {

    const galleryElement = galleryElementTemplate.cloneNode(true); // клонируем из шаблона

    galleryElement.querySelector('.card__image').src = element.link; // url фото
    //galleryElement.querySelector('.card__image').alt = 'Архыз'; // alt фото
    galleryElement.querySelector('.card__caption').textContent = element.name; // caption фото

    galleryContainer.append(galleryElement); // отображаем на странице
  })
}
fillGallery()

// Функция открытия popup
function openPopup() {
  userNameInput.value = userName.textContent; // подставляем в поле user-input сохраненой имя пользователя
  userJobInput.value = userJob.textContent; // подставляем в поле job-input сохраненую профессию пользователя
  popup.classList.add('popup_opened');
}

// Функция закрытия popup
function closePopup() {
  popup.classList.remove('popup_opened');
}

// Функция для закрытия popup, если клик за границами popup
function clikPopup(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup();
  }
}

// Функция сохренения данных из формы "popup__form"
function handleFormSubmit(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value; // сохраняем значение поля user-name-input на странице
  userJob.textContent = userJobInput.value; // сохраняем значение поля user-job-input на странице
  closePopup(); // закрываем popup после изменений
}

// Все слушатели
buttonEdit.addEventListener('click', openPopup); // ждем клик по кнопке button-edit в блоке "profile"
buttonClose.addEventListener('click', closePopup); // ждем клик по кнопке button-close в блоке "popup"
popup.addEventListener('click', clikPopup) // ждем клик за границами popup
formPopup.addEventListener('submit', handleFormSubmit); // ждем клик по кнопке "сохранить" в блоке "popup"