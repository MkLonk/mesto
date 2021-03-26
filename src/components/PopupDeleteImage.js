import Popup from './Popup.js'

export default class PopupDeleteImage extends Popup {

  constructor(selectorPopup) {
    super(selectorPopup);

    this._form = this._popup.querySelector('.form');
    this._buttonConfirm = this._form.querySelector('.form__button-save')

    this.handleEventSubmit = this.handleEventSubmit.bind(this)

  }

  getDelFormSubmit() {
    return this._form
  }


  handleEventSubmit(evt) {
    evt.preventDefault();
    this._buttonConfirm.textContent = 'Удаление...'
    console.log('Нажали ДА')
    return true
  }

/*   setEventListeners() {
    console.log('Сработал setEventListeners попапа')
    this._form.addEventListener('submit', this.handleEventSubmit)
    return super.setEventListeners();

  } */

  open() {
    console.log('Открыт попап удаления')
    this._buttonConfirm.textContent = 'Да';

    return super.open()
  }

  close() {    
    return super.close()
  }

}