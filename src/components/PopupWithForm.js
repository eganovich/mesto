import Popup from './Popup.js';


export default class PopupWithForm extends Popup {
    constructor({ modalSelector, handleFormSubmit }) {
        super(modalSelector);
        this._handleFormSubmit = handleFormSubmit;
    }


    _getInputValues() {
        this._inputList = this._modal.querySelectorAll('.modal__input');
        this._formValues = {};
        this._inputList.forEach(input => this._formValues[input.name] = input.value);
        return this._formValues;
    }

    setEventListeners() {
        super.setEventListeners();
        this._modal.querySelector('.modal__edit-form').addEventListener('submit', (e) => {
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._resetErrors();
    }    

    _resetErrors(){
        this._modal.querySelector('.modal__edit-form').reset();

        this._modal.querySelectorAll('.modal__error-message').forEach(item => {
            item.classList.remove('modal__error-message_visible');
        });

        this._modal.querySelectorAll('.modal__input').forEach(item => {        
            item.classList.remove('modal__input_invalide');
        });

    }

    
    disableButton(){
        this._modal.querySelector('.modal__submit-button').classList.add('modal__submit-button_disabled');
        this._modal.querySelector('.modal__submit-button').setAttribute('disabled', true);
      };

    enableButton(){
        this._modal.querySelector('.modal__submit-button').classList.remove('modal__submit-button_disabled');
        this._modal.querySelector('.modal__submit-button').removeAttribute('disabled');
      };

}
