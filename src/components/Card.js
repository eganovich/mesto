class Card {
  constructor({
    item,
    myId,
    templateCardSelector,
    handleCardClick,
    handleCardDelete,
    handleCardLike,
  }) {
    this._name = item.name;
    this._link = item.link;
    this._ownerId = item.ownerId;
    this._id = item.id;
    this._likes = item.likes;
    this._myId = myId;
    debugger;
    this._templateCardSelector = templateCardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardDelete = handleCardDelete;
    this._handleCardLike = handleCardLike;
    this._setEventListenerDelete = this._setEventListenerDelete.bind(this);
  }

  createCard() {
    this._cardElement = this._getTemplate();
    this._setEventListenerDelete();
    this._setEventListenerLike();
    this._setEventListenerOpenPreview();

    this._cardElement.querySelector(".place__photo").src = this._link;
    this._cardElement.querySelector(".place__photo").alt =
      this._name + ". Фотография.";
    this._cardElement.querySelector(".place__name").textContent = this._name;
    debugger;
    this.setLike(this._likes, this._myId);

    if (this._ownerId != this._myId) {
      this._disableDeleteButton();
    }

    return this._cardElement;
  }

  setLike(likesArray, myId) {
    function checkArray(likes) {
      for (let i = 0; i < likesArray.length; i++) {
        debugger;
        if (likes[i]._id == myId) {
          return true;
        }
      }
    }
    this._cardElement.querySelector(".place__like-counter").textContent =
      likesArray.length;
    if (checkArray(likesArray)) {
      this._cardElement
        .querySelector(".place__like-button")
        .classList.add("place__like-button_active");
    } else {
      this._cardElement
        .querySelector(".place__like-button")
        .classList.remove("place__like-button_active");
    }
    this._newLikesArray = likesArray;
    return this._newLikesArray;
  }

  _disableDeleteButton() {
    this._cardElement
      .querySelector(".place__trash")
      .classList.add("place__trash_invisible");
  }

  deleteCard(id) {
    if ((this._id = `${id}`)) {
      this._cardElement.remove();
    }
  }

  _getTemplate() {
    this._cardElement = document
      .querySelector(this._templateCardSelector)
      .content.querySelector(".place")
      .cloneNode(true);
    return this._cardElement;
  }

  _setEventListenerDelete() {
    this._cardElement
      .querySelector(".place__trash")
      .addEventListener("click", () => {
        debugger;
        this._handleCardDelete();
      });
  }

  _setEventListenerLike() {
    const cardLike = this._cardElement.querySelector(".place__like-button");
    cardLike.addEventListener("click", () => {
      debugger;
      this._handleCardLike(this._id, this._newLikesArray);
    });
  }

  _setEventListenerOpenPreview() {
    const cardCover = this._cardElement.querySelector(".place__photo-cover");
    cardCover.addEventListener("click", (evt) => {
      const openCardElement = evt.target.closest(".place__photo-cover");
      this._handleCardClick(openCardElement);
    });
  }
}

export default Card;
