/****************************************
 * Класс PopupWithImage наследует от Popup.
 * Служит для попапа который скрывает полноэкранную картинку картчки.
 *
 * Помимо селектора попапа принимает в конструктор объект с данными (data).
 * Объект data содержит линк и подпись к картинке которую нужно показать в полноэкранном экране.
****************************************/

import Popup from './Popup.js'

export default class PopupWithImage extends Popup {

  constructor(selectorPopup) {
    super(selectorPopup);

    // ячейки для приема данных
    this._cellFullScreenImage = this._popup.querySelector('.full-screen__image');
    this._cellFullScreenTitle = this._popup.querySelector('.full-screen__caption');
  }

  open(data) {
    this._cellFullScreenImage.src = data.link;
    this._cellFullScreenImage.alt = data.name;
    this._cellFullScreenTitle.textContent = data.name;

    return super.open()
  }
}