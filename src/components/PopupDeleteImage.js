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
  }

  open() {
    console.log('Открыт попап удаления')
    this._buttonConfirm.textContent = 'Да';

    return super.open()
  }

  close() {    
    return super.close()
  }

}