export default class Section {
  constructor({ items, renderer }, classSelector) {
    // items - array of data
    this._items = items;
    // renderer - creates and adds a single item to page
    this._renderer = renderer;
    // where to add the elements
    this._container = document.querySelector(classSelector);
  }

  // call once on page load
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  // when adding new individual cards
  addItem(newItem) {
    this._container.prepend(newItem);
  }
}
