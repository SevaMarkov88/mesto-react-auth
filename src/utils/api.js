class Api {
  constructor(options) {
    this.url = options.baseUrl;
    this.headers = options.headers;
  }

  _handleFetch(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: this.headers
    })
      .then(res => this._handleFetch(res));

  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      method: 'GET',
      headers: this.headers
    })
      .then(res => this._handleFetch(res));
  }

  addNewCard(name, link) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(res => this._handleFetch(res))
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.addLike(id);
    } else {
      return this.removeLike(id);
    }
  }

  removeLike(id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => this._handleFetch(res));
  }

  addLike(id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: 'PUT',
      headers: this.headers
    })
      .then(res => this._handleFetch(res));
  }


  deleteCard(elementId) {
    return fetch(`${this.url}/cards/${elementId}`, {
      method: 'DELETE',
      headers: this.headers
    })
      .then(res => this._handleFetch(res));
  }

  setUserInfo(name, about) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(res => this._handleFetch(res));
  }

  updateAvatar(link) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(res => this._handleFetch(res));
  }
}


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-32',
  headers: {
    authorization: '78a9a2e8-0028-4357-9dc5-3dfee740ccb0',
    'Content-Type': 'application/json'
  }
})

export {api};
