/*
Класс Card создает карточку с картинкой и подписью к ней.
  - первым параметром принимает объект data содержащий данные с названием и ссылкой на картинку
  - вторым параметром принимает селектор шаблона из которого необходимо клонировать контент
  - третий параметр принимает функцию handleCardClick, она отвечает за действие при клике по картинке

Метод createCard() возвращает полностью готовую для вставки разметку карточки. 
*/

export default class Card {

  constructor(data, selectorTemplate, handleCardClick) {
    this._dataLinkImage = data.link;
    this._dataTitleImage = data.name;
    this._handleCardClick = handleCardClick;

    this._galleryElement = document.querySelector(selectorTemplate).content.cloneNode(true);;
    this._popupFullScreen = document.querySelector('.popup_full-screen');
  };

  _eventClickLike() { // клик по лайку
    this._galleryElement.querySelector('.card__like').addEventListener('click', (evt) => {
      evt.target.classList.toggle('card__like_active');
    });
  };

  _eventClickDelete() { // клик по корзине
    this._galleryElement.querySelector('.card__delete').addEventListener('click', (evt) => {
      evt.target.closest('.gallery__element').remove();
    });
  };

  _eventClickImage() { // клик по картинке
    this._galleryElement.querySelector('.card__image')
      .addEventListener('click', this._handleCardClick.bind(this))
  };

  createCard() { // создаем новую карточку
    const cellImage = this._galleryElement.querySelector('.card__image');
    const cellTitle = this._galleryElement.querySelector('.card__caption');

    cellImage.src = this._dataLinkImage; // link на фото
    cellImage.alt = this._dataTitleImage; // alt фото
    cellTitle.textContent = this._dataTitleImage; // caption фото

    // методы необходимые новой карточке 
    this._eventClickLike();
    this._eventClickDelete();
    this._eventClickImage();

    return this._galleryElement;
  };

};