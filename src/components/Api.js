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

    postNewCard() { };

    showLikes() { };

    setLike() { };

}

export default Api;