import '../pages/index.css';

import FormValidator from './FormValidator.js';
import Card from './Card.js';
import Section from './Section.js';

import {
    initialCards,
    objectForValidation,
    editProfileModal,
    addCardModal,
    editProfileModalOpenButton,
    addCardModalOpenButton
} from './constants.js'

import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

import handleCardClick from './utils.js';

//Добавляем карточки на страницу из массива 
const defaultCardList = new Section({
    cards: initialCards,

    // renderer создает экземпляры класса Card для каждого объекта из массива
    renderer: (item) => {
        const card = new Card(
            item,
            '.template-card',
            handleCardClick);
        const cardElement = card.createCard();

        defaultCardList.addItem(cardElement);
    }
}, '.places');
defaultCardList.renderItems();

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
    popupWithFormForEditProfile.enableButton();
    userInfo.getUserInfo();
    popupWithFormForEditProfile.open();
});

//Создаем экземпляр класса PopupWithForm для Модалки добавления новой карточки
const popupWithFormForAddCard = new PopupWithForm({
    modalSelector: '.modal_type_add-card',
    handleFormSubmit: (items) => {
        const addCardToList = new Section({
            cards: [{ name: items['place-name'], link: items['place-photo-link'] }],
            renderer: (item) => {
                const card = new Card(
                    item,
                    '.template-card',
                    handleCardClick);
                const cardElement = card.createCard();
                addCardToList.addItem(cardElement);
            }
        }, '.places');
        addCardToList.renderItems();
        popupWithFormForAddCard.close();
    }

});

//добавляем слушателей на модалку popupWithFormForAddCard
popupWithFormForAddCard.setEventListeners();

//Добавляем слушатель на кнопку открытия Модалки добавления новой карточки
addCardModalOpenButton.addEventListener('click', () => {
    popupWithFormForAddCard.disableButton();
    popupWithFormForAddCard.open();    
});


