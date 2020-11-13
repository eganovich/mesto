export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(cards, myId) {
    this._renderedItems = cards;
    this._renderedItems.forEach((item) => {
      this._renderer(item, myId);
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
