import Popup from "./Popup.js";

export default class PopupDeleteCard extends Popup {
  constructor({ popupSelector }, onConfirmDeleteAction) {
    super({ popupSelector });
    this._onConfirmDeleteAction = onConfirmDeleteAction;
    this.submitButton = this.popupElement.querySelector(".modal__save-button");
    this.submitButtonText = this.submitButton.textContent;
  }

  setDeleteConfirmCallback(callback) {
    this._onConfirmDeleteAction = callback;
  }

  _confirmDelete = () => {
    if (typeof this._onConfirmDeleteAction === "function") {
      // Return the promise from the callback
      return this._onConfirmDeleteAction();
    }
    // Return a resolved promise if no callback is set
    return Promise.resolve();
  };

  setEventListeners() {
    super.setEventListeners();
    document
      .getElementById("confirm-delete-yes-button")
      .addEventListener("click", (evt) => {
        evt.preventDefault();
        console.log(12312313);
        this.renderLoading(true);

        const confirmDeletePromise = this._confirmDelete();

        if (!(confirmDeletePromise instanceof Promise)) {
          console.error("The _confirmDelete method did not return a promise.");
          this.renderLoading(false);
          return;
        }

        confirmDeletePromise
          .then(() => {
            this.close();
            this.renderLoading(false);
          })
          .catch((err) => {
            console.error(`Error during deletion: ${err}`);
            this.renderLoading(false);
          });
      });
  }

  renderLoading(isLoading, loadingText = "Deleting...") {
    if (isLoading) {
      this.submitButton.textContent = loadingText;
    } else {
      this.submitButton.textContent = this.submitButtonText;
    }
  }
}
