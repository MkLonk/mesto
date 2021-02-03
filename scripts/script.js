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

//переменная cardTemplate - блок шаблон card
const cardTemplate = document.querySelector('.card-template').content; // находим блок-шаблон "card-template"

//переменная galleryContainer - контейнер для карт
const galleryContainer = document.querySelector('.gallery__photo-grid');

// popup_full-screen
const popupFullScreen = document.querySelector('.popup_full-screen'); //ищем popup-full-screen
const buttonCloseFullScreen = popupFullScreen.querySelector('.popup__button-close');
const fullScreenImage = popupFullScreen.querySelector('.full-screen__image');
const fullScreenCaption = popupFullScreen.querySelector('.full-screen__caption');


// ----- Функции ----- //
// 1. Функция открытия попапов
function openPopup(popupName) {
  popupName.classList.add('popup_opened');
  document.addEventListener('keyup', handleEscUp); // добавляем событие "Ожидание клавиши Esc"

  // проверяем инпуты и переключаем активность кнопки
  const inputList = Array.from(popupName.querySelectorAll('.form__input'))
  const buttonElement = popupName.querySelector('.form__button-save')
  if (buttonElement) { // проверяем есть ли buttonElement
    toggleButtonState(inputList, buttonElement, settingsForm);
  }
}

// 2. Функция закрытия попапов
function closePopup(popupName) {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleEscUp); // удаляем событие "Ожидание клавиши Esc"
}

// 3. Функция создания новой карточки для галереи. Возвращает готовый для вставки galleryElement
function createCard(nameImage, linkImage) {

  const galleryElement = cardTemplate.cloneNode(true); // клонируем из шаблона
  const cardImage = galleryElement.querySelector('.card__image');
  const cardCaption = galleryElement.querySelector('.card__caption');

  cardImage.src = linkImage; // фото для миниатюры
  cardImage.alt = nameImage; // alt фото для миниатюры
  cardCaption.textContent = nameImage; // caption фото

  // вешаем слушатель на лайк
  galleryElement.querySelector('.card__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like_active');
  });

  // вешаем слушатель на delete
  galleryElement.querySelector('.card__delete').addEventListener('click', (evt) => {
    evt.target.closest('.gallery__element').remove();
  });

  // вешаем слушатель на клик по картинке card__image
  galleryElement.querySelector('.card__image').addEventListener('click', () => {
    fullScreenImage.src = linkImage;
    fullScreenImage.alt = nameImage;
    fullScreenCaption.textContent = nameImage;
    openPopup(popupFullScreen);
  });

  return galleryElement;
}

// 4. Функция вставки элемента (card) в начало или конец galleryContainer 
function addCard(card, insert = 'append') {
  if (insert === 'prepend') {
    galleryContainer.prepend(card);
  } else {
    galleryContainer.append(card);
  }
}

// 5. Функция сохренения данных из form_edit-profile
function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value; // сохраняем значение поля user-name-input на странице
  userJob.textContent = userJobInput.value; // сохраняем значение поля user-job-input на странице
  closePopup(popupEditProfile); // закрываем popup после изменений
}

// 6. Функция сохренения данных из form_add-gallery
function handleFormGallerySubmit(evt) {
  evt.preventDefault();
  addCard(createCard(mestoNameInput.value, mestoLinkInput.value), 'prepend'); // создаем и добавляем карточку
  closePopup(popupAddGallery); // закрываем popup после добавления карточки

  //сбрасываем значения в инпутах если форма была отправлена
  mestoNameInput.value = '';
  mestoLinkInput.value = '';
}

// 7. Функция вызывающая closePopup на открытом попапе при нажатии Escape
function handleEscUp(evt) {
  evt.preventDefault();
  const openedPopup = document.querySelector('.popup_opened'); // ищем открытый попап в document

  if (evt.key === 'Escape') {
    closePopup(openedPopup);
  }
}


// *** *** *** *** //


// ----- Заполняем галерею ----- //
initialCards.forEach(element => {
  const newCard = createCard(element.name, element.link);
  addCard(newCard);
});


// --- События открывающие попапы с формами ---
//ждем клик по кнопке button-edit
buttonEditProfile.addEventListener('click', () => {
  userNameInput.value = userName.textContent; // подставляем в поле user-input сохраненой имя пользователя
  userJobInput.value = userJob.textContent; // подставляем в поле job-input сохраненую профессию пользователя

  openPopup(popupEditProfile);

  // убираем сообщения об ошибках в инпутах, так как при открытии попапа инпуты уже валидные
  document.querySelector(`#${userNameInput.id}-error`).textContent = '';
  document.querySelector(`#${userJobInput.id}-error`).textContent = '';


  // убираем оформления инпутов, так как при открытии попапа инпуты уже валидные
  userNameInput.classList.remove('form__input_type_error');
  userJobInput.classList.remove('form__input_type_error');
});

// ждем клик по кнопке button-add
buttonAddGallery.addEventListener('click', () => {
  openPopup(popupAddGallery);
});

// --- События закрывыющие попапы ---
// --- Клики по кнопке Х ---
// ждем клик по кнопке Х в форме EditProfile
buttonClosePopupEditProfile.addEventListener('click', () => closePopup(popupEditProfile));

// ждем клик по кнопке Х в форме AddGallery
buttonClosePopupAddGallery.addEventListener('click', () => closePopup(popupAddGallery));

// ждем клик по кнопке Х в popupFullScreen
buttonCloseFullScreen.addEventListener('click', () => closePopup(popupFullScreen));

// ждем нажание на клавиатуре кнопки Esc в popupFullScreen




// --- Клики за границы ---
// ждем клик за границами формы EditProfile
popupEditProfile.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) closePopup(popupEditProfile);
});

// ждем клик за границами формы AddGallery
popupAddGallery.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) closePopup(popupAddGallery);
});

// ждем клик за границами блока FullScreen
popupFullScreen.addEventListener('click', (evt) => {
  if (evt.target === evt.currentTarget) closePopup(popupFullScreen);
});

// --- Клики по кнопке Сохранить (отправить форму) ---
formProfile.addEventListener('submit', handleFormProfileSubmit); // ждем клик "сохранить" в форме Profile
formGallery.addEventListener('submit', handleFormGallerySubmit); // ждем клик "сохранить" в форме Gallery