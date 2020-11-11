//Массив исходных карточек
export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    },
];


//Объявляем модальные окна по уникальному селектору
export const editProfileModal = document.querySelector('.modal_type_edit-profile');
export const addCardModal = document.querySelector('.modal_type_add-card');
export const editAvatarModal = document.querySelector('.modal_type_edit-avatar');

//Объявляем элементы внутри модальных окон
//editProfileModal
export const editProfileFormName = editProfileModal.querySelector('.modal__input_type_name');
export const editProfileFormAbout = editProfileModal.querySelector('.modal__input_type_about');


//Объявляем кнопки, открывающие модальные окна
export const editProfileModalOpenButton = document.querySelector('.edit-button');
export const addCardModalOpenButton = document.querySelector('.add-button');

export const editAvatarOpenButton = document.querySelector('.profile__avatar');

//Объект свойств модальных окон, необходых для валидации
export const objectForValidation = {
    formSelector: '.modal__edit-form',
    inputSelector: '.modal__input',
    submitButtonSelector: '.modal__submit-button',
    inactiveButtonClass: 'modal__submit-button_disabled',
    inputErrorClass: 'modal__input_invalide',
    errorClass: '.modal__error-message',
    errorClassVisible: 'modal__error-message_visible',
}