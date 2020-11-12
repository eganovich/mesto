import '../pages/index.css';

import FormValidator from '../components/FormValidator.js';
import Card from '../components/Card.js';
import Section from '../components/Section.js';


import {
    objectForValidation,
    editProfileModal,
    addCardModal,
    editAvatarModal,
    editProfileModalOpenButton,
    addCardModalOpenButton,
    editAvatarOpenButton
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
}
 */
const api = new Api({
    url: 'https://mesto.nomoreparties.co/v1/cohort-17',
    headers: {
        authorization: 'cd3a27fc-dbc8-4f9e-8b6d-a08ba5c31a75',
        'Content-Type': 'application/json'
    }
});


const popupWithImage = new PopupWithImage('.modal_type_photo');
popupWithImage.setEventListeners();

function createCard(item) {
    const card = new Card({
        item: item,
        templateCardSelector: '.template-card',
        handleCardClick: (element) => {
            popupWithImage.open(element);
        },
        handleCardDelete: () => {

            const popupWithConfirmation = new PopupWithConfirmation({
                modalSelector: '.modal_type_delete-card',
                handleFormSubmit: (id) => {
                    api.deleteCard(id).then(() => {
                        card.deleteCard(id);
                    });
                }
            })

            popupWithConfirmation.setEventListeners();
            popupWithConfirmation.open(item);
        },
        handleCardLike: (id, likes) => {
            debugger;
            function checkArray(likes){
            for (let i=0; i < likes.length; i++){
                if (likes[i]._id == '1ce5c7de3a5db075869918f8'){
                    return true;
                }
            };}

            if (checkArray(likes))
            {
                
                api.deleteLike(id).then((data) => {
                    const likes = data.likes;
                    card.setLike(likes);
                })
               
            } 
            else 
            {
                api.setLike(id).then((data) => {
                    const likes = data.likes;
                    card.setLike(likes);
                });
            }
        }

    })
    return card.createCard();

}


const cardList = new Section({
    renderer: (item) => {
        debugger;
        const cardElement = createCard(item);
        cardList.addItem(cardElement);
    }
}, '.places');

//Добавляем карточки на страницу из массива с сервера
api.getCards().then((data) => {
    const items = data.map(card => {

        return {
            name: card.name,
            link: card.link,
            id: card._id,
            ownerId: card.owner._id,
            likes: card.likes
        }
    });

    cardList.renderItems(items);

});


//Создаем экземпляр класса UserInfo для редактирования профиля
const userInfo = new UserInfo('.profile__name', '.profile__about', '.profile__avatar');


api.getInfoAboutUser().then((infoAboutUser) => {
    userInfo.setUserInfo(infoAboutUser);
    userInfo.setUserAvatar(infoAboutUser);
})


//Создаем экземпляр класса FormValidator для Модалки редактирования профиля
const editeProfileValidator = new FormValidator(objectForValidation, editProfileModal);
editeProfileValidator.enableValidation();

//Создаем экземпляр класса FormValidator для Модалки добавления новой карточки
const addCardValidator = new FormValidator(objectForValidation, addCardModal);
addCardValidator.enableValidation();

//Создаем экземпляр класса FormValidator для Модалки добавления новой карточки
const editAvatarValidator = new FormValidator(objectForValidation, editAvatarModal);
editAvatarValidator.enableValidation();


//Создаем экземпляр класса PopupWithForm для модалки обновления профиля
const popupWithFormForEditProfile = new PopupWithForm({
    modalSelector: '.modal_type_edit-profile',
    handleFormSubmit: (newUserInfo) => {
        api.patchInfoAboutUser(newUserInfo);
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


//Создаем экземпляр класса PopupWithForm для модалки обновления аватара
const popupWithFormForEditAvatar = new PopupWithForm({
    modalSelector: '.modal_type_edit-avatar',
    handleFormSubmit: (newUserInfo) => {
        api.patchAvatar(newUserInfo);
        userInfo.setUserAvatar(newUserInfo);
        popupWithFormForEditAvatar.close();
    }
});

//добавляем слушателей на модалку popupWithFormForEditAvatar
popupWithFormForEditAvatar.setEventListeners();

//Добавляем слушатель на кнопку открытия Модалки обновления аватара
editAvatarOpenButton.addEventListener('click', () => {
    editAvatarValidator.disableButton();
    editAvatarValidator.resetErrors();
    popupWithFormForEditAvatar.open();
});


//Создаем экземпляр класса PopupWithForm для Модалки добавления новой карточки
const popupWithFormForAddCard = new PopupWithForm({
    modalSelector: '.modal_type_add-card',
    handleFormSubmit: (newCard) => {

        api.postNewCard(newCard).then((data) => {
            const items = [];
            items[0] = {
                name: data.name,
                link: data.link,
                id: data._id,
                ownerId: data.owner._id,
                likes: data.likes
            }
            debugger;
            cardList.renderItems(items);

        });
        popupWithFormForAddCard.close();

        //cardElement.querySelector('.place__trash').classList.add('place__trash_invisible');
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

