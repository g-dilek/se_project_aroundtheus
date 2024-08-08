import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popup = document.querySelector(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector("form");
    this._inputs = Array.from(this._form.querySelectorAll("input"));
  }

  // ID 'profile-edit-modal'
  // ID 'add-card-modal'

  // have profile edit form initially display profile title and subtitle
  setInputValues(data) {
    this._inputs.forEach((input) => {
      // put in the extsting info or nothing
      input.value = data[input.name];
    });
  }

  // Open the popup and set initial values
  open(data = {}) {
    this.setInputValues(data);
    super.open();
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

  // clear out form when closed
  close() {
    super.close();
    this._form.reset();
  }

  setEventListners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
      this.close();
    });
  }
}
