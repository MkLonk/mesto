import './index.css';

import Section from '../components/Section.js';
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

/*
создаем объект cardsList который содержит готовую разметку
с карточками из массива dataCards */
const cardsList = new Section({
  items: dataCards,
  renderer: (item) => {

    const card = new Card(item, '.card-template', () => {

      const popupFull = new PopupWithImage(item, '.popup_full-screen')
      popupFull.open();
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
      userInfoList.setUserInfo(inputs.userNameInput, inputs.userJobInput)
      popupEditProfile.close();
    },
    handleFormValidator: (openForm) => {
      //извлекаем данные из userInfoList
      const saveUserInfo = userInfoList.getUserInfo();
      // и подставляем в инпуты формы
      openForm.elements.userNameInput.value = saveUserInfo.userName
      openForm.elements.userJobInput.value = saveUserInfo.userJob

      //включаем валидацию формы
      const formValid = new FormValidator(openForm, settingsFormValid);
      formValid.enableValidation();
    }
  }
);

// создаем объект popupAddGallery
const popupAddGallery = new PopupWithForm('.popup-add-gallery',
  {
    handleFormSubmit: (inputs) => { // когда форма отправлена создать новую карточку

      const newCardList = new Section({
        items: [inputs],
        renderer: (item) => {

          const newCard = new Card(item, '.card-template', () => {

            const popupFull = new PopupWithImage(item, '.popup_full-screen')
            popupFull.open();
          });

          const cardElement = newCard.createCard();
          newCardList.addItem(cardElement, 'up');
        }
      }, '.gallery__photo-grid');

      newCardList.renderItems();
      popupAddGallery.close();
    },
    handleFormValidator: (openForm) => {
      const formValid = new FormValidator(openForm, settingsFormValid);
      formValid.enableValidation();
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