const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  // need to make these classes
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

function showInputError() {}

function checkInputValidity() {}

// listen for event of typing in input boxes
function setEventListeners(formEl, config) {
  const errorMessage = document.querySelectorAll(".modal__error");
  // make new variable that is the inputSelector property
  // of object config
  // same as const inputSelector = config.inputSelector
  const { inputSelector } = config;
  // shorthand for modal form inputs
  // makes 1 group of inputs listed per modal (name, desc, etc)
  const inputEls = Array.from(formEl.querySelectorAll(inputSelector));
  inputEls.forEach((inputEl) => {
    // listens for new text in input boxes
    // "change" occurs when user clicks out of textbox (more common)
    inputEl.addEventListener("input", (evt) => {
      // use browser's API to check event of inputting text
      // evt.target === inputEl
      // console.dir lets us view all properties, including validity->valid boolean
      // this is the automatic message from HTML that gives validity check and message:
      if (inputEl.validity.valid) {
        inputEl.classList.remove("modal__input_type_error");
        errorMessage.forEach((element) => {
          element.classList.remove("modal__error_visible");
        });
      } else {
        inputEl.classList.add("modal__input_type_error");
        errorMessage.forEach((element) => {
          element.classList.add("modal__error_visible");
        });
      }
    });
  });
}

function enableValidation(config) {
  const { formSelector } = config;
  // grabs all HTML 'form' tags
  // NodeList: [form#profile-edit-form.modal__form, form#profile-add-card-form.modal__form]
  // NodeList: not an array, a list of node items
  // Certain methods don't work on NodeLists
  const formEls = Array.from(document.querySelectorAll(formSelector));
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
