import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor(popupSelector, handleDeleteConfirm) {
    super(popupSelector);
    this._handleDeleteConfirm = handleDeleteConfirm;
    this._submitButton = this._popupElement.querySelector(
      ".modal__save-button"
    );
    this._submitButtonText = this._submitButton.textContent;
  }

  setDeleteConfirmCallback(callback) {
    this._handleDeleteConfirm = callback;
  }

  _handleConfirmDelete() {
    if (typeof this._handleDeleteConfirm === "function") {
      return this._handleDeleteConfirm();
    }
    return Promise.resolve();
  }

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._handleConfirmDelete()
        .then(() => this.close())
        .catch((err) => console.error(`Error during deletion: ${err}`))
        .finally(() => this.renderLoading(false));
    });
  }

  renderLoading(isLoading, loadingText = "Deleting...") {
    this._submitButton.textContent = isLoading
      ? loadingText
      : this._submitButtonText;
  }
}
