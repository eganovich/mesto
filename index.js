const openModalButton = document.querySelector('.edit-button');
const closeModalButton = document.querySelector('.modal__close-button');
const modal = document.querySelector('.modal');


let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');

const modalEditForm = modal.querySelector('.modal__edit-form');
let modalProfileName = modal.querySelector('.modal__input_type_name');
let modalProfileAbout = modal.querySelector('.modal__input_type_about');
const modalSubmitButton = modal.querySelector('.modal__submit-button')

function toggleModal(){
    modal.classList.toggle('modal_is-open');
    console.log(123);
}

openModalButton.addEventListener('click', toggleModal)

closeModalButton.addEventListener('click', toggleModal)

function profileUpdate(){
    profileName.textContent = modalProfileName.value;
    profileAbout.textContent = modalProfileAbout.value;
}

modalSubmitButton.addEventListener('click', profileUpdate)

function modalEditFormUpdate(){
    modalProfileName.value = profileName.textContent;
    modalProfileAbout.value = profileAbout.textContent;
}

openModalButton.addEventListener('click', modalEditFormUpdate)
modalSubmitButton.addEventListener('click', toggleModal)

