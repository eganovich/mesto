//Объявляем элементы страницы
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const cardsList = document.querySelector('.places');

//Объявляем модальные окна по уникальному селектору
const editProfileModal = document.querySelector('.modal_type_edit-profile');
const addCardModal = document.querySelector('.modal_type_add-card');
const photoModal = document.querySelector('.modal_type_photo')

//Объявляем кнопки, открывающие модальные окна
const editProfileModalOpenButton = document.querySelector('.edit-button');
const addCardModalOpenButton = document.querySelector('.add-button');

//Объявляем кнопки, закрывающие модальные окна
const editProfileModalCloseButton = editProfileModal.querySelector('.modal__close-button');
const addCardModalCloseButton = addCardModal.querySelector('.modal__close-button');
const photoModalCloseButton = photoModal.querySelector('.modal__close-button');

//Объявляем элементы внутри модальных окон
//editProfileModal
const editProfileFormName = editProfileModal.querySelector('.modal__input_type_name');
const editProfileFormAbout = editProfileModal.querySelector('.modal__input_type_about');

//addCardModal
const addCardForm = addCardModal.querySelector('.modal__edit-form');
const addCardFormPlaceName = addCardModal.querySelector('.modal__input_type_place-name');
const addCardFormPlacePhotoLink = addCardModal.querySelector('.modal__input_type_place-photo-link');
const addCardFormSubmitButton = addCardModal.querySelector('.modal__submit-button');


//photoModal
const modalPhoto = photoModal.querySelector('.modal__photo ');
const modalPhotoTitle = photoModal.querySelector('.modal__photo-title');

//Функция открывания и закрывания всех модалок
function toggleModal(modal) {
    modal.classList.toggle('modal_is-open');
}

//Закрываем все модалки по Esc
document.addEventListener('keydown', (evt) => {
    if(evt.key === "Escape") {
        toggleModal(document.querySelector('.modal_is-open'));
    };
});

//Закрываем модалки нажанием на оверлэй
const setOverlayListener = () => {
    const overlayList = Array.from(document.querySelectorAll('.modal__overlay'));
    overlayList.forEach((overlay) => {
      overlay.addEventListener('click', (evt) => {
        toggleModal(evt.target.parentElement);
      });
    });
  }
setOverlayListener();


//Модалка обновления профиля
editProfileModalOpenButton.addEventListener('click', () => {
    toggleModal(editProfileModal);
    updateModalEditProfileForm();
})

editProfileModalCloseButton.addEventListener('click', () => {
    toggleModal(editProfileModal);
})

editProfileModal.addEventListener('submit', submitEditProfileForm);

function updateProfile() {
    profileName.textContent = editProfileFormName.value;
    profileAbout.textContent = editProfileFormAbout.value;
}

function updateModalEditProfileForm() {
    editProfileFormName.value = profileName.textContent;
    editProfileFormAbout.value = profileAbout.textContent;
}

function submitEditProfileForm() {
    updateProfile();
    toggleModal(editProfileModal);
}

//Модалка добавления новой карточки
addCardModalOpenButton.addEventListener('click', () => {
    toggleModal(addCardModal);
    addCardForm.reset();
})

addCardModalCloseButton.addEventListener('click', () => {
    toggleModal(addCardModal);
    addCardForm.reset();
})

addCardModal.addEventListener('submit', submitAddCardForm);

function submitAddCardForm() {
    renderCard({ name: addCardFormPlaceName.value, link: addCardFormPlacePhotoLink.value });
    toggleModal(addCardModal);
    addCardFormSubmitButton.classList.add('modal__submit-button_disabled');
    addCardFormSubmitButton.setAttribute('disabled', true);
}

//Модалка с фотографией
photoModalCloseButton.addEventListener('click', () => {
    toggleModal(photoModal);
})


//Генерация карточек
const templateCard = document.querySelector('.template-card').content.querySelector('.place');

//Массив исходных карточек
const initialCards = [
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


function createCard(data) {
    const cardElement = templateCard.cloneNode(true);
    const cardPhoto = cardElement.querySelector('.place__photo');
    const cardName = cardElement.querySelector('.place__name');
    const cardLike = cardElement.querySelector('.place__like');
    const cardRemove = cardElement.querySelector('.place__trash');

    cardName.textContent = data.name;
    cardPhoto.alt = data.name + '. Фотография.';
    cardPhoto.src = data.link;

    cardRemove.addEventListener('click', (e) => {
        e.target.closest('.place').remove();
    })

    cardLike.addEventListener('click', (e) => {
        e.target.classList.toggle('place__like_active');
    })

    cardPhoto.addEventListener('click', (e) => {
        e.target.closest('.place');
        modalPhoto.src = cardPhoto.src;
        modalPhoto.alt = cardPhoto.alt;
        modalPhotoTitle.textContent = cardName.textContent;
        toggleModal(photoModal);
    })

    return cardElement;
}


initialCards.forEach((data) => {
    renderCard(data);
})

function renderCard(data) {
    cardsList.prepend(createCard(data));
}


  