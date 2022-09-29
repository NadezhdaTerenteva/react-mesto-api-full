export default class Api {
  constructor(url, token) {
    this._url = url;
    this._token = token;
    this._headers = {
      "Content-type": "application/json",
    };
  }

  async _checkResult(res) {
    if (res.ok) {
      const resData = await res.json();
      return resData.data;
    }
    return Promise.reject("Error");
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkResult);
  }

  setUserInfo(userData) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: userData.name,
        about: userData.about,
      }),
    }).then(this._checkResult);
  }

  changeUserAvatar(userData) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        avatar: userData.avatar,
      }),
    }).then(this._checkResult);
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
      credentials: 'include',
    }).then(this._checkResult);
  }

  addCard(obj) {
    const item = {
      name: obj.name,
      link: obj.link,
    };
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      credentials: 'include',
      body: JSON.stringify({
        name: obj.place,
        link: obj.link,
      }),
    }).then(this._checkResult);
  }

  deleteCard(cardId) {
    return fetch(
      `${this._url}/cards/${cardId}`,
      {
        method: "DELETE",
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({
          _id: cardId,
        }),
      }
    ).then(this._checkResult);
  }

  setLikes(cardId, likes) {
    return fetch(
      `${this._url}/cards/${cardId}/likes`,
      {
        method: "PUT",
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({
          _id: cardId,
          likes: [],
        }),
      }
    ).then(this._checkResult);
  }

  deleteLikes(cardId) {
    return fetch(
      `${this._url}/cards/${cardId}/likes`,
      {
        method: "DELETE",
        headers: this._headers,
        credentials: 'include',
        body: JSON.stringify({
          _id: cardId,
        }),
      }
    ).then(this._checkResult);
  }
}

export const api = new Api(
  //"http://localhost:4000",
  "https://api.mesto.nadyaterenteva.nomoredomains.sbs"
);
