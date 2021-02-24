export class Card {

  // переменные с данными
  _dataLinkImage;
  _dataTitleImage;

  // переменные со значениями селекторов (ячейки для данных)
  _template; // шаблон
  _galleryElement; // готовый элемент галереи
  _image; // ячейка картинки
  _title; // ячейка названия картинки
  _buttonLike; // кнопка лайк
  _buttonDelete; // кнопка корзина
  _buttonLikeActive; // модификатор активного лайка 
  _popupFullScreen; // попап полноэкранной картинки
  _buttonCloseFullScreen; // кнопка закрытия полноэкранной картинки
  _imageFullScreen; // ячейка полноэкранной картинки
  _titleFullScreen; // ячейка названия полноэкранной картинки
  _galleryContainer; // ячейка куда добавляются все готовые элементы _galleryElement

  constructor(data, settingsCard) {
    this._dataLinkImage = data.link;
    this._dataTitleImage = data.name;

    this._template = document.querySelector(settingsCard.selectorTemplate).content;
    this._galleryElement = settingsCard.selectorGalleryElement;
    this._image = settingsCard.selectorImage;
    this._title = settingsCard.selectorTitle;
    this._buttonLike = settingsCard.selectorButtonLike;
    this._buttonDelete = settingsCard.selectorButtonDelete;
    this._buttonLikeActive = settingsCard.selectorButtonLikeActive;
    this._popupFullScreen = document.querySelector(settingsCard.selectorPopupFullScreen);
    this._buttonCloseFullScreen = settingsCard.selectorButtonCloseFullScreen;
    this._imageFullScreen = settingsCard.selectorImageFullScreen;
    this._titleFullScreen = settingsCard.selectorTitleFullScreen;
    this._galleryContainer = settingsCard.selectorGalleryContainer;
  }

  _openPopup() {
    this._popupFullScreen.classList.add('popup_opened');

    this._handleEscAdd();
    this._missClick();
  }

  _closePopup() {
    this._popupFullScreen.classList.remove('popup_opened');
    
    this._handleEscRemove();
  }

  _handleEscAdd() {
    document.addEventListener('keyup', (evt) => {
      evt.preventDefault();
      if (evt.key === 'Escape') {
        this._closePopup();
      };
    });
  };

  _handleEscRemove() {
    document.removeEventListener('keyup', (evt) => {
      evt.preventDefault();
      if (evt.key === 'Escape') {
        this._closePopup();
      };
    });
  };

  _missClick() {
    this._popupFullScreen.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) this._closePopup();
    });
  }

  _clickClose(clickElement) { // клик по лайку
    clickElement.querySelector(this._buttonCloseFullScreen).addEventListener('click', () => this._closePopup());
  }

  _clickLike(clickElement) { // клик по лайку
    clickElement.querySelector(this._buttonLike).addEventListener('click', (evt) => {
      evt.target.classList.toggle(this._buttonLikeActive);
    });
  }

  _clickDelete(clickElement) { // клик по корзине
    clickElement.querySelector(this._buttonDelete).addEventListener('click', (evt) => {
      evt.target.closest(this._galleryElement).remove();
    });

  }

  _clickImage(clickElement) { // клик по картинке

    clickElement.querySelector(this._image).addEventListener('click', () => {
      // перед открытием заполняем попап popupFullScreen данными 
      this._popupFullScreen.querySelector(this._imageFullScreen).src = this._dataLinkImage;
      this._popupFullScreen.querySelector(this._imageFullScreen).alt = this._dataTitleImage;
      this._popupFullScreen.querySelector(this._titleFullScreen).textContent = this._dataTitleImage;

      // открываем готовый попап
      this._openPopup();
      this._clickClose(this._popupFullScreen);
    });
  }

  _createCard() { // создаем новую карточку

    const galleryElement = this._template.cloneNode(true); // клонируем html из шаблона (this._template)

    galleryElement.querySelector(this._image).src = this._dataLinkImage; // link на фото
    galleryElement.querySelector(this._image).alt = this._dataTitleImage; // alt фото
    galleryElement.querySelector(this._title).textContent = this._dataTitleImage; // caption фото

    // методы необходимые новой карточке 
    this._clickLike(galleryElement);
    this._clickDelete(galleryElement);
    this._clickImage(galleryElement);

    return galleryElement;
  }

  
  generateCard(insert = 'down') { // генерируем и добавляем новую карту вначало или конец галереи
    if (insert == 'up') {
      return document.querySelector(this._galleryContainer).
        prepend(this._createCard());

    } else {
      return document.querySelector(this._galleryContainer).
        append(this._createCard());
    }
  };
};