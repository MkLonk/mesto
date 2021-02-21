// объект с настройками для валидации форм 
const settingsForm = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button-save',
  inactiveButtonClass: 'form__button_inactive', // клас для делающий кнопку не активной
  inputErrorClass: 'form__input_type_error', // класс добавляемый если инпут с ошибкой
  errorClassSuffix: 'error' //id сообщения c ошибкой
}


// функция показа сообщения об ошибке в инпуте
const showInputError = (formElement, inputElement, errorMessage, objSettingForm) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-${objSettingForm.errorClassSuffix}`);
  errorElement.textContent = errorMessage;

  inputElement.classList.add(objSettingForm.inputErrorClass);
};


// функция скрытия сообщения об ошибке в инпуте
const hideInputError = (formElement, inputElement, objSettingForm) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-${objSettingForm.errorClassSuffix}`);
  errorElement.textContent = '';

  inputElement.classList.remove(objSettingForm.inputErrorClass);
};


// функция проверки полей на ошибки (валидация полей)
const checkInputValidity = (formElement, inputElement, objSettingForm) => {

  if (!inputElement.validity.valid) { // если validity.valid ложь, показать ошибку
    showInputError(formElement, inputElement, inputElement.validationMessage, objSettingForm);
  } else { // иначе скрыть ошибку
    hideInputError(formElement, inputElement, objSettingForm);
  }
};


// функция проверки массива инпутов на валидновть, возвращает true или folse
const hasInvalidInput = (inputList) => {

  return inputList.some((inputElement) => {

    return !inputElement.validity.valid;
  });
}


// функция переключения активности кнопки
const toggleButtonState = (inputList, buttonElement, objSettingForm) => { // принимаем массив инпутов, кнопку
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(objSettingForm.inactiveButtonClass);
    buttonElement.setAttribute('disabled', true);
  } else {
    buttonElement.classList.remove(objSettingForm.inactiveButtonClass);
    buttonElement.removeAttribute('disabled');
  }
};


// сет слушателей
const setEventListeners = (formElement, objSettingForm) => {

  const inputList = Array.from(formElement.querySelectorAll(objSettingForm.inputSelector)); //собираем массив инпутов
  const buttonElement = formElement.querySelector(objSettingForm.submitButtonSelector); // ищем сабмит в форме

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, objSettingForm); // проверяем валидность инпута
      toggleButtonState(inputList, buttonElement, objSettingForm); // переключаем активность кнопки
    });
  });
};


const enableValidation = (objSettingForm) => {

  const formList = Array.from(document.querySelectorAll(objSettingForm.formSelector)); // собираем массив всех форм
  formList.forEach((formElement) => { // проходим по массиву formList
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault(); //всем формам отменяем событие submit по умолчанию
    });

    setEventListeners(formElement, objSettingForm) // 
  });
};

enableValidation(settingsForm);