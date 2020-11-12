class Card {
    constructor({item, templateCardSelector, handleCardClick , handleCardDelete}) {
        this._name = item.name;
        this._link = item.link;
        this._ownerId = item.ownerId;
        this._id = item.id;
        debugger;
        this._templateCardSelector = templateCardSelector;
        this._handleCardClick = handleCardClick;
        this._handleCardDelete = handleCardDelete;
        this._setEventListenerDelete = this._setEventListenerDelete.bind(this);
             
    }

    createCard() {
        this._cardElement = this._getTemplate();
        this._setEventListenerDelete();
        this._setEventListenerLike();
        this._setEventListenerOpenPreview();

        this._cardElement.querySelector('.place__photo').src = this._link;
        this._cardElement.querySelector('.place__photo').alt = this._name + '. Фотография.';
        this._cardElement.querySelector('.place__name').textContent = this._name;
        if (this._ownerId != '1ce5c7de3a5db075869918f8'){ 
         this._disableDeleteButton();
        }
        return this._cardElement;
    }

    _disableDeleteButton(){
        this._cardElement.querySelector('.place__trash').classList.add('place__trash_invisible');
    }
     
   getId(){
       return this._id;
   }

    deleteCard(id){
        if (this._id = `${id}`){ 
            this._cardElement.remove();
           }      
    }
        

    _getTemplate(){
        this._cardElement = document
            .querySelector(this._templateCardSelector)
            .content
            .querySelector('.place')
            .cloneNode(true);
        return this._cardElement;
    }


    _setEventListenerDelete(){
      this._cardElement.querySelector('.place__trash').addEventListener('click', () => {
          debugger;
            this._handleCardDelete();            
        })
    }

    _setEventListenerLike() {
        const cardLike = this._cardElement.querySelector('.place__like-button');
        cardLike.addEventListener('click', (evt) => {
            evt.target.classList.toggle('place__like-button_active');
        })
    }

     _setEventListenerOpenPreview(){
      const cardCover = this._cardElement.querySelector('.place__photo-cover');
      cardCover.addEventListener('click', (evt) => {
        const openCardElement = evt.target.closest('.place__photo-cover');
        this._handleCardClick(openCardElement);
    })
       }
        
}

export default Card;