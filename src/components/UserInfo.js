/*
Класс UserInfo отвечает за управление отображением информации о пользователе на странице
*/

export default class UserInfo {

  constructor({ selectorUserName, selectorUserJob, selectorUserAvatar}, api) {
    this._userName = document.querySelector(selectorUserName);
    this._userJob = document.querySelector(selectorUserJob);
    this._userAvatar = document.querySelector(selectorUserAvatar);

    this._api = api
  }

  // метод возвращает объект с данными пользователя
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent,
    }
  }

  //метод принимает новые данные пользователя и добавляет их на страницу
  loadUserInfo() {
    this._api.loadUserData()
      .then(userData => {
        this._userName.textContent = userData.name;
        this._userJob.textContent = userData.about;
        this._userAvatar.style.backgroundImage = `url("${userData.avatar}")`;
      })
      .catch(err => `Ошибка при загрузке данных пользователя ${err}`)
  }


  setUserInfo(userNameValue, userJobValue) {
    this._api.editUserInfo(userNameValue, userJobValue)
      .then(userData => {
        this._userName.textContent = userData.name;
        this._userJob.textContent = userData.about;
      })
      .catch(err => `Ошибка при сохранении данных о пользователе ${err}`)
  }

  setUserAvatar(userAvatarValue) {
    this._userAvatar.style.backgroundImage = `url("${userAvatarValue}")`;
  }
}