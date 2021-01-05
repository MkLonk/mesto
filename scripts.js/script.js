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

// popup-full-screen-element
const popupFullScreen = document.querySelector('.popup-full-screen-element'); //ищем popup-full-screen-element
const buttonClosePopupFullScreen = popupFullScreen.querySelector('.popup__button-close');
const fullScreenImage = popupFullScreen.querySelector('.full-screen-element__image');
const fullScreenCaption = popupFullScreen.querySelector('.full-screen-element__caption');

// ----- Функции ----- //
// Функция создания новой карточки для галереи. Возвращает готовый для вставки galleryElement
function createCard(nameImage, linkImage) {

  const galleryElement = cardTemplate.cloneNode(true); // клонируем из шаблона

  galleryElement.querySelector('.card__image').src = linkImage; // фото для миниатюры
  galleryElement.querySelector('.card__image').alt = nameImage; // alt фото для миниатюры
  galleryElement.querySelector('.card__caption').textContent = nameImage; // caption фото


  // вешаем слушатель на лайк
  galleryElement.querySelector('.card__like').addEventListener('click', function (evt) {
    const eventTarget = evt.target;
    eventTarget.classList.toggle('card__like_active');
  });

  // вешаем слушатель на delete
  galleryElement.querySelector('.card__delete').addEventListener('click', function (evt) {
    const deleteElement = evt.target.closest('.gallery__element');
    deleteElement.remove();
  });

  // вешаем слушатель на клик по картинке card__image
  galleryElement.querySelector('.card__image').addEventListener('click', function (evt) {
    openPopupFullScreen(nameImage, linkImage)
  });

  return galleryElement;
}

// Функция вставки элемента (card) в начало или конец galleryContainer 
function addCard(card, insert = 'append') {
  if (insert === 'prepend') {
    galleryContainer.prepend(card);
  } else {
    galleryContainer.append(card);
  }
}

// Функция сохренения данных из form_edit-profile
function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value; // сохраняем значение поля user-name-input на странице
  userJob.textContent = userJobInput.value; // сохраняем значение поля user-job-input на странице
  popupEditProfile.classList.remove('popup_opened'); // закрываем popup после изменений
}

// Функция сохренения данных из form_add-gallery
function handleFormGallerySubmit(evt) {
  evt.preventDefault();
  addCard(createCard(mestoNameInput.value, mestoLinkInput.value), 'prepend');
  popupAddGallery.classList.remove('popup_opened'); // закрываем popup Gallery после изменений
}

// Функция открытия попапа PopupFullScreen, открывает кртинку nameImage, по ссылке linkImage 
function openPopupFullScreen(nameImage, linkImage) {

  fullScreenImage.src = linkImage;
  fullScreenImage.alt = nameImage;
  fullScreenCaption.textContent = nameImage;

  popupFullScreen.classList.add('popup_opened');
}

// ----- Заполняем галерею ----- //
initialCards.forEach(element => {
  const newCard = createCard(element.name, element.link);
  addCard(newCard);
});

// ----- Слушатели ----- //
// --- Клики открывающие попапы с формами ---
buttonEditProfile.addEventListener('click', () => { //ждем клик по кнопке button-edit
  userNameInput.value = userName.textContent; // подставляем в поле user-input сохраненой имя пользователя
  userJobInput.value = userJob.textContent; // подставляем в поле job-input сохраненую профессию пользователя
  popupEditProfile.classList.add('popup_opened');
});

buttonAddGallery.addEventListener('click', () => { // ждем клик по кнопке button-add
  popupAddGallery.classList.add('popup_opened');
});

// --- Клики по кнопке Х ---
buttonClosePopupEditProfile.addEventListener('click', () => { // ждем клик по кнопке Х в форме EditProfile
  popupEditProfile.classList.remove('popup_opened'); 
});

buttonClosePopupAddGallery.addEventListener('click', () => { // ждем клик по кнопке Х в форме AddGallery
  popupAddGallery.classList.remove('popup_opened');
});

buttonClosePopupFullScreen.addEventListener('click', () => { // ждем клик по кнопке Х в popupFullScreen
  popupFullScreen.classList.remove('popup_opened');
});

// --- Клики за границы ---
popupEditProfile.addEventListener('click', (evt) => { // ждем клик за границами формы EditProfile
  if (evt.target === evt.currentTarget) {
    popupEditProfile.classList.remove('popup_opened');
  }
});

popupAddGallery.addEventListener('click', (evt) => { // ждем клик за границами формы AddGallery
  if (evt.target === evt.currentTarget) {
    popupAddGallery.classList.remove('popup_opened');
  }
});

popupFullScreen.addEventListener('click', (evt) => { // ждем клик за границами popupFullScreen
  if (evt.target === evt.currentTarget) {
    popupFullScreen.classList.remove('popup_opened');
  }
});

// --- Клики по кнопке Сохранить (отправить форму) ---
formProfile.addEventListener('submit', handleFormProfileSubmit); // ждем клик "сохранить" в форме Profile
formGallery.addEventListener('submit', handleFormGallerySubmit); // ждем клик "сохранить" в форме Gallery