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
        this._modal.querySelector('.modal__edit-form').reset();
    }   
    
    setLoading(isLoading){
      if(isLoading){
        this._modal.querySelector('.modal__submit-button').textContent = 'Сохранение...'
      } else {
        this._modal.querySelector('.modal__submit-button').textContent = 'Сохранить' 
      }
    }

}
