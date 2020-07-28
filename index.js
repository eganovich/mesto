//modals
const editProfileModal = document.querySelector('.modal_type_edit-profile');
const addCardModal = document.querySelector('.modal_type_add-card');
const photoModal = document.querySelector('.modal_type_photo')
const modal = document.querySelector('.modal');


//DOM elements
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const cardsList = document.querySelector('.places');
const templateCard = document.querySelector('.template-card').content.querySelector('.place');


//open-modals-buttons
const editProfileModalOpenButton = document.querySelector('.edit-button');
const addCardModalOpenButton = document.querySelector('.add-button');


//close-modals-buttons
const editProfileModalCloseButton = editProfileModal.querySelector('.modal__close-button');
const addCardModalCloseButton = addCardModal.querySelector('.modal__close-button');
const photoModalCloseButton = photoModal.querySelector('.modal__close-button');


//editProfileModal's elements
const EditProfileForm = editProfileModal.querySelector('.modal__edit-form');
const EditProfileFormName = editProfileModal.querySelector('.modal__input_type_name');
const EditProfileFormAbout = editProfileModal.querySelector('.modal__input_type_about');
const EditProfileFormSubmitButton = editProfileModal.querySelector('.modal__submit-button')

//addCardModal's elements
const addCardForm = addCardModal.querySelector('.modal__edit-form');
const addCardFormPlaceName = addCardModal.querySelector('.modal__input_type_place-name');
const addCardFormPlacePhotoLink = addCardModal.querySelector('.modal__input_type_place-photo-link');
const addCardFormSubmitButton = addCardModal.querySelector('.modal__submit-button')

//photoModal's elements
const modalPhoto = photoModal.querySelector('.modal__photo ');
const modalPhotoTitle = photoModal.querySelector('.modal__photo-title');

//Card's array
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


function profileUpdate() {
    profileName.textContent = EditProfileFormName.value;
    profileAbout.textContent = EditProfileFormAbout.value;
}

function modalEditFormUpdate() {
    EditProfileFormName.value = profileName.textContent;
    EditProfileFormAbout.value = profileAbout.textContent;
}

function toggleModal(modal) {
    modal.classList.toggle('modal_is-open');
}


editProfileModalOpenButton.addEventListener('click', () => {
    if (editProfileModal.classList.contains('modal__is-open') === false) {
        toggleModal(editProfileModal);
        modalEditFormUpdate();
    } else {
        toggleModal(editProfileModal);
    }
})

editProfileModalCloseButton.addEventListener('click', () => {
    toggleModal(editProfileModal);
})


addCardModalOpenButton.addEventListener('click', () => {
    toggleModal(addCardModal);
    addCardForm.reset();
})

addCardModalCloseButton.addEventListener('click', () => {
    toggleModal(addCardModal);
    addCardForm.reset();
})

function editFormSubmitHandler(e) {
    e.preventDefault();
    profileUpdate();
    toggleModal(editProfileModal);

}

editProfileModal.addEventListener('submit', editFormSubmitHandler);

function addCardFormSubmitHandler(e) {
    e.preventDefault();
    renderCard({ name: addCardFormPlaceName.value, link: addCardFormPlacePhotoLink.value });
    toggleModal(addCardModal);
}

addCardModal.addEventListener('submit', addCardFormSubmitHandler);

photoModalCloseButton.addEventListener('click', () => {
    toggleModal(photoModal);
})

