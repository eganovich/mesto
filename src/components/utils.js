import PopupWithImage from './PopupWithImage.js';
import {editProfileFormName, editProfileFormAbout} from './constants.js';

//функция открытия превью карточки по клику
export const handleCardClick = (element) => {
    const popupWithImage = new PopupWithImage('.modal_type_photo', element);
    popupWithImage.open();
    popupWithImage.setEventListeners();
}


export const setUserInfoFromProfile = (userInfo) => {
    editProfileFormName.value = userInfo.name;
    editProfileFormAbout.value = userInfo.about;
}

