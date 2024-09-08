export default class Section {
  constructor({ items, renderer }, classSelector) {
    // Items - array of data
    this._items = items;
    // Renderer - creates and adds a single item to page
    this._renderer = renderer;
    // Where to add the elements
    this._container = document.querySelector(classSelector);
  }

  // Method to set items and render them
  setItems(items) {
    this._items = items || [];
    this.renderItems();
  }

  // Call once on page load to render all items
  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  // Add new items to the beginning of the container
  addItem(newItem) {
    this._container.prepend(newItem);
  }

  // Add new items to the end of the container
  appendItem(newItem) {
    this._container.append(newItem);
  }
}
