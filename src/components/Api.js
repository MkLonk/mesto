export default class Api {
  constructor(configApi) {

    this._url = configApi.url;
    this._team = configApi.team;
    this._token = configApi.token;
  }

  /****************************************
   * Метод  _sendRequest - типовой макет для постоения запросов
  ****************************************/
  _sendRequest(url, method, dataRequest) {

    return fetch(`${url}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        authorization: this._token,
      },
      body: JSON.stringify(dataRequest)
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка стутус кода ${res.status}`));
      })
  }

  /****************************************
   * Запросы для userInfo
  ****************************************/

  /* запрос данных пользователя при загрузки сайта */
  loadUserData() {
    const urlReq = `${this._url}/${this._team}/users/me`
    return this._sendRequest(urlReq, 'GET')
  }

  /* запрос на изменения данных пользователя (name и about) */
  editUserInfo(name, about) {
    const urlReq = `${this._url}/${this._team}/users/me`
    const dataRequest = {
      'name': name,
      'about': about
    }
    return this._sendRequest(urlReq, 'PATCH', dataRequest)
  }

  /* запрос на изменения аватара пользователя */
  editAvatar(avatarLink) {
    const urlReq = `${this._url}/${this._team}/users/me/avatar`
    const dataRequest = {
      'avatar': avatarLink
    }
    return this._sendRequest(urlReq, 'PATCH', dataRequest)
  }


  /****************************************
   * Запросы для Cards
  ****************************************/

  /* Запрос картачек сохраненных на сервере */
  loadCards() {
    const urlReq = `${this._url}/${this._team}/cards`

    return this._sendRequest(urlReq, 'GET')
  }

  /* Запрос на добавление новой карточки на сервер */
  addNewCard(newCard) {
    const urlReq = `${this._url}/${this._team}/cards`
    const dataRequest = {
      'name': newCard.name,
      'link': newCard.link,
    }
    return this._sendRequest(urlReq, 'POST', dataRequest);
  }

  /* Запрос на удаление карточки с сервера */
  delCard(idDeleteCard) {
    const urlReq = `${this._url}/${this._team}/cards/${idDeleteCard}`

    return this._sendRequest(urlReq, 'DELETE')
  }

  /* Запрос на постановку/снятие лайка с карточки */
  likeCard(idCard, method){
    const urlReq = `${this._url}/${this._team}/cards/likes/${idCard}`

    return this._sendRequest(urlReq, method)
  }

}
