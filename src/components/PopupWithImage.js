import Popup from './Popup.js';

class PopupWithImage extends Popup {
    constructor(modalSelector) {
        super(modalSelector);     
    }

    open(element) {
        debugger;
        const modal = this._modal.querySelector('.modal__photo');        
        modal.src = element.querySelector('.place__photo').src;
        modal.alt = element.querySelector('.place__photo').alt;;
        this._modal.querySelector('.modal__photo-title').textContent = element.querySelector('.place__photo').alt;;

        super.open();
    }

}
export default PopupWithImage;