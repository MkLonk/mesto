export default class Api {
  constructor(configApi) {

    this._url = configApi.url;
    this._team = configApi.team;

    this._token = configApi.token;
  }

  loadUserData() { //получение данных от сервера
    return fetch(`${this._url}/${this._team}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: this._token,
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка стутус кода ${res.status}`));
      })
      .catch(err => Promise.reject(err));
  }

  editUserInfo(name, about) { //изменить данные на сервере
    return fetch(`${this._url}/${this._team}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: this._token,
      },
      body: JSON.stringify({
        'name': name,
        'about': about
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка стутус кода ${res.status}`));
      })
      .catch(err => Promise.reject(err));
  }


  loadCards() {
    return fetch(`${this._url}/${this._team}/cards`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: this._token,
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка стутус кода ${res.status}`));
      })
      .catch(err => Promise.reject(err));
  }

  addNewCard(newCard) {
    return fetch(`${this._url}/${this._team}/cards`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: this._token,
      },
      body: JSON.stringify({
        'name': newCard.name,
        'link': newCard.link,
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка стутус кода ${res.status}`));
      })
      .catch(err => {
        return Promise.reject(err)
      });
  }

  delCard(idCard) {
    return fetch(`${this._url}/${this._team}/cards/${idCard}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        authorization: this._token,
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка стутус кода ${res.status}`));
      })
      .catch(err => Promise.reject(err));
  }

  // ставим или снимаем лайк с карточки
  likeCard(idCard, method) {
    return fetch(`${this._url}/${this._team}/cards/likes/${idCard}`, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
        authorization: this._token,
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка стутус кода ${res.status}`));
      })
      .catch(err => Promise.reject(err));
  }

  editAvatar(avatarLink) {
    return fetch(`${this._url}/${this._team}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: this._token,
      },
      body: JSON.stringify({
        'avatar': avatarLink,
      })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(new Error(`Ошибка стутус кода ${res.status}`));
      })
      .catch(err => Promise.reject(err));
  }

}
