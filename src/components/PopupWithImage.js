import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._fullImage = this._popupElement.querySelector("#card-full-image");
    this._fullImageTitle = this._popupElement.querySelector("#card-caption");
  }

  open({ name, link }) {
    this._fullImage.src = link;
    this._fullImage.alt = name;
    this._fullImageTitle.textContent = name;
    super.open();
  }
}
