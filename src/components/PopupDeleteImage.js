import Popup from './Popup.js'

export default class PopupDeleteImage extends Popup {

  constructor(selectorPopup, { deleteCard }) {
    super(selectorPopup);

    this._form = this._popup.querySelector('.form');
    this._buttonConfirm = this._form.querySelector('.form__button-save')

    this.handleEventSubmit = this.handleEventSubmit.bind(this)

    this.deleteCard = deleteCard
    this._cardDel
    this._evtCardDel
  }

  // метод меняет статусы кнопок (Удаление...) при нажатии
  handleEventSubmit(evt) {
    evt.preventDefault();
    this._buttonConfirm.textContent = 'Удаление...'
  }

  // при открытии присваеваем переменные cardDel и evtCardDel
  open(evtCardDel, cardDel) {
    this._buttonConfirm.textContent = 'Да';
    this._cardDel = cardDel;
    this._evtCardDel = evtCardDel;

    return super.open()
  }

  // закрывает попап и отчищает переменные cardDel и evtCardDel
  close() {
    this._cardDel = '';
    this._evtCardDel = '';
    return super.close()
  }

  // возвращаем объект cardDel (карта каторую хотим удалить)
  getCardDel() {
    return this._cardDel;
  }

  // возвращаем объект evtCardDel (эвент элемента на который кликнули для удаления карты)
  getEvtCardDel() {
    return this._evtCardDel;
  }

  setEventListeners() {
    this._form.addEventListener('submit', this.deleteCard)
    return super.setEventListeners()
  }

}