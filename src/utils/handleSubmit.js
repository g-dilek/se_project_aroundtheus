import Popup from "../components/Popup.js";

export function handleSubmit(
  submitAction,
  popupInstance, // This should be an instance of Popup or PopupDeleteCard
  submitText = "Save",
  loadingText = "Saving..."
) {
  // Check if popupInstance is an instance of Popup
  if (!(popupInstance instanceof Popup)) {
    console.error("The provided popupInstance is not an instance of Popup.");
    return Promise.reject("Invalid popup instance");
  }

  const popup = popupInstance._popupElement;
  const submitButton = popup.querySelector(".modal__save-button");

  if (!submitButton) {
    console.error("Submit button not found in popup.");
    return Promise.reject("Submit button not found");
  }

  submitButton.disabled = true;
  submitButton.textContent = loadingText;

  // Ensure submitAction returns a promise
  return Promise.resolve(submitAction())
    .then(() => {
      popupInstance.close();
      submitButton.disabled = false;
      submitButton.textContent = submitText;

      const form = popup.querySelector("form");
      if (form) form.reset();
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
      submitButton.disabled = false;
      submitButton.textContent = submitText;
      // Ensure errors are propagated
      throw err;
    });
}
