export default class Section {
    constructor({/*  cards,  */renderer }, containerSelector) {
       // this._renderedItems = cards;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(cards) {
        this._renderedItems = cards;
        this._renderedItems.forEach(item => {
          this._renderer(item);
        });
    }

    addItem(item) {
       this._container.prepend(item);
    }

 
    deleteCard(item){
        this._container.remove(item);
       // item = null;
    } 
}

