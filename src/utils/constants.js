// находим блок "profile" в DOM
const profile = document.querySelector('.profile');

// находим в "profile" кнопки EditProfile и AddGallery
export const buttonEditProfile = profile.querySelector('.profile__button-edit');
export const buttonAddGallery = profile.querySelector('.profile__button-add');

// объект settingsFormValid содержит селекторы для настройки валидации  
export const settingsFormValid = {
  selectorInput: '.form__input',
  selectorSubmitButton: '.form__button-save',
  selectorInactiveButton: 'form__button_inactive', // клас для делающий кнопку не активной
  selectorInputError: 'form__input_type_error', // класс добавляемый если инпут с ошибкой
  selectorErrorSuffix: 'error' //id сообщения c ошибкой
}

// массив dataCards содержит объекты с данными о существующих карточках
export const dataCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];