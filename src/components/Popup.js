/*
Класс Popup отвечает за открытие и закрытие попапа.
  - принимает в конструктор селектор selectorPopup с которым предстоит работать

Метод open() открывает попап и вышает на него все необходимые слушатели событий  
Метод close() закрывает попап и снимает слушатели (те которые нужно снять)
*/

export default class Popup {

  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
    this._buttonClose = this._popup.querySelector('.popup__button-close');

    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleClickMiss = this._handleClickMiss.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    
    this._buttonClose.removeEventListener('click', this.close);
    this._popup.removeEventListener('click', this._handleClickMiss);
    document.removeEventListener('keyup', this._handleEscClose);

  }

  _handleEscClose(evt) {
    evt.preventDefault();
    if (evt.key === 'Escape') this.close();
  }

  _handleClickMiss(evt) {
    if (evt.target === evt.currentTarget) this.close();
  }

  setEventListeners() {
    this._buttonClose.addEventListener('click', this.close);
    this._popup.addEventListener('click', this._handleClickMiss);

    document.addEventListener('keyup', this._handleEscClose);
  }

}