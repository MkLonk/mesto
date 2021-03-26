/*
Класс Card создает карточку с картинкой и подписью к ней.
  - первым параметром принимает объект data содержащий данные с названием и ссылкой на картинку
  - вторым параметром принимает селектор шаблона из которого необходимо клонировать контент
  - третий параметр принимает функцию handleCardClick, она отвечает за действие при клике по картинке

Метод createCard() возвращает полностью готовую для вставки разметку карточки. 
*/

export default class Card {

  constructor(data, selectorTemplate, { handleCardClick, handleDelete, handleLike }) {
    this._dataLinkImage = data.link;
    this._dataTitleImage = data.name;
    this._dataLikeCounter = data.likes.length; //длина массива лайков
    this._dataIdAutur = data.owner._id; //id автора карточки
    this._cardId = ''//id новой карточки
    this._dataLikes = data.likes // массив лайков

    this._handleCardClick = handleCardClick.bind(this);
    this._handleDelete = handleDelete.bind(this)
    this._handleLike = handleLike.bind(this)

    this._handleLikeClick = this._handleLikeClick.bind(this)

    this._galleryElement = document.querySelector(selectorTemplate).content.cloneNode(true);
    this._popupFullScreen = document.querySelector('.popup_full-screen');

    //элемент DOM с кнопкой like
    this._buttonLike = this._galleryElement.querySelector('.card__like')

    // ячейки приема данных
    this._cellImage = this._galleryElement.querySelector('.card__image');
    this._cellTitle = this._galleryElement.querySelector('.card__caption');
    this._cellLikeCounter = this._galleryElement.querySelector('.card__like-counter');
    this._cellDeleteIcon = this._galleryElement.querySelector('.card__delete');

  };

  _handleLikeClick(evt) {
    evt.target.classList.toggle('card__like_active');
    const cellLikeCounter = evt.target.closest('.card__like-container').querySelector('.card__like-counter')
    const counter = Number(cellLikeCounter.textContent)
    if (evt.target.classList.contains('card__like_active')) {
      cellLikeCounter.textContent = counter + 1;
      return true;
    } else {
      cellLikeCounter.textContent = counter - 1;
      return false;
    }
  }

  _setEventListeners() {
    //this._galleryElement.querySelector('.card__like').addEventListener('click', this._handleLikeClick);
    this._galleryElement.querySelector('.card__like').addEventListener('click', this._handleLike);
    this._galleryElement.querySelector('.card__image').addEventListener('click', this._handleCardClick);
    this._galleryElement.querySelector('.card__delete').addEventListener('click', this._handleDelete);
  }

  /*   getCardId() {
      return this._cardId
    } */

  createCard(cardId) { // создаем новую карточку

    this._cellImage.src = this._dataLinkImage; // link на фото
    this._cellImage.alt = this._dataTitleImage; // alt фото
    this._cellTitle.textContent = this._dataTitleImage; // caption фото
    this._cellLikeCounter.textContent = this._dataLikeCounter; // кол-во лайков

    //если автор карточки Вы, показать уконку удаления
    if (this._dataIdAutur === '6cbeb70e06621067767a5289') {
      this._cellDeleteIcon.style.display = 'block';
    }

    //если в массиве лайков есть Вы, то закрасить лайк
    this._dataLikes.forEach(like => {
      if (like._id === '6cbeb70e06621067767a5289') {
        this._buttonLike.classList.add('card__like_active')
      }
    })

    this._cardId = cardId
    this._setEventListeners();

    return this._galleryElement; // возвращаем полностью готовую карточку
  };
};