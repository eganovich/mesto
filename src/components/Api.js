class Api {
  constructor(config) {
    this.headers = config.headers;
    this.url = config.url;
  }

  handleOriginalResponse(res) {
    if (!res.ok) {
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  //Запрос информации о пользователе
  getInfoAboutUser() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    })
      .then(this.handleOriginalResponse)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Запрос изменения информации о пользователе
  patchInfoAboutUser(userInfo) {
    return fetch(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name: userInfo.name,
        about: userInfo.about,
      }),
    })
      .then(this.handleOriginalResponse)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Запрос на изменение аватара
  patchAvatar(userInfo) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: userInfo.avatar,
      }),
    })
      .then(this.handleOriginalResponse)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Запрос перечня карточек с сервера
  getCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    })
      .then(this.handleOriginalResponse)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //запрос на публикацию новой карточки
  postNewCard(newCard) {
    return fetch(`${this.url}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name: newCard.placeName,
        link: newCard.placePhotoLink,
      }),
    })
      .then(this.handleOriginalResponse)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Запрос на удаление карточки
  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then(this.handleOriginalResponse)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Запрос на установку лайка
  setLike(id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: "PUT",
      headers: this.headers,
    })
      .then(this.handleOriginalResponse)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  //Запрос на удаление лайка
  deleteLike(id) {
    return fetch(`${this.url}/cards/likes/${id}`, {
      method: "DELETE",
      headers: this.headers,
    })
      .then(this.handleOriginalResponse)
      .then((data) => {
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export default Api;
