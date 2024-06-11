const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  // need to make these classes
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

function setEventListeners(formEl, config) {
  // shorthand for modal form inputs
  const inputEls = Array.from(formEl.querySelectorAll(config.inputSelector));
}

function enableValidation(config) {
  // grabs all HTML 'form' tags
  // NodeList: [form#profile-edit-form.modal__form, form#profile-add-card-form.modal__form]
  // NodeList: not an array, a list of node items
  // Certain methods don't work on NodeLists
  const formEls = Array.from(document.querySelectorAll(config.formSelector));
  console.log(
    // iterate through both types of modal i have
    formEls.forEach((formEl) => {
      // add an event listener to each
      formEl.addEventListener("submit", (evt) => {
        evt.preventDefault();
      });

      setEventListeners(formEl, config);
      // look for all inputs inside of form tags
      // loop through all inputs, check validity

      // if any invalid, grab validation message
      // and add the error class to input
      // display error message
      // disable submit button (or keep disabled)

      // if all valid
      // enable button
      // (remove) reset error messages
    })
  );
}

// Call function w/ one parameter - object config
enableValidation(config);
