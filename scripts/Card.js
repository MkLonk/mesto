const initialCards = [
  {
    name: 'FhАрхыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  }
]


class Card {
  
  _template
  
  _linkImage
  _nameImage

  constructor(data, selector) {
    this._template = document.querySelector(selector).content; // находим блок-шаблон по селектору
    this._linkImage = data.link;
    this._nameImage = data.name;
  }

  _createCard() {

    const galleryElement = this._template.cloneNode(true); // клонируем из шаблона
    const cardImage = galleryElement.querySelector('.card__image')
    const cardCaption = galleryElement.querySelector('.card__caption')

    cardImage.src = this._linkImage; // фото для миниатюры
    cardImage.alt = this._nameImage; // alt фото для миниатюры
    cardCaption.textContent = this._nameImage; // caption фото

    return galleryElement;
  }
};

const newMyCard = new Card(initialCards[0], '.card-template');

console.log(newMyCard._createCard());



// 3. Функция создания новой карточки для галереи. Возвращает готовый для вставки galleryElement
function createCard(nameImage, linkImage) {

  const galleryElement = cardTemplate.cloneNode(true); // клонируем из шаблона
  const cardImage = galleryElement.querySelector('.card__image');
  const cardCaption = galleryElement.querySelector('.card__caption');

  cardImage.src = linkImage; // фото для миниатюры
  cardImage.alt = nameImage; // alt фото для миниатюры
  cardCaption.textContent = nameImage; // caption фото

  // вешаем слушатель на лайк
  galleryElement.querySelector('.card__like').addEventListener('click', (evt) => {
    evt.target.classList.toggle('card__like_active');
  });

  // вешаем слушатель на delete
  galleryElement.querySelector('.card__delete').addEventListener('click', (evt) => {
    evt.target.closest('.gallery__element').remove();
  });

  // вешаем слушатель на клик по картинке card__image
  galleryElement.querySelector('.card__image').addEventListener('click', () => {
    fullScreenImage.src = linkImage;
    fullScreenImage.alt = nameImage;
    fullScreenCaption.textContent = nameImage;
    openPopup(popupFullScreen);
  });

  return galleryElement;
}


const charName = 'Vlad';

export { charName };