export default class Popup {
  constructor({ popupSelector }) {
    this._popupSelector = popupSelector;
    this._popupElement = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add("modal_opened");
    this._popupElement
      .querySelector(".modal__overlay")
      .classList.add("modal__overlay_active");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popupElement.classList.remove("modal_opened");
    this._popupElement
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
    const closeButton = this._popupElement.querySelector(
      ".modal__close-button"
    );
    closeButton.addEventListener("click", () => {
      this.close();
    });

    // handle close by overlay click
    this._popupElement.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("modal")) {
        this.close();
      }
    });
  }
}
