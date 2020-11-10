class Api{
    constructor(config){
        this.headers = config.headers;
        this.url = config.url;
    }

    //Запрос информации о пользователе
    getInfoAboutUser() {};

    //Запрос изменения информации о пользователе
    patchInfoAboutUser() {};

    //Запрос списка карточек
    getCards() {
        return fetch(`${this.url}/cards`, {
           headers: this.headers,
        })
        .then(res => res.json())
        .then((data) => {
          return(data);
        });
    };

    postNewCard() {};

    showLikes() {};

    setLike() {};

}

export default Api;