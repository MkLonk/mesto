/****************************************
 * Класс UserInfo отвечает за управление и отображение информации о пользователе
****************************************/

export default class UserInfo {

  constructor({ selectorUserName, selectorUserJob, selectorUserAvatar }) {
    this._userName = document.querySelector(selectorUserName);
    this._userJob = document.querySelector(selectorUserJob);
    this._userAvatar = document.querySelector(selectorUserAvatar);
  }

  // метод возвращает объект с данными пользователя
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent,
    }
  }

  // метод для изменения данных пользователя (name и about)
  setUserInfo(userNameValue, userJobValue) {
    this._userName.textContent = userNameValue;
    this._userJob.textContent = userJobValue;
  }

  // метод для изменения аватара пользователя
  setUserAvatar(userAvatarValue) {
    this._userAvatar.style.backgroundImage = `url("${userAvatarValue}")`;
  }

  // метод для изменения сразу всех данных пользователя (name, about и avatar), при загразке страницы
  loadUserInfo(userData) {
    this.setUserInfo(userData.name, userData.about);
    this.setUserAvatar(userData.avatar);
  }
}