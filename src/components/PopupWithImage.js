import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._imageElement = this._popupElement.querySelector(".modal__card-image"); // Updated class
    this._captionElement = this._popupElement.querySelector(".modal__caption"); // Updated class

    if (!this._imageElement) {
      console.error("Image element not found");
    }

    if (!this._captionElement) {
      console.error("Caption element not found");
    }
  }

  open(name, link) {
    if (name && link) {
      this._imageElement.src = link;
      this._imageElement.alt = name;
      this._captionElement.textContent = name;
      super.open(); // Call parent class's open method
    } else {
      console.error("Image name or link is missing");
    }
  }
}
