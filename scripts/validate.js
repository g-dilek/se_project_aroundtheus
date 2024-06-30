const modalInputSelectors = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  inputEl.classList.remove(inputErrorClass);
  errorMessageEl.textContent = "";
  errorMessageEl.classList.remove(errorClass);
}

function toggleButtonState(inputEls, submitButton, modalInputSelectors) {
  const { inactiveButtonClass } = modalInputSelectors;
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
function setEventListeners(formEl, modalInputSelectors) {
  // make new variable that is the inputSelector property
  // of object modalInputSelectors
  // same as const inputSelector = modalInputSelectors.inputSelector
  const { inputSelector } = modalInputSelectors;
  const { submitButtonSelector } = modalInputSelectors;
  // shorthand for modal form inputs
  // makes 1 group of inputs listed per modal (name, desc, etc)
  const inputEls = Array.from(formEl.querySelectorAll(inputSelector));
  const submitButton = formEl.querySelector(submitButtonSelector);
  toggleButtonState(inputEls, submitButton, modalInputSelectors);
  inputEls.forEach((inputEl) => {
    // listens for new text in input boxes
    // "change" occurs when user clicks out of textbox (more common)
    inputEl.addEventListener("input", () => {
      checkInputValidity(formEl, inputEl, submitButton, modalInputSelectors);
      toggleButtonState(inputEls, submitButton, modalInputSelectors);
    });
  });
}

function checkInputValidity(
  formEl,
  inputEl,
  submitButton,
  modalInputSelectors
) {
  const { inactiveButtonClass } = modalInputSelectors;
  // use browser's API to check event of inputting text
  // evt.target === inputEl
  // console.dir lets us view all properties, including validity->valid boolean
  // this is the automatic message from HTML that gives validity check and message:
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, modalInputSelectors);
  } else {
    hideInputError(formEl, inputEl, modalInputSelectors);
  }
}

// parameter name in function can be anything
// it's set to 'modalInputSelectors' for readability
// what is passed when called becomes the parameter, so choose names wi
function enableValidation(modalInputSelectors) {
  const { formSelector } = modalInputSelectors;
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

    setEventListeners(formEl, modalInputSelectors);

    const { inputSelector } = modalInputSelectors;
    const { submitButtonSelector } = modalInputSelectors;

    const inputEls = Array.from(formEl.querySelectorAll(inputSelector));
    const submitButton = formEl.querySelector(submitButtonSelector);

    // look for all inputs inside of form tags
    // loop through all inputs, check validity

    // if any invalid, grab validation message
    // and add the error class to input
    // display error message
    // disable submit button (or keep disabled)

    // if all valid
    // enable button to allow clicking
    // (remove) reset error messages
  });
}

// Call function as soon as page loads w/ one parameter - object modalInputSelectors
document.addEventListener("DOMContentLoaded", function () {
  enableValidation(modalInputSelectors);
});
