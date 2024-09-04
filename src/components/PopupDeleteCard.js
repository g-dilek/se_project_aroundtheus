import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor({ popupSelector, handleDeleteConfirm }) {
    super({ popupSelector });
    this._handleDeleteConfirm = handleDeleteConfirm;
    this._submitButton = this._popupElement.querySelector(
      ".modal__save-button"
    );
    this._submitButtonText = this._submitButton.textContent;
  }

  setDeleteConfirmCallback(callback) {
    this._handleDeleteConfirm = callback;
  }

  _handleConfirmDelete = () => {
    if (typeof this._handleDeleteConfirm === "function") {
      this._handleDeleteConfirm(); // Call the deletion callback
    }
  };

  setEventListeners() {
    super.setEventListeners(); // Call parent class method
    this._submitButton.addEventListener("click", (evt) => {
      evt.preventDefault(); // Prevent default form submission behavior
      this._handleConfirmDelete();
      this.close(); // Close the popup after confirmation
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
