import './index.css'

import Section from '../components/Section';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

import { settingsFormValid } from '../utils/constants.js';
import { buttonEditProfile } from '../utils/constants.js';
import { buttonAddGallery } from '../utils/constants.js';
import { dataCards } from '../utils/constants.js';

/*
сразу создаем объект userInfoList, чтобы иметь возможность
использовать его методы getUserInfo() и setUserInfo() */
const userInfoList = new UserInfo({
  selectorUserName: '.profile__user-name',
  selectorUserJob: '.profile__user-job'
})

/* создаем попап для Полноэкранных картинок */
const popupFullScreen = new PopupWithImage('.popup_full-screen');

/* создаем валидацию для form_edit-profile */
const formEditProfileValid = new FormValidator('.form_edit-profile', settingsFormValid);
formEditProfileValid.enableValidation();

/* создаем валидацию для form_add-gallery */
const formAddProfileValid = new FormValidator('.form_add-gallery', settingsFormValid);


/* создаем объект cardsList который содержит готовую разметку
с карточками из массива dataCards */
const cardsList = new Section({
  items: dataCards,
  renderer: (item) => {

    const card = new Card(item, '.card-template', () => {
      popupFullScreen.open(item);
    });

    const cardElement = card.createCard();
    cardsList.addItem(cardElement);
  }
}, '.gallery__photo-grid');
// добавляем карточки из объекта cardsList на страницу
cardsList.renderItems();


// создаем объект popupEditProfile
const popupEditProfile = new PopupWithForm('.popup-edit-profile',
  {
    handleFormSubmit: (inputs) => { // когда форма отправлена создать новую карточку
      userInfoList.setUserInfo(inputs.userNameInput, inputs.userJobInput);
      popupEditProfile.close();
    },
    handleFormValidator: (openForm) => {
      //извлекаем данные из userInfoList
      const saveUserInfo = userInfoList.getUserInfo();
      // и подставляем в инпуты формы
      openForm.elements.userNameInput.value = saveUserInfo.userName
      openForm.elements.userJobInput.value = saveUserInfo.userJob

      //Инпуты при открытии валидны, надо отключить их проверку и делать кнопку активной (только при открытии формы)
      formEditProfileValid.checkInputValidity(openForm.elements.userNameInput);
      formEditProfileValid.checkInputValidity(openForm.elements.userJobInput);
      formEditProfileValid.toggleButtonState();
    }
  }
);

// создаем объект popupAddGallery
const popupAddGallery = new PopupWithForm('.popup-add-gallery',
  {
    handleFormSubmit: (inputs) => { // когда форма отправлена создать новую карточку

      const addCard = new Card(inputs, '.card-template', () => { popupFullScreen.open(inputs) });
      const addCardElement = addCard.createCard();

      cardsList.addItem(addCardElement, 'up');
      popupAddGallery.close();
    },

    handleFormValidator: (openForm) => {
      formAddProfileValid.enableValidation();
    }
  });

// клик по кнопке buttonEditProfile запускает метод open() объекта popupEditProfile
buttonEditProfile.addEventListener('click', () => {
  popupEditProfile.open();
});

// клик по кнопке buttonAddGallery запускает метод open() объекта popupAddGallery
buttonAddGallery.addEventListener('click', () => {
  popupAddGallery.open();
});