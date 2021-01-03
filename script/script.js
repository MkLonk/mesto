//переменные блока profile
const profile = document.querySelector('.profile'); //находим блок "profile" в DOM
const buttonEdit = profile.querySelector('.profile__button-edit'); //находим кнопку button-edit в блоке "profile"
const buttonAdd = profile.querySelector('.profile__button-add'); //находим кнопку button-add в блоке "profile"
const userName = profile.querySelector('.profile__user-name'); //находим userName в блоке "profile"
const userJob = profile.querySelector('.profile__user-job'); //находим userJob в блоке "profile"

//переменные блока popup-edit-profile
const popupEditProfile = document.querySelector('.popup-edit-profile'); // находим блок "popup-edit-profile" в DOM
const formProfile = popupEditProfile.querySelector('.popup__form'); // находим форму "popup__container" в блоке "popup-edit-profile"
const buttonCloseProfile = formProfile.querySelector('.popup__button-close'); //находим кнопку button-close в "formPopup"
const userNameInput = formProfile.querySelector('.popup__input_user_name'); //находим в "formPopup" поле popup__input_user_name
const userJobInput = formProfile.querySelector('.popup__input_user_job'); //находим в "formPopup" поле popup__input_user_job

//переменные блока-шаблона popup-add-gallery
const popupAddGallery = document.querySelector('.popup-add-gallery'); // ищем блок "popup-add-gallery" в DOM
const formGallery = popupAddGallery.querySelector('.popup__form');
const buttonCloseGallery = formGallery.querySelector('.popup__button-close');
const mestoNameInput = formGallery.querySelector('.popup__input_mesto_name');
const mestoLinkInput = formGallery.querySelector('.popup__input_mesto_link');

//переменные блока card-template
const galleryElementTemplate = document.querySelector('.card-template').content; //находим блок-шаблон "card-template" в DOM
const galleryContainer = document.querySelector('.gallery__photo-grid'); //находим контейнер для карт "card-template" в DOM


// Функция заполнения Галереи элементами
function fillGallery(nameImage, linkImage, insert = 'append') {

  const galleryElement = galleryElementTemplate.cloneNode(true); // клонируем из шаблона
  galleryElement.querySelector('.card__image').src = linkImage; // url фото
  galleryElement.querySelector('.card__caption').textContent = nameImage; // caption фото

  galleryElement.querySelector('.card__like').addEventListener('click', function (evt) { // вешаем слушатель на лайк
    const eventTarget = evt.target;
    eventTarget.classList.toggle('card__like_active');
  });

  galleryElement.querySelector('.card__delete').addEventListener('click', function (evt) { // вешаем слушатель на delete
    const deleteElement = evt.target.closest('.gallery__element')    
    deleteElement.remove()
  });

  if (insert === 'prepend') {
    galleryContainer.prepend(galleryElement); // отображаем на странице
  } else {
    galleryContainer.append(galleryElement);
  }
}

// Функция открытия popup Profile
function openPopupProfile() {
  userNameInput.value = userName.textContent; // подставляем в поле user-input сохраненой имя пользователя
  userJobInput.value = userJob.textContent; // подставляем в поле job-input сохраненую профессию пользователя
  popupEditProfile.classList.add('popup_opened');
}

// Функция открытия popup Gallery
function openPopupGallery() {
  popupAddGallery.classList.add('popup_opened');
}

// Функция закрытия popup Profile
function closePopupProfile() {
  popupEditProfile.classList.remove('popup_opened');
}

// Функция закрытия popup Gallery
function closePopupGallery() {
  popupAddGallery.classList.remove('popup_opened');
}

// Функция для закрытия popup Profil, если клик за границами формы
function clikMissPopupProfile(evt) {
  if (evt.target === evt.currentTarget) {
    closePopupProfile();
  }
}

// Функция для закрытия popup Gallery, если клик за границами формы
function clikMissPopupGallery(evt) {
  if (evt.target === evt.currentTarget) {
    closePopupGallery();
  }
}

// Функция сохренения данных из формы "popup__form" блока popup-edit-profile
function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value; // сохраняем значение поля user-name-input на странице
  userJob.textContent = userJobInput.value; // сохраняем значение поля user-job-input на странице
  closePopupProfile(); // закрываем popup после изменений
}

// Функция сохренения данных из формы "popup__form" блока popup-add-gallery
function handleFormGallerySubmit(evt) {
  evt.preventDefault();
  fillGallery(mestoNameInput.value, mestoLinkInput.value, 'prepend'); // через функцию  fillGallery да
  closePopupGallery(); // закрываем popup Gallery после изменений
}

// заполняем галерею элементами из массива initialCards, через функцию  fillGallery()
initialCards.forEach(element => fillGallery(element.name, element.link));

// Все слушатели
buttonEdit.addEventListener('click', openPopupProfile); // ждем клик по кнопке button-edit
buttonAdd.addEventListener('click', openPopupGallery); // ждем клик по кнопке button-add

buttonCloseProfile.addEventListener('click', closePopupProfile); // ждем клик по кнопке button-close в блоке "popup"
buttonCloseGallery.addEventListener('click', closePopupGallery); // ждем клик по кнопке button-close в блоке "popup"

popupEditProfile.addEventListener('click', clikMissPopupProfile) // ждем клик за границами формы popup Profile
popupAddGallery.addEventListener('click', clikMissPopupGallery) // ждем клик за границами формы popup Gallery

formProfile.addEventListener('submit', handleFormProfileSubmit); // ждем клик по кнопке "сохранить" в блоке "popup"
formGallery.addEventListener('submit', handleFormGallerySubmit); // ждем клик по кнопке "сохранить" в блоке "popup"