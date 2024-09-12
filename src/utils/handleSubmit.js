import Popup from "../components/Popup.js";

export function handleSubmit(
  submitAction,
  popupInstance,
  submitText = "Save",
  loadingText = "Saving..."
) {
  // Check if popupInstance is an instance of Popup
  if (!(popupInstance instanceof Popup)) {
    console.error("The provided popupInstance is not an instance of Popup.");
    return Promise.reject("Invalid popup instance");
  }

  const popup = popupInstance.popupElement;
  const submitButton = popupInstance.submitButton;

  if (!submitButton) {
    console.error("Submit button not found in popup.");
    return Promise.reject("Submit button not found");
  }

  submitButton.disabled = true;
  popupInstance.renderLoading(true, loadingText);

  // Ensure submitAction returns a promise
  return Promise.resolve(submitAction())
    .then(() => {
      popupInstance.close();
      popupInstance.resetForm(); //
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
      // Ensure errors are propagated
      throw err;
    })
    .finally(() => {
      popupInstance.renderLoading(false, submitText);
    });
}
