import FormValidator from './FormValidator.js';
import Card from './Card.js';
import Section from './Section.js';
import { toggleModal } from './utils.js';

import {
    initialCards
} from './constants.js'

import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

//Объявляем элементы страницы
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

// Вот этот селектор будем передавать в класс Section
//const cardsList = document.querySelector('.places');

//Объявляем модальные окна по уникальному селектору
const editProfileModal = document.querySelector('.modal_type_edit-profile');
const addCardModal = document.querySelector('.modal_type_add-card');
const photoModal = document.querySelector('.modal_type_photo')

//Объявляем кнопки, открывающие модальные окна
const editProfileModalOpenButton = document.querySelector('.edit-button');
const addCardModalOpenButton = document.querySelector('.add-button');

//Объявляем кнопки, закрывающие модальные окна
//const editProfileModalCloseButton = editProfileModal.querySelector('.modal__close-button');
const addCardModalCloseButton = addCardModal.querySelector('.modal__close-button');
const photoModalCloseButton = photoModal.querySelector('.modal__close-button');

//Объявляем элементы внутри модальных окон
//editProfileModal
//const editProfileFormName = editProfileModal.querySelector('.modal__input_type_name');
//const editProfileFormAbout = editProfileModal.querySelector('.modal__input_type_about');

//addCardModal
const addCardForm = addCardModal.querySelector('.modal__edit-form');
const addCardFormPlaceName = addCardModal.querySelector('.modal__input_type_place-name');
const addCardFormPlacePhotoLink = addCardModal.querySelector('.modal__input_type_place-photo-link');
const addCardFormSubmitButton = addCardModal.querySelector('.modal__submit-button');

const userInfo = new UserInfo('.profile__name', '.profile__about');

//Объект свойств модальных окон, необходых для валидации
const object = {
    formSelector: '.modal__edit-form',
    inputSelector: '.modal__input',
    submitButtonSelector: '.modal__submit-button',
    inactiveButtonClass: 'modal__submit-button_disabled',
    inputErrorClass: 'modal__input_invalide',
    errorClass: 'modal__error-message_visible'
}

//Добавляем слушатель на кнопки открытия и закрытия Модалки обновления профиля
//При открытии вызываем функцию обновления формы редактирования
editProfileModalOpenButton.addEventListener('click', () => {
    
    const editProfileModal = new PopupWithForm({
        modalSelector: '.modal_type_edit-profile',
        handleFormSubmit: (newUserInfo) => {
        userInfo.setUserInfo(newUserInfo);
      }
    });
    userInfo.getUserInfo();
    editProfileModal.open();
    editProfileModal.setEventListeners();
    const editeProfileValidator = new FormValidator(object, editProfileModal);
    editeProfileValidator.enableValidation();
    //updateModalEditProfileForm();
})

//При закрытии вызываем функцию, которая закрывает модалку редактирования профиля
//editProfileModalCloseButton.addEventListener('click', () => {
//    toggleModal(editProfileModal);
//})

//Добавляем слушателя события "сабмит" на форму редактирования профиля.
//При событии "сабмит" вызыяваем функцию, которая обновляет профиль и закрывает модалку
/* editProfileModal.addEventListener('submit', submitEditProfileForm);
 */
//Функцию, которая обновляет профиль и закрывает модалку
/* function submitEditProfileForm() {
    updateProfile();
    toggleModal(editProfileModal);
} */

//Функция обновления профиля
/* function updateProfile() {
    profileName.textContent = editProfileFormName.value;
    profileAbout.textContent = editProfileFormAbout.value;
} */

//Функция обновления формы редактирования данными из профиля
/* function updateModalEditProfileForm() {
    editProfileFormName.value = profileName.textContent;
    editProfileFormAbout.value = profileAbout.textContent;
} */


//Добавляем слушатель на кнопки открытия и закрытия Модалки добавления новой карточки
addCardModalOpenButton.addEventListener('click', () => {
    const addCardModal = new PopupWithForm({
        modalSelector: '.modal_type_add-card',
        handleFormSubmit: (items) => {
            console.log(items);
            console.log(items['place-name']);
            const addCardToList = new Section({
                cards: [{name: items['place-name'], link: items['place-photo-link']}],
                renderer: (item) => {
                    const card = new Card(
                        item,
                        '.template-card',
                        handleCardClick);
                    const cardElement = card.createCard();
                    addCardToList.addItem(cardElement);
                    addCardFormSubmitButton.classList.add('modal__submit-button_disabled');
                    addCardFormSubmitButton.setAttribute('disabled', true);
                }
            }, '.places');
            addCardToList.renderItems();
        }
    }
    );
    addCardModal.open();
    addCardModal.setEventListeners();

    //addCardForm.reset();
})
//При закрытии очищаем поля Модалки добавления новой карточки
//addCardModalCloseButton.addEventListener('click', () => {
//   toggleModal(addCardModal);
//   addCardForm.reset();
//  addCardFormSubmitButton.classList.add('modal__submit-button_disabled');
// addCardFormSubmitButton.setAttribute('disabled', true);
//})

//Добавляем слушателя события "сабмит" на Модалку добавления новой карточки.
//При событии "сабмит" вызыявает
// функцию, которая генерирует карточку, закрывает модалку и добавляет селекторы для блокировки кнопки
//addCardModal.addEventListener('submit', submitAddCardForm);


/* const handleCardClick = (name, link) => {
    const addedCardPopup = new PopupWithImage('.modal_type_photo', name, link);
    addedCardPopup.open();
}
 */
const handleCardClick = (element) => {
    const popupWithImage = new PopupWithImage('.modal_type_photo', element);
    popupWithImage.open();
}

//Функция, которая генерирует карточку, закрывает модалку и добавляет селекторы для блокировки кнопки
/* function submitAddCardForm() {
    const addCardToList = new Section({
        items: [{ name: addCardFormPlaceName.value, link: addCardFormPlacePhotoLink.value }],
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

    toggleModal(addCardModal);
    addCardFormSubmitButton.classList.add('modal__submit-button_disabled');
    addCardFormSubmitButton.setAttribute('disabled', true);
}
 */
//Добавляем слушателя на кнопку закрытия окна с превью фото
//При "клик" вызываем функцию закрытия модалки
//photoModalCloseButton.addEventListener('click', () => {
  //  toggleModal(photoModal);
//})

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




//Создаем экземпляр класса FormValidator для Модалки редактирования профиля
/* const editeProfileValidator = new FormValidator(object, editProfileModal);
editeProfileValidator.enableValidation(); */

//Создаем экземпляр класса FormValidator для Модалки добавления новой карточки
const addCardValidator = new FormValidator(object, addCardModal);
addCardValidator.enableValidation(); 