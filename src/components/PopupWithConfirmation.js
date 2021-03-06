import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor({ modalSelector, handleFormSubmit }) {
    super(modalSelector);
    this._handleFormSubmit = handleFormSubmit;
  }

  setEventListeners() {
    super.setEventListeners();
    this._modal
      .querySelector(".modal__confirm-form")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        this._handleFormSubmit(this._id);
        this.close();
      });
  }

  open(item) {
    this._id = item.id;
    super.open();
  }
}
