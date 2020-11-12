class Api {
    constructor(config) {
        this.headers = config.headers;
        this.url = config.url;
    }

    //Запрос информации о пользователе
    getInfoAboutUser() {
        return fetch(`${this.url}/users/me`, {
            headers: this.headers,
        })
            .then(res => res.json())
            .then((data) => {
                return (data);
            });
    };

    //Запрос изменения информации о пользователе
    patchInfoAboutUser(userInfo) {
        return fetch(`${this.url}/users/me`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: userInfo.name,
                about: userInfo.about
            })
        })
            .then(res => res.json())
            .then((data) => {
                return (data);
            });
    };

    patchAvatar(userInfo) {
        return fetch(`${this.url}/users/me/avatar`, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                avatar: userInfo.avatar,
            })
        })
            .then(res => res.json())
            .then((data) => {
                return (data);
            });
    };

    //Запрос списка карточек
    getCards() {
        return fetch(`${this.url}/cards`, {
            headers: this.headers,
        })
            .then(res => res.json())
            .then((data) => {
                return (data);
            });
    };

    postNewCard(newCard) {
        return fetch(`${this.url}/cards`, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: newCard.placeName,
                link: newCard.placePhotoLink
            })
        })
            .then(res => res.json())
            .then((data) => {
                return (data);
            });
    };


    deleteCard(id) {
        return fetch(`${this.url}/cards/${id}`, {
            method: 'DELETE',
            headers: this.headers,
            //body: JSON.stringify({
            //    name: newCard.placeName,
            //    link: newCard.placePhotoLink
            //})
        })
            .then(res => res.json())
            .then((data) => {
                return (data);
            });
    };

    setLike(id) {
        return fetch(`${this.url}/cards/likes/${id}`, {
            method: 'PUT',
            headers: this.headers,
            //body: JSON.stringify({
            //    name: newCard.placeName,
            //    link: newCard.placePhotoLink
            //})
        })
            .then(res => res.json())
            .then((data) => {
                return (data);
            });
    };

    deleteLike(id) {
        return fetch(`${this.url}/cards/likes/${id}`, {
            method: 'DELETE',
            headers: this.headers,
        })
            .then(res => res.json())
            .then((data) => {
                return (data);
            });
    };



}

export default Api;