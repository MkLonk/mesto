import Popup from './Popup.js'

export default class PopupDeleteImage extends Popup {

  constructor(selectorPopup, { deleteCard }) {
    super(selectorPopup);

    this._form = this._popup.querySelector('.form');
    this._buttonConfirm = this._form.querySelector('.form__button-save')

    this.handleEventSubmit = this.handleEventSubmit.bind(this)

    this.deleteCard = deleteCard
    this._openedCardObj
  }

  // слушатель субмита, запускает колбэк функцию deleteCard
  formDelSubmit() {
    this._form.addEventListener('submit', this.deleteCard)
  }

  // метод меняет статусы кнопок (Удаление...) при нажатии
  handleEventSubmit(evt) {
    evt.preventDefault();
    this._buttonConfirm.textContent = 'Удаление...'
    console.log('Нажали ДА')
  }

  // метод открывает попап и присваевает переменной this._openedCardObj переданный объект cardObj 
  open(cardObj) {
    console.log('Открыт попап удаления')

    this._buttonConfirm.textContent = 'Да';
    this._openedCardObj = cardObj;

    return super.open()
  }

// закрывает попап и отчищаем this._openedCardObj
  close() {
    this._openedCardObj = '';
    return super.close()
  }

  // возвращаем объект this._openedCardObj (карта каторую хотим удалить)
  getCardDelObj() {
    return this._openedCardObj;
  }
}