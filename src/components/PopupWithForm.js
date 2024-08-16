import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit, handleFormClose = () => {}) {
    super({ popupSelector });
    this._popup = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector("form");
    this._inputs = Array.from(this._form.querySelectorAll("input"));
    this._formData = {};
    this._handleFormClose = handleFormClose;
  }

  _focusFirstInputField() {
    const firstInput = this._inputs[0];
    if (firstInput) {
      firstInput.focus();
      firstInput.select();
    }
  }

  // have profile edit form initially display profile title and subtitle
  setInputValues(data) {
    this._inputs.forEach((input) => {
      // put in the existing info or nothing
      input.value = data[input.name] || "";
    });
  }

  // Open the popup and set initial values
  open(data) {
    this.setInputValues(data);
    super.open();
    this._focusFirstInputField();
  }

  _getInputValues() {
    const formValues = {};
    // loop through every type of input field user can do
    this._inputs.forEach((input) => {
      // for each individual input field, use its name as a key in the
      // inputValues object. then assign the user input to that key's value
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  close() {
    const formValues = this._getInputValues();
    this._formData = formValues;
    if (this._handleFormClose) {
      this._handleFormClose(formValues);
    }
    super.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this._formData = {};
      this._form.reset();
      this.close();
    });
  }
}
