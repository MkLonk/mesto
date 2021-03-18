/*
Класс UserInfo отвечает за управление отображением информации о пользователе на странице
*/

export default class UserInfo {

  constructor({ selectorUserName, selectorUserJob }) {
    this._userName = document.querySelector(selectorUserName);
    this._userJob = document.querySelector(selectorUserJob);
  }

  // метод возвращает объект с данными пользователя
  getUserInfo() {
    return {
      userName: this._userName.textContent,
      userJob: this._userJob.textContent
    }
  }

  //метод принимает новые данные пользователя и добавляет их на страницу
  setUserInfo(userNameValue, userJobValue) {
    this._userName.textContent = userNameValue;
    this._userJob.textContent = userJobValue;
  }
}