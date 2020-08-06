const object = {
  formSelector: '.modal__edit-form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__submit-button',
  inactiveButtonClass: 'modal__submit-button_disabled',
  inputErrorClass: 'modal__input_invalide',
  //errorClass: 'popup__error_visible'
}

//Обнуляем дефолтное поведение форм
const resetDefaultBehavior = ({formSelector}) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
  });
}

resetDefaultBehavior(object);

//Добавляем слушатели событий
const addEventHandler = ({inputSelector}) => {
  const inputs =  Array.from(document.querySelectorAll(inputSelector));
  inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', (evt) => {
      if (inputElement.validity.valid) {
          
      }
    console.log(inputElement.validity);
    });
  });
  
}

addEventHandler(object);



