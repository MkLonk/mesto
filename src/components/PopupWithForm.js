/*
Класс PopupWithForm наследует от Popup.
Служит для попапов которые скрывают формы.

Помимо селектора попапа принимает в конструктор объект с двуми функциями:
  - handleFormSubmit функция выполняется при отправке формы (например добавить карточку)
  - handleFormValidator функция выполняется когда попап открыт и форма активна 
    (напримет можно включить валидацию)
*/

import Popup from './Popup.js'

export default class PopupWithForm extends Popup {

  constructor(selectorPopup, { handleFormSubmit, handleFormValidator }) {
    super(selectorPopup);

    this._handleFormSubmit = handleFormSubmit;
    this._handleFormValidator = handleFormValidator;

    this._form = this._popup.querySelector('.form');
    this._inputList = this._form.querySelectorAll('.form__input');
    this._handleEventSubmit = this._handleEventSubmit.bind(this);
  }

  // метод _getInputValues собирает данные всех полей формы
  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => this._formValues[input.name] = input.value);

    return this._formValues;
  }

  setEventListeners() {
    this._form.addEventListener('submit', this._handleEventSubmit)
    return super.setEventListeners();
  }

  _handleEventSubmit(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues());
  }

  close() {
    this._form.reset();
    return super.close()
  }

  open() {
    this._handleFormValidator(this._form)
    return super.open()
  }
}