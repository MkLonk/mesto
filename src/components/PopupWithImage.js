/*
Класс PopupWithImage наследует от Popup.
Служит для попапа который скрывает полноэкранную картинку с картчки.

Помимо селектора попапа принимает в конструктор объект с данными data.
Объект data содержит линк и подпись к картинке которую нужно показать на полном экране.
*/

import Popup from './Popup.js'

export default class PopupWithImage extends Popup {

  constructor(selectorPopup) {
    super(selectorPopup);
  }


  open(data) {
    const cellFullScreenImage = this._popup.querySelector('.full-screen__image');
    const cellFullScreenTitle = this._popup.querySelector('.full-screen__caption');

    cellFullScreenImage.src = data.link;
    cellFullScreenImage.alt = data.name;
    cellFullScreenTitle.textContent = data.name;

    return super.open()
  }
}