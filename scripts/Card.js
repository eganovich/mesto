import {toggleModal} from './utils.js';

//Кладем в переменную модальное окно с фотографией
const photoModal = document.querySelector('.modal_type_photo');
//Кладем в переменную темплейт карточки
const templateCard = document.querySelector('.template-card').content.querySelector('.place');
//Кладем в переменные элементы фотографии внутри модалки
const modalPhoto = photoModal.querySelector('.modal__photo ');
const modalPhotoTitle = photoModal.querySelector('.modal__photo-title');


class Card{
    constructor(data){
       this._name = data.name;
       this._link = data.link;
    }
   
     createCard = () => {
       this._cardElement = templateCard.cloneNode(true);
       const cardPhoto = this._cardElement.querySelector('.place__photo');
       const cardName = this._cardElement.querySelector('.place__name');
       const cardLike = this._cardElement.querySelector('.place__like');
       const cardRemove = this._cardElement.querySelector('.place__trash');
   
       cardName.textContent = this._name;
       cardPhoto.alt = this._name + '. Фотография.';
       cardPhoto.src = this._link;
   
       cardRemove.addEventListener('click', (evt) => {
           evt.target.closest('.place').remove();
       })
   
       cardLike.addEventListener('click', (evt) => {
           evt.target.classList.toggle('place__like_active');
       })
   
       cardPhoto.addEventListener('click', (evt) => {
           evt.target.closest('.place');
           modalPhoto.src = cardPhoto.src;
           modalPhoto.alt = cardPhoto.alt;
           modalPhotoTitle.textContent = cardName.textContent;
           toggleModal(photoModal);
       })
       
       
       return this._cardElement;
   }
   }

export default Card;