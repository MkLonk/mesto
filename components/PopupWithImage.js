/*
Класс PopupWithImage наследует от Popup.
Служит для попапа который скрывает полноэкранную картинку с картчки.

Помимо селектора попапа принимает в конструктор объект с данными data.
Объект data содержит линк и подпись к картинке которую нужно показать на полном экране.
*/

import Popup from './Popup.js'

export default class PopupWithImage extends Popup {

  constructor(data, selectorPopup) {
    super(selectorPopup);

    this._popup = document.querySelector(selectorPopup);
    this._linkImage = data.link;
    this._titleImage = data.name;
  }


  open() {
    const cellFullScreenImage = this._popup.querySelector('.full-screen__image');
    const cellFullScreenTitle = this._popup.querySelector('.full-screen__caption');

    cellFullScreenImage.src = this._linkImage;
    cellFullScreenImage.alt = this._titleImage;
    cellFullScreenTitle.textContent = this._titleImage;

    return super.open()
  }
}