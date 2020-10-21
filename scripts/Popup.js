export default class Popup {
    constructor(modalSelector) {
        this._modal = document.querySelector(modalSelector);
    }

    open = () => {
      this._modal.classList.add('modal_is-open'); 
      document.addEventListener('keydown', this._closeModalByEsc);
      this._modal.addEventListener('click', this._closeModalByOverlay);
    }

    close = () => {
        this._modal.classList.remove('modal_is-open'); 
        document.removeEventListener('keydown', this._closeModalByEsc);
        this._modal.removeEventListener('click', this._closeModalByOverlay);
      }

    /* toggleModal = () => {
        console.log(this._modal);
        this._modal.classList.toggle('modal_is-open');
        if (this._modal.classList.contains('modal_is-open') === false) {
            console.log('мы в фолс');
            document.removeEventListener('keydown', this._closeModalByEsc);
            this._modal.removeEventListener('click', this._closeModalByOverlay);
        } else {
            console.log('мы в Тру');
            document.addEventListener('keydown', this._closeModalByEsc);
            this._modal.addEventListener('click', this._closeModalByOverlay);
        }
    } */

    //Метод закрытия модалки по клику на Esc
    _closeModalByEsc = (evt) => {
        //modal = document.querySelector('.modal_is-open')
        if (evt.key === "Escape") {
            this.close();
        };
    }
    //Функция закрытия модалки по клику на оверлей
   _closeModalByOverlay = (evt) => {
        if (evt.target.classList.contains('modal__overlay')) {
           // this.toggleModal(evt.target.parentElement);
            this.close();
        }
    }

    setEventListeners = () => {
      this._modal.querySelector('.modal__close-button').addEventListener('click', () => {
            this.close();
        })
    }

};






