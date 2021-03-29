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

  // слушатель субмита, запускает колбэк функцию deleteCard
  formDelSubmit() {
    this._form.addEventListener('submit', this.deleteCard)
  }

  // метод меняет статусы кнопок (Удаление...) при нажатии
  handleEventSubmit(evt) {
    evt.preventDefault();
    this._buttonConfirm.textContent = 'Удаление...'
  }

  // при открытии присваеваем переменные cardDel и evtCardDel
  open(evtCardDel ,cardDel) {
    this._buttonConfirm.textContent = 'Да';
    this._cardDel = cardDel;
    this._evtCardDel = evtCardDel;

    return super.open()
  }

// закрывает попап и отчищаем this._openedCardObj
  close() {
    this._cardDel = '';
    this._evtCardDel = '';
    return super.close()
  }

  // возвращаем объект this._openedCardObj (карта каторую хотим удалить)
  getCardDel() {
    return this._cardDel;
  }

  getEvtCardDel() {
    return this._evtCardDel;
  }
}