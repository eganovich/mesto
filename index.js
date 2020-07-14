const openModalButton = document.querySelector('.edit-button');
const closeModalButton = document.querySelector('.modal__close-button');
const modal = document.querySelector('.modal');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const modalEditForm = modal.querySelector('.modal__edit-form');
const modalProfileName = modal.querySelector('.modal__input_type_name');
const modalProfileAbout = modal.querySelector('.modal__input_type_about');
const modalSubmitButton = modal.querySelector('.modal__submit-button')

function profileUpdate(){
    profileName.textContent = modalProfileName.value;
    profileAbout.textContent = modalProfileAbout.value;
}
function modalEditFormUpdate(){
    modalProfileName.value = profileName.textContent;
    modalProfileAbout.value = profileAbout.textContent;
}

function toggleModal(){
    if (modal.classList.contains('modal_is-open') === false){
        modalEditFormUpdate();
        modal.classList.toggle('modal_is-open');
    } else{
        modal.classList.toggle('modal_is-open');
    }
}



openModalButton.addEventListener('click', toggleModal)

modal.addEventListener('submit', (e) => {
    e.preventDefault();
    toggleModal();
    profileUpdate();
})
   

closeModalButton.addEventListener('click', () => {
    toggleModal();  
})
