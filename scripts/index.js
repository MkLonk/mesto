import { Card } from './Card.js'

import { FormValidator } from './FormValidator.js'
import { settingsFormValid } from './settingsFormValid.js';

import { dataCards } from './dataCards.js'
import { hotKeys } from './hotKeys.js';

//переменные блока profile
const profile = document.querySelector('.profile'); //находим блок "profile" в DOM
const buttonEditProfile = profile.querySelector('.profile__button-edit'); //находим кнопку button-edit
const buttonAddGallery = profile.querySelector('.profile__button-add'); //находим кнопку button-add
const userName = profile.querySelector('.profile__user-name'); //находим userName
const userJob = profile.querySelector('.profile__user-job'); //находим userJob

// ищем блок popup-edit-profile, и переменные для формы form_edit-profile
const popupEditProfile = document.querySelector('.popup-edit-profile'); // находим блок "popup-edit-profile" в DOM
const buttonClosePopupEditProfile = popupEditProfile.querySelector('.popup__button-close'); //находим кнопку button-close
const formProfile = document.forms.formEditProfile; // находим форму "form_edit-profile"
const userNameInput = formProfile.elements.userNameInput; // находим поле form__input_user_name
const userJobInput = formProfile.elements.userJobInput; // находим поле form__input_user_job 

// ищем блок popup-add-gallery, и переменные для формы form_add-gallery
const popupAddGallery = document.querySelector('.popup-add-gallery'); // ищем блок "popup-add-gallery" в DOM
const buttonClosePopupAddGallery = popupAddGallery.querySelector('.popup__button-close'); // находим кнопку button-close
const formGallery = document.forms.formAddGallery; // находим форму "form_add-gallery"
const mestoNameInput = formGallery.elements.mestoNameInput; // находим поле form__input_mesto_name
const mestoLinkInput = formGallery.elements.mestoLinkInput; // находим поле form__input_mesto_link


// ----- Функции ----- //
// 1. Функция открытия попапов
function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener('keyup', handleEscUp); // добавляем событие "Ожидание клавиши Esc"

  const openForm = popupName.querySelector('.form');
  const formValid = new FormValidator(openForm, settingsFormValid);
  formValid.enableValidation();
}

// 2. Функция закрытия попапов
function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleEscUp); // удаляем событие "Ожидание клавиши Esc"
}

// 3. Функция сохренения данных из form_edit-profile
function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value; // сохраняем значение поля user-name-input на странице
  userJob.textContent = userJobInput.value; // сохраняем значение поля user-job-input на странице
  closePopup(popupEditProfile); // закрываем popup после изменений
}

// 4. Функция сохренения данных из form_add-gallery
function handleFormGallerySubmit(evt) {
  evt.preventDefault();

  const newCardData = { // собираем объект с данными о новом месте
    name: mestoNameInput.value,
    link: mestoLinkInput.value,
  }

  const newCard = new Card(newCardData, settingsCard); // создаем новый Card 
  newCard.generateCard('up'); // встяем его в начало галерии

  //сбрасываем значения и закрываем форму
  mestoNameInput.value = '';
  mestoLinkInput.value = '';
  closePopup(popupAddGallery);
}

// 5. Функция вызывающая closePopup на открытом попапе при нажатии Escape
function handleEscUp(evt) {
  evt.preventDefault();
  const openedPopup = document.querySelector('.popup_opened'); // ищем открытый попап в document

  if (evt.key === hotKeys.esc) {
    closePopup(openedPopup);
  }
}

// *** *** *** *** //

// ----- Заполняем галерею ----- //
dataCards.forEach(element => {
  const card = new Card(element, '.card-template');
  card.generateCard();
});

// --- События открывающие попапы с формами ---
//ждем клик по кнопке button-edit
buttonEditProfile.addEventListener('click', () => {
  userNameInput.value = userName.textContent; // подставляем в поле user-input сохраненой имя пользователя
  userJobInput.value = userJob.textContent; // подставляем в поле job-input сохраненую профессию пользователя

  openPopup(popupEditProfile);
});

// ждем клик по кнопке button-add
buttonAddGallery.addEventListener('click', () => {
  openPopup(popupAddGallery);
});

// --- События закрывыющие попапы ---
// ждем клик по кнопке Х в форме EditProfile
buttonClosePopupEditProfile.addEventListener('click', () => closePopup(popupEditProfile));

// ждем клик по кнопке Х в форме AddGallery
buttonClosePopupAddGallery.addEventListener('click', () => closePopup(popupAddGallery));

// ждем клик за границами формы EditProfile
popupEditProfile.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) closePopup(popupEditProfile);
});

// ждем клик за границами формы AddGallery
popupAddGallery.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) closePopup(popupAddGallery);
});

// --- Клики по кнопке Сохранить (отправить форму) ---
formProfile.addEventListener('submit', handleFormProfileSubmit); // ждем клик "сохранить" в форме Profile
formGallery.addEventListener('submit', handleFormGallerySubmit); // ждем клик "сохранить" в форме Gallery