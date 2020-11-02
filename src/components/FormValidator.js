class FormValidator {
    constructor (object, formElement) {
      this._modal = object.modalSelector;
      this._formSelector = object.formSelector;
      this._inputSelector = object.inputSelector;
      this._submitButtonSelector = object.submitButtonSelector;
      this._inactiveButtonClass = object.inactiveButtonClass;
      this._inputErrorClass = object.inputErrorClass;
      this._errorClass = object.errorClass;
      this._formElement = formElement;
    }
 
  //Запускаем валидацию
    enableValidation() {
      this._resetDefaultBehavior();
      this._setInputEventListeners(this._inputSelector);     
    }
    

   //Обнуляем дефолтное поведение формы
   _resetDefaultBehavior() {
      this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault(); 
    });
  }

   //Скрываем ошибки
    _hideErrorMessage(inputElement) {     
     const errorMessage = this._formElement.querySelector(`#${inputElement.name}-error`);
     inputElement.classList.remove(this._inputErrorClass);
     errorMessage.textContent = "";
     errorMessage.classList.remove(this._errorClass);    
  };
  
  //Показываем ошибки
    _showErrorMessage(inputElement) {   
    const errorMessage = this._formElement.querySelector(`#${inputElement.name}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorMessage.textContent = inputElement.validationMessage;
    errorMessage.classList.add(this._errorClass);
    
  };

   //Проверяем валидность конкретного инпута
  _checkInputValidity(inputElement) {    
    if (!inputElement.validity.valid) {
      this._showErrorMessage(inputElement);
    } else {
      this._hideErrorMessage(inputElement);
    }
  };

    
//Проверяем валидность всей формы
_hasInvalidInput(inputs) {
    return inputs.some((inputElement) => {
    return !inputElement.validity.valid;
    })
  };

  //Тогглим кнопку в зависимости от валидности всей формы
  _toggleButtonState(inputList, buttonSubmit) {  
    if (this._hasInvalidInput(inputList)){
      buttonSubmit.classList.add(this._inactiveButtonClass);
      buttonSubmit.setAttribute('disabled', true);
      
    } else {
        buttonSubmit.classList.remove(this._inactiveButtonClass);
        buttonSubmit.removeAttribute('disabled');
        
    }
  }
   
  //Добавляем слушатели инпута на все инпуты
  _setInputEventListeners() {
    const inputs = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    const buttonSubmit = this._formElement.querySelector(this._submitButtonSelector); 
     inputs.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {        
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputs, buttonSubmit);
      });
    }); 
  }

  disableButton(){
    this._formElement.querySelector(this._submitButtonSelector).classList.add('modal__submit-button_disabled');
    this._formElement.querySelector(this._submitButtonSelector).setAttribute('disabled', true);
  };

  enableButton(){
    this._formElement.querySelector(this._submitButtonSelector).classList.remove('modal__submit-button_disabled');
    this._formElement.querySelector(this._submitButtonSelector).removeAttribute('disabled');
  }; 
  
  resetErrors(){
    //this._modal.querySelector('.modal__edit-form').reset();

    this._formElement.querySelectorAll('.modal__error-message').forEach(item => {
        item.classList.remove('modal__error-message_visible');
    });

    this._formElement.querySelectorAll('.modal__input').forEach(item => {        
        item.classList.remove('modal__input_invalide');
    });
}
}

export default FormValidator;


  

  
  
  
  