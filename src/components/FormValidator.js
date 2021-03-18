/* 
Класс FormValidator служат для валидации формы
  - первым параметром принимает DOM-элемент с формой, для которой необходимо выполнить валидацию.
  - вторым параметром принимает объект settings, содержащий набор селекторов для настройки.

  Метод enableValidation() включает валидацию формы (той что принята как первый параметр).
*/
export default class FormValidator {

  constructor(formSelector, settings) {
    this._form = document.querySelector(formSelector);
    this._input = settings.selectorInput;
    this._submitButton = settings.selectorSubmitButton;
    this._submitButtonInactive = settings.selectorInactiveButton;
    this._inputError = settings.selectorInputError;
    this._errorSuffix = settings.selectorErrorSuffix;

    this.buttonSubmit = this._form.querySelector(this._submitButton);
    this.inputsList = Array.from(this._form.querySelectorAll(this._input));
  }

  // метод показывает сообщения об ошибке в инпуте и меняет вид инпута (красная обводка)
  _showInputError(input, errorMessage) {
    const errorElement = this._form.querySelector(`#${input.id}-${this._errorSuffix}`);
    errorElement.textContent = errorMessage; // текст ошибки

    input.classList.add(this._inputError); // вид инпута
  };

  // метод скрывает сообщение об ошибке в инпуте и возвращает нормальный вид инпута
  _hideInputError(input) {
    const errorElement = this._form.querySelector(`#${input.id}-${this._errorSuffix}`);
    errorElement.textContent = ''; // убираем текст ошибки

    input.classList.remove(this._inputError); // вид инпута 
  };

  // метод проверки полей на ошибки (валидация полей)
  checkInputValidity(input) {

    if (!input.validity.valid) { // если validity.valid ложь, показать ошибку
      this._showInputError(input, input.validationMessage);
    } else { // иначе скрыть ошибку
      this._hideInputError(input);
    }
    return input.validity.valid
  };

  // метод проверки массива инпутов на валидновть, возвращает true или folse
  _hasValidInput() {
    return this.inputsList.some((input) => {
      return !input.validity.valid;
    });
  }

  // метод переключения активности кнопки
  toggleButtonState() { // принимаем массив инпутов, кнопку
    if (this._hasValidInput()) {
      this.buttonSubmit.classList.add(this._submitButtonInactive);
      this.buttonSubmit.setAttribute('disabled', true);
    } else {
      this.buttonSubmit.classList.remove(this._submitButtonInactive);
      this.buttonSubmit.removeAttribute('disabled');
    }
  };

  // собираем ВСЕ инпуты из form в массив inputList, в buttonSubmit записываем сабмит формы
  // после запускаем методы для проверки существующих и вновь введенных значений в инпутах
  _setEventListeners() {
    this.inputsList.forEach(input => {
      // сразу эти методы чтобы проверить существующие значения и инпутах
      this.checkInputValidity(input); // проверка в инпутах
      this.toggleButtonState(); // состояние кнопки

      // теперь вешаем эти методы для проверки инпутов при вводе значений с клавиатуры
      input.addEventListener('input', () => {
        this.checkInputValidity(input); // проверка в инпутах
        this.toggleButtonState(); // состояние кнопки
      });
    });
  };

  //  метод включает проверку формы this._form
  enableValidation() {

    this._form.addEventListener('submit', evt => {
      evt.preventDefault(); // отменяем событие submit по умолчанию
    });

    this._setEventListeners(this._form);
  };

}