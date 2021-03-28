import './index.css'

import Api from '../components/Api';

import Section from '../components/Section';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupDeleteImage from '../components/PopupDeleteImage.js';

import UserInfo from '../components/UserInfo.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

import { configApi } from '../utils/constants.js';
import { settingsFormValid } from '../utils/constants.js';
import { buttonEditProfile } from '../utils/constants.js';
import { buttonAddGallery } from '../utils/constants.js';
import { buttonEditAvatar } from '../utils/constants.js';

let idAuthorizedUser = ''; // переменная для хранения id авторизованного пользователя

/****************************************
 * Создаем объект myApi, для запросов к серверу
****************************************/
const myApi = new Api(configApi);


/****************************************
 * Создаем объекты для валидации форм
****************************************/

/* создаем валидацию для form_edit-profile */
const formEditProfileValid = new FormValidator('.form_edit-profile', settingsFormValid);
formEditProfileValid.enableValidation();

/* создаем валидацию для form_add-gallery */
const formAddProfileValid = new FormValidator('.form_add-gallery', settingsFormValid);

/* создаем валидацию для form_add-gallery */
const formEditAvatarValid = new FormValidator('.form_edit-avatar', settingsFormValid);
formEditAvatarValid.enableValidation();


/****************************************
 * Создаем секцию userInfoList
****************************************/

/* создаем объект userInfoList */
const userInfoList = new UserInfo({
  selectorUserName: '.profile__user-name',
  selectorUserJob: '.profile__user-job',
  selectorUserAvatar: '.profile__avatar',
});

/* делаем запрос на сервер, и получаем информацию о пользователе */
myApi.loadUserData()
  .then(userData => {
    userInfoList.loadUserInfo(userData)
    idAuthorizedUser = userData._id
  })
  .catch(err => `Ошибка при загрузке данных о пользователе - ${err}`)

/* создаем объект (попап) popupEditAvatar для редактирования Аватара */
const popupEditAvatar = new PopupWithForm('.popup-edit-avatar', {

  handleFormSubmit: (inputs) => {

    myApi.editAvatar(inputs.avatarLinkInput)
      .then(res => {
        userInfoList.setUserAvatar(res.avatar);
        popupEditAvatar.close();
        console.log(`Аватар пользователя '${res.name}' успешно изменён.`);
      })
      .catch(err => `Ошибка при изменении аватара пользователя - ${err}`)
  },

  handleFormValidator: () => { }
});
popupEditAvatar.setEventListeners()

/* создаем объект (попап) popupEditProfile для редактирования информации о пользователе */
const popupEditProfile = new PopupWithForm('.popup-edit-profile',
  {
    handleFormSubmit: (inputs) => { // когда форма отправлена
      myApi.editUserInfo(inputs.userNameInput, inputs.userJobInput)
        .then(res => {
          userInfoList.setUserInfo(res.name, res.about);
          popupEditProfile.close();
          console.log(`Данные пользователя '${res.name}' успешно изменены.`);
        })
        .catch(err => `Ошибка при изменении данных пользователя - ${err}`)
    },

    handleFormValidator: (openForm) => { // когда форму открывают
      //извлекаем данные userInfoList
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
popupEditProfile.setEventListeners()

/* слушатель кнопки buttonEditAvatar - для редактирования Аватара*/
buttonEditAvatar.addEventListener('click', () => {
  popupEditAvatar.open();
});

/* слушатель кнопки buttonEditProfile - для редактирования информации о пользователе */
buttonEditProfile.addEventListener('click', () => {
  popupEditProfile.open();
});


/****************************************
 * Создаем секцию gallery
****************************************/

//Функция для клика по лайку
function clickToLike(event, itemId, cardToLike) {
  if (cardToLike.isLiked) {
    myApi.likeCard(itemId, 'DELETE')
      .then(res => {
        cardToLike.toggleLike(event);
        cardToLike.isLiked = false;
        console.log(`Снимаем лайк c карточки id=${itemId}`);
      })
      .catch(err => console.log(err));
  } else {
    myApi.likeCard(itemId, 'PUT')
      .then(res => {
        cardToLike.toggleLike(event);
        cardToLike.isLiked = true;
        console.log(`Лайк на карточку с id=${itemId}`);
      })
      .catch(err => console.log(err));
  }
}

//Функция для создания полностью готовой разметки карточки
function createCard(cardData) {

  const newCard = new Card(cardData, '.card-template', {

    handleCardClick: () => {
      popupFullScreen.open(cardData)
    },

    handleDelete: (evtClickCard) => {
      popupDelCard.open(); //открыть попап для подтверждения
      const delForm = popupDelCard.getDelFormSubmit()

      delForm.addEventListener('submit', (evt) => {
        popupDelCard.handleEventSubmit(evt)
        myApi.delCard(newCard.getId())
          .then(res => {
            newCard.removeCard(evtClickCard); // удаление из DOM
            popupDelCard.close();
            console.log(res.message);
          })
          .catch(err => console.log(err));
      })
    },

    handleLike: (evtClickCard) => {
      clickToLike(evtClickCard, cardData._id, newCard)
    }
  }, idAuthorizedUser)

  return newCard.createCard()
}

/* создаем попап для полноэкранных картинок */
const popupFullScreen = new PopupWithImage('.popup_full-screen');
popupFullScreen.setEventListeners()

/* создаем попап для подтверждения удаления картинок */
const popupDelCard = new PopupDeleteImage('.popup_delete-card');
popupDelCard.setEventListeners()

/* создаем объект cardsList который будет рендерить карточки в галерею */
const cardsList = new Section({
  renderer: (item) => cardsList.addItem(createCard(item))
}, '.gallery__photo-grid');


/* запрос на сервер для загрузки и отрисовки карточек */
myApi.loadCards()
  .then(cardsDataArr => {
    cardsList.renderItems(cardsDataArr)
    console.log(`Все карточки удачно загружены с сервера. Количество карточек ${cardsDataArr.length}`)
  }).catch(err => `Ошибка при загрузки массива карточек с сервера, ${err}`)


/* создаем попап объект popupAddGallery (создание новой карточки) */
const popupAddGallery = new PopupWithForm('.popup-add-gallery',
  {
    handleFormSubmit: (inputs) => {
      // когда форма отправлена, выполнить запрос "addNewCard" на сервер
      myApi.addNewCard(inputs)
        .then(cardData => {
          const addCard = createCard(cardData) // создаем разметку карточки функцией createCard
          cardsList.addItem(addCard, 'up') //вставить в DOM (в начало галерии)
          popupAddGallery.close(); // закрыть попап 
          console.log(`Картачка с id${cardData._id} успешно добавлена`)
        })
        .catch(err => console.log('Ошибка при добавлении новой карточки на сервер', err))
    },
    handleFormValidator: (openForm) => {
      formAddProfileValid.enableValidation();
    }
  });
// включаем слушатели попапа
popupAddGallery.setEventListeners()

// клик по кнопке buttonAddGallery запускает метод open() объекта popupAddGallery
buttonAddGallery.addEventListener('click', () => {
  popupAddGallery.open();

});