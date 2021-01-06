//переменные блока profile
const profile = document.querySelector('.profile'); //находим блок "profile" в DOM
const buttonEditProfile = profile.querySelector('.profile__button-edit'); //находим кнопку button-edit
const buttonAddGallery = profile.querySelector('.profile__button-add'); //находим кнопку button-add
const userName = profile.querySelector('.profile__user-name'); //находим userName
const userJob = profile.querySelector('.profile__user-job'); //находим userJob

// ищем блок popup-edit-profile, и переменные для формы form_edit-profile
const popupEditProfile = document.querySelector('.popup-edit-profile'); // находим блок "popup-edit-profile" в DOM
const buttonClosePopupEditProfile = popupEditProfile.querySelector('.popup__button-close'); //находим кнопку button-close
const formProfile = popupEditProfile.querySelector('.form_edit-profile'); // находим форму "form_edit-profile"
const userNameInput = formProfile.querySelector('.form__input_user_name'); // находим поле form__input_user_name
const userJobInput = formProfile.querySelector('.form__input_user_job'); // находим поле form__input_user_job 

// ищем блок popup-add-gallery, и переменные для формы form_add-gallery
const popupAddGallery = document.querySelector('.popup-add-gallery'); // ищем блок "popup-add-gallery" в DOM
const buttonClosePopupAddGallery = popupAddGallery.querySelector('.popup__button-close'); // находим кнопку button-close
const formGallery = popupAddGallery.querySelector('.form_add-gallery'); // находим форму "form_add-gallery"
const mestoNameInput = formGallery.querySelector('.form__input_mesto_name'); // находим поле form__input_mesto_name
const mestoLinkInput = formGallery.querySelector('.form__input_mesto_link'); // находим поле form__input_mesto_link

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
  return popupName.classList.add('popup_opened');
}

// 2. Функция закрытия попапов
function closePopup(popupName) {
  return popupName.classList.remove('popup_opened');
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
}


// ----- Заполняем галерею ----- //
initialCards.forEach(element => {
  const newCard = createCard(element.name, element.link);
  addCard(newCard);
});


// --- Клики открывающие попапы с формами ---
//ждем клик по кнопке button-edit
buttonEditProfile.addEventListener('click', () => {
  userNameInput.value = userName.textContent; // подставляем в поле user-input сохраненой имя пользователя
  userJobInput.value = userJob.textContent; // подставляем в поле job-input сохраненую профессию пользователя  
  openPopup(popupEditProfile);
});

// ждем клик по кнопке button-add
buttonAddGallery.addEventListener('click', () => openPopup(popupAddGallery));


// --- Клики по кнопке Х ---
// ждем клик по кнопке Х в форме EditProfile
buttonClosePopupEditProfile.addEventListener('click', () => closePopup(popupEditProfile));

// ждем клик по кнопке Х в форме AddGallery
buttonClosePopupAddGallery.addEventListener('click', () => closePopup(popupAddGallery));

// ждем клик по кнопке Х в popupFullScreen
buttonCloseFullScreen.addEventListener('click', () => closePopup(popupFullScreen));


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