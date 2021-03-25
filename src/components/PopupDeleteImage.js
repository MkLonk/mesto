import Popup from './Popup.js'

export default class PopupDeleteImage extends Popup {

  constructor(selectorPopup/*, { 
    getDeleteInfo,
    handleDeleteCard
  }*/) {
    super(selectorPopup);

    /*    this._handleDeleteCard = handleDeleteCard;
      this._getDeleteInfo = getDeleteInfo;
   */
    this._form = this._popup.querySelector('.form');
    //this._handleEventSubmit = this._handleEventSubmit.bind(this);

  }

  getDeleteSubmit() {
    return this._form
  }



/*   setEventListeners() {

    this._form.addEventListener('submit', this._handleEventSubmit)
    return super.setEventListeners()
  } */

/*   _handleEventSubmit(evt) {
    evt.preventDefault();
    console.log('нажал')
  } */
}