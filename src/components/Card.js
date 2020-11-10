class Card {
    constructor(/* item,  */templateCardSelector, handleCardClick , openConfirmationPopup) {
        //this._name = item.name;
        //this._link = item.link;
        this._templateCardSelector = templateCardSelector;
        this._handleCardClick = handleCardClick;
        this._openConfirmationPopup = openConfirmationPopup;
    }

    createCard(item) {
        this._name = item.name;
        this._link = item.link;
        this._cardElement = this._getTemplate();
        this._setEventListenerDelete();
        this._setEventListenerLike();
        this._setEventListenerOpenPreview();

        this._cardElement.querySelector('.place__photo').src = this._link;
        this._cardElement.querySelector('.place__photo').alt = this._name + '. Фотография.';
        this._cardElement.querySelector('.place__name').textContent = this._name;

        return this._cardElement;
    }
     
   /*  deleteCard(){
        this._cardElement.remove;
       // item = null;
    } */

    _getTemplate(){
        this._cardElement = document
            .querySelector(this._templateCardSelector)
            .content
            .querySelector('.place')
            .cloneNode(true);
        return this._cardElement;
    }


    _setEventListenerDelete(){
        const cardRemove = this._cardElement.querySelector('.place__trash');
        cardRemove.addEventListener('click', () => {
            this._openConfirmationPopup();
        })
    }

    _setEventListenerLike() {
        const cardLike = this._cardElement.querySelector('.place__like');
        cardLike.addEventListener('click', (evt) => {
            evt.target.classList.toggle('place__like_active');
        })
    }

     _setEventListenerOpenPreview(){
      this._cardElement.querySelector('.place__photo-cover').addEventListener('click', () => {
        this._handleCardClick(this._cardElement);})
       }
        
}

export default Card;