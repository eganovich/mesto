import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(modalSelector, element) {
        super(modalSelector);
        this._name = element.querySelector('.place__photo').alt;
        this._link = element.querySelector('.place__photo').src;
    }

    open() {
        this._modal.querySelector('.modal__photo ').src = this._link;
        this._modal.querySelector('.modal__photo ').alt = this._name;
        this._modal.querySelector('.modal__photo-title').textContent = this._name;

        super.open();
    }

}
