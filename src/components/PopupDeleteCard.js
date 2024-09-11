import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor({ popupSelector }, handleDeleteConfirm) {
    super({ popupSelector });
    this._handleDeleteConfirm = handleDeleteConfirm;
    this._submitButton = this.popupElement.querySelector(".modal__save-button");
    this._submitButtonText = this._submitButton.textContent;
  }

  setDeleteConfirmCallback(callback) {
    this._handleDeleteConfirm = callback;
  }

  _handleConfirmDelete = () => {
    if (typeof this._handleDeleteConfirm === "function") {
      // Return the promise from the callback
      return this._handleDeleteConfirm();
    }
    // Return a resolved promise if no callback is set
    return Promise.resolve();
  };

  setEventListeners() {
    super.setEventListeners();
    this._submitButton.addEventListener("click", (evt) => {
      evt.preventDefault();
      this.renderLoading(true);

      // Ensure _handleConfirmDelete is defined and returns a promise
      const confirmDeletePromise = this._handleConfirmDelete();

      if (!(confirmDeletePromise instanceof Promise)) {
        console.error(
          "The _handleConfirmDelete method did not return a promise."
        );
        this.renderLoading(false);
        return;
      }

      confirmDeletePromise
        .then(() => this.close())
        .catch((err) => console.error(`Error during deletion: ${err}`))
        .finally(() => this.renderLoading(false));
    });
  }

  renderLoading(isLoading, loadingText = "Deleting...") {
    if (isLoading) {
      this._submitButton.textContent = loadingText;
    } else {
      this._submitButton.textContent = this._submitButtonText;
    }
  }
}
