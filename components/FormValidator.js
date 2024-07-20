// classes are functions that return an object
// really just an object.. class is syntactical sugar and allows for constructor
export default class FormValidator {
  // what is called when you make a new obj of this class
  constructor(settings, formEl) {
    // stores selectors and form classes
    this._formSelector = settings.formSelector;
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._errorClass = settings.errorClass;
    // for validation
    this._form = formEl;
    this._errorMessageEl = this._form.querySelector(`#${inputEl.id}-error`);
  }

    enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

  _hasInvalidInput() {
    return this._inputEls.some((inputEl) => !inputEl.validity.valid);
  }

  _toggleButtonState() {
    if (this._hasInvalidInput()) {
      this.disableButton();
    } else {
      this.enableButton();
    }
  }

  disableButton() {
    this._submitButton.setAttribute("disabled", true);
    this._submitButton.classList.add(this._inactiveButtonClass);
  }

  enableButton() {
    this._submitButton.removeAttribute("disabled");
    this._submitButton.classList.remove(this._inactiveButtonClass);
  }

  // still need inputelement parameter because it depends
  _showInputError(inputElement, errorMessageEl) {}

  _setEventListeners() {
    this._inputEls = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._submitButton = this._form.querySelector(this._submitButtonSelector);
    toggleButtonState(inputEls, submitButton, settings);
    this._inputEls.forEach((inputEl) => {
      // listens for new text in input boxes
      // "change" occurs when user clicks out of textbox (more common)
      this._inputEl.addEventListener("input", () => {
        checkInputValidity(this._form, inputEl, submitButton, settings);
        toggleButtonState(inputEls, submitButton, settings);
      });
    });
  }


  }

  // test() {
  //   const { formSelector } = settings;
  //   // grabs all HTML 'form' tags
  //   // NodeList: [form#profile-edit-form.modal__form, form#profile-add-card-form.modal__form]
  //   // NodeList: not an array, a list of node items
  //   // Certain methods don't work on NodeLists
  //   const formEls = Array.from(document.querySelectorAll(formSelector));
  //   // console.log(
  //   // iterate through both types of modal i have
  //   formEls.forEach((formEl) => {
  //     // add an event listener to each, prevent default
  //     formEl.addEventListener("submit", (evt) => {
  //       evt.preventDefault();
  //     });

  //     setEventListeners(formEl, settings);
  //   });
  // }

  _checkInputValidity() {}

  _submitButtonToggle() {}

  // all needed handlers

  enableValidation() {}

  // disable state of button or reset form validation
  resetValidation() {}
}

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// for index.js

// const editFormValidator = new FormValidator(settings, editForm);
// const addFormValidator = new FormValidator(settings, addForm);

// editFormValidator.enableValidation();
// addFormValidator.enableValidation();

// divider

// const settings = {
//   formSelector: ".modal__form",
//   inputSelector: ".modal__input",
//   submitButtonSelector: ".modal__save-button",
//   inactiveButtonClass: "modal__save-button_disabled",
//   inputErrorClass: "modal__input_type_error",
//   errorClass: "modal__error_visible",
// };

function showInputError(inputEl, errorMessageEl) {
  inputEl.classList.add(this._inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(this._errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  inputEl.classList.remove(this._inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(this._errorClass);
}

function toggleButtonState(inputEls, submitButton, settings) {
  const { inactiveButtonClass } = settings;
  if (hasInvalidInput(inputEls)) {
    disableButton(submitButton, inactiveButtonClass);
  } else {
    enableButton(submitButton, inactiveButtonClass);
  }
}

function hasInvalidInput(inputList) {
  return !inputList.every((inputEl) => inputEl.validity.valid);
}

// i should consider making these one boolean setButtonState function

function disableButton(submitButton, inactiveButtonClass) {
  submitButton.classList.add(inactiveButtonClass);
  submitButton.disabled = true;
}

function enableButton(submitButton, inactiveButtonClass) {
  submitButton.classList.remove(inactiveButtonClass);
  submitButton.disabled = false;
}

// listen for event of typing in input boxes
function setEventListeners(formEl, settings) {
  // make new variable that is the inputSelector property
  // of object settings
  // same as const inputSelector = settings.inputSelector
  const { inputSelector, submitButtonSelector } = settings;
  // shorthand for modal form inputs
  // makes 1 group of inputs listed per modal (name, desc, etc)
  const inputEls = Array.from(formEl.querySelectorAll(inputSelector));
  const submitButton = formEl.querySelector(submitButtonSelector);
  toggleButtonState(inputEls, submitButton, settings);
  inputEls.forEach((inputEl) => {
    // listens for new text in input boxes
    // "change" occurs when user clicks out of textbox (more common)
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, submitButton, settings);
      toggleButtonState(inputEls, submitButton, settings);
    });
  });
}

function checkInputValidity(formEl, inputEl, submitButton, settings) {
  const { inactiveButtonClass } = settings;
  // use browser's API to check event of inputting text
  // evt.target === inputEl
  // console.dir lets us view all properties, including validity->valid boolean
  // this is the automatic message from HTML that gives validity check and message:
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, settings);
  } else {
    hideInputError(formEl, inputEl, settings);
  }
}

// parameter name in function can be anything
// it's set to 'settings' for readability
// what is passed when called becomes the parameter, so choose names wi
function enableValidation(settings) {
  const { formSelector } = settings;
  // grabs all HTML 'form' tags
  // NodeList: [form#profile-edit-form.modal__form, form#profile-add-card-form.modal__form]
  // NodeList: not an array, a list of node items
  // Certain methods don't work on NodeLists
  const formEls = Array.from(document.querySelectorAll(formSelector));
  // console.log(
  // iterate through both types of modal i have
  formEls.forEach((formEl) => {
    // add an event listener to each, prevent default
    formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formEl, settings);
  });
}

// Call function as soon as page loads w/ one parameter - object settings
document.addEventListener("DOMContentLoaded", function () {
  enableValidation(settings);
});

// const formValidator = new FormValidator();
