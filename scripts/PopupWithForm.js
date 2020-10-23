import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor({modalSelector, handleFormSubmit}) {
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
        this._modal.addEventListener('submit', () =>{
            //e.preventDefault();
            this._handleFormSubmit(this._getInputValues());   
             
            this.close();   
            //this._formValues = {};   
        } );
    }

    close() {
        super.close();
        this._modal.querySelector('.modal__edit-form').reset();        
    }
}
