import '../pages/index.css';

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';


import {
    //initialCards,
    objectForValidation,
    editProfileModal,
    addCardModal,
    editProfileModalOpenButton,
    addCardModalOpenButton
} from '../components/constants.js'

import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';

import {
    setUserInfoFromProfile
} from '../components/utils.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import Api from '../components/Api.js';



//Функция, которая создает экземпляр карточки
/* const createCardInstance = (item) => {
    const card = new Card(
        item,
        '.template-card',
        handleCardClick,
        openPopupWithConfirmation);
    const cardElement = card.createCard(); 
    return cardElement;
} */

const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-17',
    headers: {
      authorization: 'cd3a27fc-dbc8-4f9e-8b6d-a08ba5c31a75',
      'Content-Type': 'application/json'
    }
  }); 


const popupWithImage = new PopupWithImage('.modal_type_photo');
popupWithImage.setEventListeners();

//функция открытия превью карточки по клику
const handleCardClick = (element) => {
  popupWithImage.open(element);   
}


const card = new Card(
    '.template-card',
    handleCardClick,
    openPopupWithConfirmation);

    
api.getCards().then((data) => {
    const items = data.map(card => {
      return{
        name: card.name,
        link: card.link,
      }
    });
    console.log(items);
    const cardList = new Section({
        cards: items,
        // renderer создает экземпляры класса Card для каждого объекта из массива
        renderer: (item) => {
            const cardElement = card.createCard(item);
            cardList.addItem(cardElement);
            cardElement.querySelector('.place__trash').classList.add('place__trash_invisible');
        }
    }, '.places');
    cardList.renderItems();
});
//console.log(initialCards);
debugger;

//Добавляем карточки на страницу из массива 
/* const cardList = new Section({
    cards: initialCards,
    // renderer создает экземпляры класса Card для каждого объекта из массива
    renderer: (item) => {
        const cardElement = card.createCard(item);
        cardList.addItem(cardElement);
        cardElement.querySelector('.place__trash').classList.add('place__trash_invisible');
    }
}, '.places');
cardList.renderItems(); */

//Создаем экземпляр класса UserInfo для редактирования профиля
const userInfo = new UserInfo('.profile__name', '.profile__about');

//Создаем экземпляр класса FormValidator для Модалки редактирования профиля
const editeProfileValidator = new FormValidator(objectForValidation, editProfileModal);
editeProfileValidator.enableValidation();

//Создаем экземпляр класса FormValidator для Модалки добавления новой карточки
const addCardValidator = new FormValidator(objectForValidation, addCardModal);
addCardValidator.enableValidation(); 


//Создаем экземпляр класса PopupWithForm для модалки обновления профиля
const popupWithFormForEditProfile = new PopupWithForm({
    modalSelector: '.modal_type_edit-profile',
    handleFormSubmit: (newUserInfo) => {
        userInfo.setUserInfo(newUserInfo);
        popupWithFormForEditProfile.close();
    }
});

//добавляем слушателей на модалку popupWithFormForEditProfile
popupWithFormForEditProfile.setEventListeners();

//Добавляем слушатель на кнопку открытия Модалки обновления профиля
editProfileModalOpenButton.addEventListener('click', () => {  
    editeProfileValidator.enableButton();
    const userInfoFromProfile = userInfo.getUserInfo()
    setUserInfoFromProfile(userInfoFromProfile);
    editeProfileValidator.resetErrors();
    popupWithFormForEditProfile.open();
});



//Создаем экземпляр класса PopupWithForm для Модалки добавления новой карточки
const popupWithFormForAddCard = new PopupWithForm({
    modalSelector: '.modal_type_add-card',
    handleFormSubmit: (items) => {
        const cardElement = card.createCard({ name: items['place-name'], link: items['place-photo-link'] });
        cardList.addItem(cardElement);
    
        popupWithFormForAddCard.close();
    }

});

//добавляем слушателей на модалку popupWithFormForAddCard
popupWithFormForAddCard.setEventListeners();

//Добавляем слушатель на кнопку открытия Модалки добавления новой карточки
addCardModalOpenButton.addEventListener('click', () => {
    addCardValidator.disableButton();
    addCardValidator.resetErrors();
    popupWithFormForAddCard.open();    
});



const popupWithConfirmation = new PopupWithConfirmation({
    modalSelector: '.modal_type_delete-card',
    handleFormSubmit: () => {
      //console.log(card);
      cardList.deleteCard(this.card);
    }
})

popupWithConfirmation.setEventListeners();
function openPopupWithConfirmation() {
    popupWithConfirmation.open();   
}; 