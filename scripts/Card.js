import { toggleModal } from './utils.js';

//Кладем в переменную модальное окно с фотографией
const photoModal = document.querySelector('.modal_type_photo');

//Кладем в переменные элементы фотографии внутри модалки
const modalPhoto = photoModal.querySelector('.modal__photo ');
const modalPhotoTitle = photoModal.querySelector('.modal__photo-title');


class Card {
    constructor(data, templateCardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._templateCardSelector = templateCardSelector;
    }

    createCard = () => {
        this._cardElement = this._getTemplate();
        this._setEventListenerDelete();
        this._setEventListenerLike();
        this._setEventListenerOpenPreview();

        this._cardElement.querySelector('.place__photo').src = this._link;
        this._cardElement.querySelector('.place__photo').alt = this._name + '. Фотография.';
        this._cardElement.querySelector('.place__name').textContent = this._name;

        return this._cardElement;
    }

    _getTemplate = () => {
        this._cardElement = document
            .querySelector(this._templateCardSelector)
            .content
            .querySelector('.place')
            .cloneNode(true);
        return this._cardElement;
    }


    _setEventListenerDelete = () => {
        const cardRemove = this._cardElement.querySelector('.place__trash');
        cardRemove.addEventListener('click', (evt) => {
            evt.target.closest('.place').remove();
        })
    }

    _setEventListenerLike = () => {
        const cardLike = this._cardElement.querySelector('.place__like');
        cardLike.addEventListener('click', (evt) => {
            evt.target.classList.toggle('place__like_active');
        })
    }

    _setEventListenerOpenPreview = () => {
        this._cardElement.querySelector('.place__photo').addEventListener('click', (evt) => {
            evt.target.closest('.place');
            modalPhoto.src = this._cardElement.querySelector('.place__photo').src;
            modalPhoto.alt = this._cardElement.querySelector('.place__photo').alt;
            modalPhotoTitle.textContent = this._cardElement.querySelector('.place__name').textContent;
            toggleModal(photoModal);
        })
    }
}

export default Card;