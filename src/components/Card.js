/*
Класс Card создает карточку с картинкой и подписью к ней.
  - первым параметром принимает объект data содержащий данные с названием и ссылкой на картинку
  - вторым параметром принимает селектор шаблона из которого необходимо клонировать контент
  - третий параметр принимает функцию handleCardClick, она отвечает за действие при клике по картинке

Метод createCard() возвращает полностью готовую для вставки разметку карточки. 
*/

export default class Card {

<<<<<<< HEAD
  constructor(data, selectorTemplate, { handleCardClick, handleDelete, handleLike }, idAuthorizedUser) {

    // разбираем объект data
=======
  constructor(data, selectorTemplate, { handleCardClick, handleDelete, handleLike }) {
>>>>>>> 4f4cff7c03ee885614a606be7dce06dac4dbe427
    this._dataLinkImage = data.link;
    this._dataTitleImage = data.name;
    this._dataLikeCounter = data.likes.length; //длина массива лайков
    this._dataIdAutur = data.owner._id; //id автора карточки
<<<<<<< HEAD
    this._dataLikes = data.likes // массив лайков

    this._idAuthorizedUser = idAuthorizedUser // id авторизованного пользователя
    this._cardId = data._id // id новой карточки
    this.isLiked = false // есть ли лайк у карточки 
=======
    this._cardId = ''//id новой карточки
    this._dataLikes = data.likes // массив лайков
>>>>>>> 4f4cff7c03ee885614a606be7dce06dac4dbe427

    // входящие функции
    this._handleCardClick = handleCardClick.bind(this);
    this._handleDelete = handleDelete.bind(this)
    this._handleLike = handleLike.bind(this)
<<<<<<< HEAD
=======

    this._handleLikeClick = this._handleLikeClick.bind(this)
>>>>>>> 4f4cff7c03ee885614a606be7dce06dac4dbe427

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

  toggleLike(evt) {
    evt.target.classList.toggle('card__like_active');

    const cellLikeCounter = evt.target.closest('.card__like-container').querySelector('.card__like-counter')
    const counter = Number(cellLikeCounter.textContent)

    if (this.isLiked) {
      cellLikeCounter.textContent = counter - 1;
    } else {
      cellLikeCounter.textContent = counter + 1;
    }
  }

  removeCard(evt) {
    evt.target.closest('.gallery__element').remove();
  }
  /*     this._galleryElement.querySelector('.card__delete').addEventListener('click', (evt) => {
        evt.target.closest('.gallery__element').remove();
      }); */


  _setEventListeners() {
    this._galleryElement.querySelector('.card__like').addEventListener('click', this._handleLike);
    this._galleryElement.querySelector('.card__image').addEventListener('click', this._handleCardClick);
    this._galleryElement.querySelector('.card__delete').addEventListener('click', this._handleDelete);
  }

  getId() {
    return this._cardId;
  }

  createCard(cardId) { // создаем новую карточку

    this._cellImage.src = this._dataLinkImage; // link на фото
    this._cellImage.alt = this._dataTitleImage; // alt фото
    this._cellTitle.textContent = this._dataTitleImage; // caption фото
    this._cellLikeCounter.textContent = this._dataLikeCounter; // кол-во лайков

    //если автор карточки Вы, показать уконку удаления
    if (this._dataIdAutur === this._idAuthorizedUser) {
      this._cellDeleteIcon.style.display = 'block';
    }

    //если в массиве лайков есть Вы, сделать лайк автивным (закрасить)
    this._dataLikes.forEach(like => {
      if (like._id === this._idAuthorizedUser) {
        this._buttonLike.classList.add('card__like_active');
        this.isLiked = true;
        return;
      }
    })

    this._setEventListeners();

    return this._galleryElement; // возвращаем полностью готовую карточку
  };
};