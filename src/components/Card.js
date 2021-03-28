/****************************************
 * Класс Card создает карточку с картинкой и подписью к ней.
 * 
 * - первым параметром принимает объект data содержащий данные с названием и ссылкой на картинку
 * - вторым параметром принимает селектор шаблона из которого необходимо клонировать контент
 * - третий параметр принимает функцию handleCardClick, она отвечает за действие при клике по картинке
 * 
 * Метод createCard() возвращает полностью готовую для вставки разметку карточки. 
****************************************/

export default class Card {

  constructor(data, selectorTemplate, { handleCardClick, handleDelete, handleLike }, idAuthorizedUser) {

    // разбираем объект data
    this._linkImage = data.link;
    this._titleImage = data.name;
    this._likesArr = data.likes // массив лайков
    this._dataLikeCounter = data.likes.length; //длина массива лайков
    this._idAutur = data.owner._id; //id автора карточки
    this._cardId = data._id // id создоваемой карточки

    this._idAuthorizedUser = idAuthorizedUser // id авторизованного пользователя
    this.isLiked = false // есть ли у карточки Ваш лайк

    // входящие функции
    this._handleCardClick = handleCardClick.bind(this);
    this._handleDelete = handleDelete.bind(this)
    this._handleLike = handleLike.bind(this)

    // разбираем DOM элементы
    this._galleryElement = document.querySelector(selectorTemplate).content.cloneNode(true);
    this._buttonLike = this._galleryElement.querySelector('.card__like') // кнопка like
    // ячейки приема данных
    this._cellImage = this._galleryElement.querySelector('.card__image');
    this._cellTitle = this._galleryElement.querySelector('.card__caption');
    this._cellLikeCounter = this._galleryElement.querySelector('.card__like-counter');
    this._cellDeleteIcon = this._galleryElement.querySelector('.card__delete');

  };


  /****************************************
   * Приватные методы
  ****************************************/

  // Сет слушателей. Клики по элементам карточки вызывают соответствующие колбэк функции
  _setEventListeners() {
    this._galleryElement.querySelector('.card__like').addEventListener('click', this._handleLike);
    this._galleryElement.querySelector('.card__image').addEventListener('click', this._handleCardClick);
    this._galleryElement.querySelector('.card__delete').addEventListener('click', this._handleDelete);
  }


  /****************************************
   * Публичные методы
  ****************************************/

  // метод для переключения активности лайка, изменяет вид кнопки и значение счетчика
  toggleLike(evt) {
    evt.target.classList.toggle('card__like_active');

    const cellLikeCounter = evt.target.closest('.card__like-container').querySelector('.card__like-counter');
    const counter = Number(cellLikeCounter.textContent);

    if (this.isLiked) {
      cellLikeCounter.textContent = counter - 1;
    } else {
      cellLikeCounter.textContent = counter + 1;
    }
  }

  // метод для удаления карточки из галерии
  removeCard(evt) {
    evt.target.closest('.gallery__element').remove();
  }

  // метод возвращает id карточки
  getId() {
    return this._cardId;
  }

  // метод возвращает полностью готовую для вставки разметку карточки
  createCard() {

    this._cellImage.src = this._linkImage; // link на фото
    this._cellImage.alt = this._titleImage; // alt фото
    this._cellTitle.textContent = this._titleImage; // caption фото
    this._cellLikeCounter.textContent = this._dataLikeCounter; // кол-во лайков

    //если автор карточки Вы, показать уконку удаления
    if (this._idAutur === this._idAuthorizedUser) {
      this._cellDeleteIcon.style.display = 'block';
    }

    //если в массиве лайков есть Вы, сделать лайк автивным (закрасить)
    this._likesArr.forEach(like => {
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