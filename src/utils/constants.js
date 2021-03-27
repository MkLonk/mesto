// находим блок "profile" в DOM
const profile = document.querySelector('.profile');

// находим в "profile" все кнопки EditAvatar, EditProfile и AddGallery
export const buttonEditProfile = profile.querySelector('.profile__button-edit');
export const buttonAddGallery = profile.querySelector('.profile__button-add');
export const buttonEditAvatar = profile.querySelector('.profile__button-avatar-edit');

// объект settingsFormValid содержит селекторы для настройки валидации  
export const settingsFormValid = {
  selectorInput: '.form__input',
  selectorSubmitButton: '.form__button-save',
  selectorInactiveButton: 'form__button_inactive', // клас для делающий кнопку не активной
  selectorInputError: 'form__input_type_error', // класс добавляемый если инпут с ошибкой
  selectorErrorSuffix: 'error' //id сообщения c ошибкой
}

// объект конфиг для апи
export const configApi = {
  url: 'https://mesto.nomoreparties.co/v1',
  team: 'cohort-21',

  token: 'd2c4a281-6574-4525-818c-4a265919f89d',
}