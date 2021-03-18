/*
Класс Popup отвечает за открытие и закрытие попапа.
  - принимает в конструктор селектор selectorPopup с которым предстоит работать

Метод open() открывает попап и вышает на него все необходимые слушатели событий  
Метод close() закрывает попап и снимает слушатели (те которые нужно снять)
*/

export default class Popup {

  constructor(selectorPopup) {
    this._popup = document.querySelector(selectorPopup);
    this._handleEscClose = this._handleEscClose.bind(this)
  }

  open() {
    this._popup.classList.add('popup_opened');
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keyup', this._handleEscClose);
  }

  _handleEscClose(evt) {
    evt.preventDefault();

    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _missClick() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) this.close();
    });
  }

  setEventListeners() {
    this._popup.querySelector('.popup__button-close').addEventListener('click', this.close.bind(this));
    this._missClick();

    document.addEventListener('keyup', this._handleEscClose);
  }

}