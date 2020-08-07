const object = {
  formSelector: '.modal__edit-form',
  inputSelector: '.modal__input',
  submitButtonSelector: '.modal__submit-button',
  inactiveButtonClass: 'modal__submit-button_disabled',
  inputErrorClass: 'modal__input_invalide',
  errorClass: 'modal__error-message_visible'
}

const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass }) => {
  const forms = Array.from(document.querySelectorAll(formSelector));
  forms.forEach((formElement) => {
    resetDefaultBehavior(formElement);
    setInputEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, errorClass, inputErrorClass); 
  });
}

//Обнуляем дефолтное поведение формы
const resetDefaultBehavior = (formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();    
  });
}

//Скрываем ошибки
const hideErrorMessage = (formElement, inputElement, errorClass, inputErrorClass) => {
  const errorMessage = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorMessage.textContent = "";
  errorMessage.classList.remove(errorClass)
  
} 

//Показываем ошибки
const showErrorMessage = (formElement, inputElement, errorClass, inputErrorClass) => {
  const errorMessage = formElement.querySelector(`#${inputElement.name}-error`);
  inputElement.classList.add(inputErrorClass);
  errorMessage.textContent = inputElement.validationMessage;
  errorMessage.classList.add(errorClass);
  
}

//Проверяем валидность конкретного инпута
const checkInputValidity = (formElement, inputElement, errorClass, inputErrorClass) => {
  if (!inputElement.validity.valid) {
    showErrorMessage(formElement, inputElement, errorClass, inputErrorClass);
  } else {
    hideErrorMessage(formElement, inputElement, errorClass, inputErrorClass);
  }
};

//Проверяем валидность всей формы
const hasInvalidInput = (inputs) => {
  return inputs.some((inputElement) => {
  return !inputElement.validity.valid;
  })
};

//Тогглим кнопку в зависимости от валидности всей формы
const toggleButtonState = (inputList, buttonSubmit, inactiveButtonClass) => {  
  if (hasInvalidInput(inputList)){
    buttonSubmit.classList.add(inactiveButtonClass);
    buttonSubmit.setAttribute('disabled', true);
    
  } else {
      buttonSubmit.classList.remove(inactiveButtonClass);
      buttonSubmit.removeAttribute('disabled');
      
  }
}

//Добавляем слушатели инпута на все инпуты
const setInputEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, errorClass, inputErrorClass) => {
  const inputs = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonSubmit = formElement.querySelector(submitButtonSelector); 
   inputs.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement, errorClass, inputErrorClass);
      toggleButtonState(inputs, buttonSubmit, inactiveButtonClass);
    });
  }); 
}


enableValidation(object);



