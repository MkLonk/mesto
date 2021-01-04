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

//переменные блока card-template (шаблона card) 
const galleryElementTemplate = document.querySelector('.card-template').content; //находим блок-шаблон "card-template"
const galleryContainer = document.querySelector('.gallery__photo-grid'); //находим контейнер для карт "card-template"


// Функция заполнения галереи элементами
function fillGallery(nameImage, linkImage, insert = 'append') {
  const galleryElement = galleryElementTemplate.cloneNode(true); // клонируем из шаблона

  galleryElement.querySelector('.card__image').src = linkImage; // url фото для миниатюры
  galleryElement.querySelector('.card__caption').textContent = nameImage; // caption фото
  galleryElement.querySelector('.card__image-full').src = linkImage; // url фото для полного экрана
  galleryElement.querySelector('.card__caption-full').textContent = nameImage; // caption для полного экрана

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
    const popupGalleryElement = evt.target.closest('.gallery__element').querySelector('.popup-gallery-element');
    popupGalleryElement.classList.add('popup_opened');
  });

  // вешаем слушатель на клик по button-close на картинке открытого попапа
  galleryElement.querySelector('.popup__button-close').addEventListener('click', function (evt) {
    const closePopupGalleryElement = evt.target.closest('.popup-gallery-element');
    closePopupGalleryElement.classList.remove('popup_opened')
  });

  // вешаем слушатель на клик за границами картинки при открытом попапе
  galleryElement.querySelector('.popup-gallery-element').addEventListener('click', function (evt) {
    evt.target.classList.remove('popup_opened');
  });


  // отображаем элемент вконце, или начале галереи
  if (insert === 'prepend') {
    galleryContainer.prepend(galleryElement);
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

// Функция закрытия popup Profil, если клик за границами формы
function clikMissPopupProfile(evt) {
  if (evt.target === evt.currentTarget) {
    closePopupProfile();
  }
}

// Функция закрытия popup Gallery, если клик за границами формы
function clikMissPopupGallery(evt) {
  if (evt.target === evt.currentTarget) {
    closePopupGallery();
  }
}

// Функция сохренения данных из form_edit-profile
function handleFormProfileSubmit(evt) {
  evt.preventDefault();
  userName.textContent = userNameInput.value; // сохраняем значение поля user-name-input на странице
  userJob.textContent = userJobInput.value; // сохраняем значение поля user-job-input на странице
  closePopupProfile(); // закрываем popup после изменений
}

// Функция сохренения данных из form_add-gallery
function handleFormGallerySubmit(evt) {
  evt.preventDefault();
  fillGallery(mestoNameInput.value, mestoLinkInput.value, 'prepend'); // через функцию  fillGallery да
  closePopupGallery(); // закрываем popup Gallery после изменений
}

// заполняем галерею элементами массива initialCards, через функцию  fillGallery()
initialCards.forEach(element => fillGallery(element.name, element.link));

// Все слушатели
buttonEditProfile.addEventListener('click', openPopupProfile); // ждем клик по кнопке button-edit
buttonAddGallery.addEventListener('click', openPopupGallery); // ждем клик по кнопке button-add

buttonClosePopupEditProfile.addEventListener('click', closePopupProfile); // ждем клик по button-close в форме Profile
buttonClosePopupAddGallery.addEventListener('click', closePopupGallery); // ждем клик по button-close в форме Gallery

popupEditProfile.addEventListener('click', clikMissPopupProfile) // ждем клик за границами формы Profile
popupAddGallery.addEventListener('click', clikMissPopupGallery) // ждем клик за границами формы Gallery

formProfile.addEventListener('submit', handleFormProfileSubmit); // ждем клик "сохранить" в форме Profile
formGallery.addEventListener('submit', handleFormGallerySubmit); // ждем клик "сохранить" в форме Gallery