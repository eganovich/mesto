class FormValidator {
  constructor(object, formElement) {
    this._modal = object.modalSelector;
    this._formSelector = object.formSelector;
    this._inputSelector = object.inputSelector;
    this._inactiveButtonClass = object.inactiveButtonClass;
    this._inputErrorClass = object.inputErrorClass;
    this._errorClass = object.errorClass;
    this._errorClassVisible = object.errorClassVisible;
    this._formElement = formElement;
    this._submitButton = this._formElement.querySelector(
      object.submitButtonSelector
    );
  }

  //Запускаем валидацию
  enableValidation() {
    this._resetDefaultBehavior();
    this._setInputEventListeners(this._inputSelector);
  }

  //Обнуляем дефолтное поведение формы
  _resetDefaultBehavior() {
    this._formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
  }

  //Скрываем ошибки
  _hideErrorMessage(inputElement) {
    const errorMessage = this._formElement.querySelector(
      `#${inputElement.name}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorMessage.textContent = "";
    errorMessage.classList.remove(this._errorClassVisible);
  }

  //Показываем ошибки
  _showErrorMessage(inputElement) {
    const errorMessage = this._formElement.querySelector(
      `#${inputElement.name}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorMessage.textContent = inputElement.validationMessage;
    errorMessage.classList.add(this._errorClassVisible);
  }

  //Проверяем валидность конкретного инпута
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showErrorMessage(inputElement);
    } else {
      this._hideErrorMessage(inputElement);
    }
  }

  //Проверяем валидность всей формы
  _hasInvalidInput(inputs) {
    return inputs.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  //Тогглим кнопку в зависимости от валидности всей формы
  _toggleButtonState(inputs) {
    if (this._hasInvalidInput(inputs)) {
      this.disableButton();
    } else {
      this.enableButton();
    }
  }

  //Добавляем слушатели инпута на все инпуты
  _setInputEventListeners() {
    const inputs = Array.from(
      this._formElement.querySelectorAll(this._inputSelector)
    );
    inputs.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputs);
      });
    });
  }

  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.setAttribute("disabled", true);
  }

  enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.removeAttribute("disabled");
  }

  resetErrors() {
    this._formElement.querySelectorAll(this._errorClass).forEach((item) => {
      item.classList.remove(this._errorClassVisible);
    });

    this._formElement.querySelectorAll(this._inputSelector).forEach((item) => {
      item.classList.remove(this._inputErrorClass);
    });
  }
}

export default FormValidator;
