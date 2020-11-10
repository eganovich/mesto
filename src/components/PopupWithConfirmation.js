import Popup from './Popup.js';


export default class PopupWithConfirmation extends Popup {
    constructor({ modalSelector, handleFormSubmit }) {
        super(modalSelector);
        this._handleFormSubmit = handleFormSubmit;
    }

    setEventListeners() {
        super.setEventListeners();
        //console.log(this._modal.querySelector('.modal__confirm-form'));
        this._modal.querySelector('.modal__confirm-form').addEventListener('submit', (e) => {
            e.preventDefault();
           // const d = e.target.closest('place');
            this._handleFormSubmit();
            this.close();
        });
    }

    
 

}