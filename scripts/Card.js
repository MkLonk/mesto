import { hotKeys } from './hotKeys.js';

export class Card {

  // переменные с данными
  _dataLinkImage;
  _dataTitleImage;

  _template; // шаблон
  _popupFullScreen; // попап полноэкранной картинки
  _esc = hotKeys.esc; //

  constructor(data, selectorTemplate) {
    this._dataLinkImage = data.link;
    this._dataTitleImage = data.name;

    this._template = document.querySelector(selectorTemplate).content;
    this._popupFullScreen = document.querySelector('.popup_full-screen');
  };

  _openPopup() {
    this._popupFullScreen.classList.add('popup_opened');

    this._eventClickClose(this._popupFullScreen); // ждем клик по кнопке 'закрыть'
    this._eventClickMiss(this._popupFullScreen); // ждем клик мимо картинки
    this._handleEscUp() // ждем нажание клавиши Esc
  };

  _closePopup() {
    this._popupFullScreen.classList.remove('popup_opened');
  };

  _handleEscUp() {

    const _eventEsc = (evt) => {

      evt.preventDefault();

      if (evt.key === this._esc) {
        this._closePopup()
        document.removeEventListener('keyup', _eventEsc);
      }
    }
    document.addEventListener('keyup', _eventEsc);
  };

  _eventClickMiss(missElement) {
    missElement.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) this._closePopup();
    });
  };

  _eventClickClose(clickElement) { // клик по лайку
    clickElement.querySelector('.popup__button-close').addEventListener('click', () => this._closePopup());
  };

  _eventClickLike(clickElement) { // клик по лайку
    clickElement.querySelector('.card__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__like_active');
    });
  };

  _eventClickDelete(clickElement) { // клик по корзине
    clickElement.querySelector('.card__delete').addEventListener('click', (evt) => {
      evt.target.closest('.gallery__element').remove();
    });

  };

  _eventClickImage(clickElement) { // клик по картинке

    clickElement.querySelector('.card__image').addEventListener('click', () => {
      // перед открытием заполняем попап popupFullScreen данными
      const popupFullScreen = document.querySelector('.popup_full-screen');
      const cellFullScreenImage = popupFullScreen.querySelector('.full-screen__image');
      const cellFullScreenTitle = popupFullScreen.querySelector('.full-screen__caption');

      cellFullScreenImage.src = this._dataLinkImage;
      cellFullScreenImage.alt = this._dataTitleImage;
      cellFullScreenTitle.textContent = this._dataTitleImage;

      // открываем готовый попап
      this._openPopup(popupFullScreen);
    });
  };

  _createCard() { // создаем новую карточку

    const galleryElement = this._template.cloneNode(true); // клонируем html из шаблона (this._template)
    const cellImage = galleryElement.querySelector('.card__image');
    const cellTitle = galleryElement.querySelector('.card__caption');

    cellImage.src = this._dataLinkImage; // link на фото
    cellImage.alt = this._dataTitleImage; // alt фото
    cellTitle.textContent = this._dataTitleImage; // caption фото

    // методы необходимые новой карточке 
    this._eventClickLike(galleryElement);
    this._eventClickDelete(galleryElement);
    this._eventClickImage(galleryElement);

    return galleryElement;
  };

  generateCard(insert = 'down') { // генерируем и добавляем новую карту вначало или конец галереи
    if (insert == 'up') {
      return document.querySelector('.gallery__photo-grid').
        prepend(this._createCard());

    } else {
      return document.querySelector('.gallery__photo-grid').
        append(this._createCard());
    }
  };
};