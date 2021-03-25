/*
Класс Card создает карточку с картинкой и подписью к ней.
  - первым параметром принимает объект data содержащий данные с названием и ссылкой на картинку
  - вторым параметром принимает селектор шаблона из которого необходимо клонировать контент
  - третий параметр принимает функцию handleCardClick, она отвечает за действие при клике по картинке

Метод createCard() возвращает полностью готовую для вставки разметку карточки. 
*/

export default class Card {

  constructor(data, selectorTemplate, {handleCardClick, handleDeleteClick}) {
    this._dataLinkImage = data.link;
    this._dataTitleImage = data.name;
    this._dataLikeCounter = data.likes.length; //длина массива лайков
    this._dataIdAutur = data.owner._id; //id автора карточки
    //this._cardId = data._id; //id карточки


    this._handleCardClick = handleCardClick.bind(this);
    this._handleDeleteClick = handleDeleteClick.bind(this)
    this._handleLikeClick = this._handleLikeClick.bind(this)

    this._galleryElement = document.querySelector(selectorTemplate).content.cloneNode(true);
    this._popupFullScreen = document.querySelector('.popup_full-screen');
  };

  _handleLikeClick(evt) {
    evt.target.classList.toggle('card__like_active');
  }

  _handleDeleteClick(evt) {
    evt.target.closest('.gallery__element').remove();
  }

  _setEventListeners() {
    this._galleryElement.querySelector('.card__like').addEventListener('click', this._handleLikeClick);
    /* this._galleryElement.querySelector('.card__delete').addEventListener('click', this._handleDeleteClick); */
    this._galleryElement.querySelector('.card__image').addEventListener('click', this._handleCardClick);
    this._galleryElement.querySelector('.card__delete').addEventListener('click', this._handleDeleteClick);
  }

  getCardId() {
    return this._cardId
  }

  createCard() { // создаем новую карточку
    const cellImage = this._galleryElement.querySelector('.card__image');
    const cellTitle = this._galleryElement.querySelector('.card__caption');
    const cellLikeCounter = this._galleryElement.querySelector('.card__like-counter');
    const cellDeleteIcon = this._galleryElement.querySelector('.card__delete');

    cellImage.src = this._dataLinkImage; // link на фото
    cellImage.alt = this._dataTitleImage; // alt фото
    cellTitle.textContent = this._dataTitleImage; // caption фото
    cellLikeCounter.textContent = this._dataLikeCounter; // кол-во лайков

    //если автор карточки Вы, показать уконку удаления
    if (this._dataIdAutur === '6cbeb70e06621067767a5289') {
      cellDeleteIcon.style.display = 'block';
    }

    this._setEventListeners();

    return this._galleryElement; // возвращаем полностью готовую карточку
  };
};