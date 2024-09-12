import Popup from "./Popup.js";
import { createCard } from "../utils/createCard.js";
import { handleSubmit } from "../utils/handleSubmit.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleSubmit, formValidator) {
    super({ popupSelector });
    this._handleSubmit = handleSubmit;
    this._form = this.popupElement.querySelector("form");
    this.submitButton = this._form.querySelector("button[type='submit']");
    this.submitButtonText = this.submitButton.textContent;
    this._formValidator = formValidator;
    this._inputs = Array.from(this._form.querySelectorAll("input"));
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.renderLoading(true);

      const submitPromise = this._handleSubmit(this._getInputValues());

      if (!(submitPromise instanceof Promise)) {
        console.error("The handleSubmit method did not return a promise.");
        this.renderLoading(false);
        return;
      }

      submitPromise
        .then(() => this.close())
        .catch((err) => console.error(`Error during form submission: ${err}`))
        .finally(() => this.renderLoading(false));
    });
  }

  open(formData = {}) {
    super.open();
    this._populateForm(formData);
    this._focusFirstInput();
    this._formValidator.resetValidation();
  }

  _focusFirstInput() {
    const firstInput = this._inputs[0];
    if (firstInput) {
      firstInput.focus();
    }
  }

  _populateForm(formData) {
    Object.entries(formData).forEach(([name, value]) => {
      const input = this._form.querySelector(`input[name="${name}"]`);
      if (input) {
        input.value = value;
      }
    });
  }

  _getInputValues() {
    const inputValues = {};

    this._inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  renderLoading(isLoading, loadingText = "Saving...") {
    if (isLoading) {
      this.submitButton.textContent = loadingText;
    } else {
      this.submitButton.textContent = this.submitButtonText;
    }
  }
}
