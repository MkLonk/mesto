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
}, myApi)

/* делаем запрос на сервер, и получаем информацию о пользователе*/
userInfoList.loadUserInfo()

/* создаем объект (попап) popupEditAvatar для редактирования Аватара */
const popupEditAvatar = new PopupWithForm('.popup-edit-avatar', {
  handleFormSubmit: (inputs) => {
    myApi.editAvatar(inputs.avatarLinkInput)
      .then(res => {
        popupEditAvatar.close()
        console.log(`Аватар пользователя '${res.name}' успешно изменён.`)
        userInfoList.setUserAvatar(res.avatar)
      })
      .catch(err => console.log(`Ошибка при изменении аватара пользователя - ${err}`))
  },
  handleFormValidator: () => { }
});

/* создаем объект (попап) popupEditProfile для редактирования информации о пользователе */
const popupEditProfile = new PopupWithForm('.popup-edit-profile',
  {
    handleFormSubmit: (inputs) => { // когда форма отправлена
      userInfoList.setUserInfo(inputs.userNameInput, inputs.userJobInput);
      popupEditProfile.close();
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
const handleLikeFunc = (event, itemId, cardToDelete, api) => {

  if (cardToDelete._handleLikeClick(event)) {
    api.likeCard(itemId, 'PUT')
      .then(console.log(`Лайк на карточку с id=${itemId}`))
      .catch(err => console.log(err))
  } else {
    api.likeCard(itemId, 'DELETE')
      .then(console.log(`Снимаем лайк c карточки id=${itemId}`))
      .catch(err => console.log(err))
  }
}

/* создаем попап для полноэкранных картинок */
const popupFullScreen = new PopupWithImage('.popup_full-screen');

/* создаем попап для подтверждения удаления картинок */
const popupDelCard = new PopupDeleteImage('.popup_delete-card');

/* создаем попап объект popupAddGallery (создание новой карточки) */
const popupAddGallery = new PopupWithForm('.popup-add-gallery',
  {
    handleFormSubmit: (inputs) => { // когда форма отправлена создать новую карточку

      myApi.addNewCard(inputs)
        .then(cardData => {
          const newCard = new Card(cardData, '.card-template', { //создаем объект-шаблон карточки

            handleCardClick: () => popupFullScreen.open(cardData),

            handleDelete: (evtClickCard) => {
              const cardDelElement = evtClickCard.target.closest('.gallery__element') //для удаления из DOM
              const cardDelId = newCard._cardId //для удаления с сервера

              popupDelCard.open() //открыть попап для подтверждения
              popupDelCard.getDelFormSubmit().addEventListener('submit', (evt) => {
                if (popupDelCard.handleEventSubmit(evt)) {
                  myApi.delCard(cardDelId)
                    .then(res => {
                      cardDelElement.remove();
                      popupDelCard.close();
                      console.log(res.message);
                    })
                    .catch(err => console.log(err));
                }
              })
            },

            handleLike: (evtClickCard) => {
              handleLikeFunc(evtClickCard, cardData._id, newCard, myApi)
            }
          })

          const maketNewCard = newCard.createCard(cardData._id); //создали разметку карточки
          cardsList.addItem(maketNewCard, 'up'); // вставили карточку в DOM, в начало галерии
          popupAddGallery.close(); // закрыли попап
          console.log(`Картачка с id${cardData._id} успешно добавлена`)

        })
        .catch(err => console.log('Ошибка при сохранинии', err))
    },
    handleFormValidator: (openForm) => {
      formAddProfileValid.enableValidation();
    }
  });

/* создаем объект cardsList, содержит готовую разметку карточкем c сервера */
const cardsList = new Section({
  renderer: (item) => {

    const card = new Card(item, '.card-template',
      {
        handleCardClick: () => {
          popupFullScreen.open(item);
          console.log(`Карточка id=${item._id} открыта на полном экране`);
        },

        handleDelete: (evtClickCard) => {
          const cardDelElement = evtClickCard.target.closest('.gallery__element') //для удаления из DOM
          const cardDelId = card._cardId //для удаления с сервера

          popupDelCard.open() //открыть попап для подтверждения
          popupDelCard.getDelFormSubmit().addEventListener('submit', (evt) => {
            if (popupDelCard.handleEventSubmit(evt)) {
              myApi.delCard(cardDelId)
                .then(res => {
                  cardDelElement.remove();
                  popupDelCard.close();
                  console.log(res.message);
                })
                .catch(err => console.log(err));
            }
          })
        },

        handleLike: (evtClickCard) => {
          handleLikeFunc(evtClickCard, item._id, card, myApi)
        }
      }
    );

    const maketCard = card.createCard(item._id);
    cardsList.addItem(maketCard);
  }
}, '.gallery__photo-grid', myApi)
cardsList.renderItems();

// клик по кнопке buttonAddGallery запускает метод open() объекта popupAddGallery
buttonAddGallery.addEventListener('click', () => {
  popupAddGallery.open();
});