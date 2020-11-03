import Popup from './Popup.js';

class PopupWithImage extends Popup {
    constructor(modalSelector, element) {
        super(modalSelector);
        this._name = element.querySelector('.place__photo').alt;
        this._link = element.querySelector('.place__photo').src;
    }

    open() {
        const modal = this._modal.querySelector('.modal__photo');
        modal.src = this._link;
        modal.alt = this._name;
        this._modal.querySelector('.modal__photo-title').textContent = this._name;

        super.open();
    }

}
export default PopupWithImage;