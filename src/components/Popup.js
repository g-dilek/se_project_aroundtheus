export default class Popup {
  constructor({ popupSelector }) {
    this._popupSelector = popupSelector;
    this.popupElement = document.querySelector(popupSelector);
    this._form = this.popupElement.querySelector("form");
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this.popupElement.classList.add("modal_opened");
    this.popupElement
      .querySelector(".modal__overlay")
      .classList.add("modal__overlay_active");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this.popupElement.classList.remove("modal_opened");
    this.popupElement
      .querySelector(".modal__overlay")
      .classList.remove("modal__overlay_active");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose = (evt) => {
    // handle esc button
    if (evt.key === "Escape") {
      this.close();
    }
  };

  setEventListeners() {
    // handle close by close button click
    const closeButton = this.popupElement.querySelector(".modal__close-button");
    closeButton.addEventListener("click", () => {
      this.close();
    });

    // handle close by overlay click
    this.popupElement.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("modal")) {
        this.close();
      }
    });
  }

  resetForm() {
    this._form.reset();
  }
}
