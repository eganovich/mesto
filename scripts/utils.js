import PopupWithImage from './PopupWithImage.js';

//функция открытия превью карточки по клику
const handleCardClick = (element) => {
    const popupWithImage = new PopupWithImage('.modal_type_photo', element);
    popupWithImage.open();
    popupWithImage.setEventListeners();
}

export default handleCardClick;