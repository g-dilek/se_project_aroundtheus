export function handleSubmit(
  submitAction,
  popup,
  submitText = "Save",
  loadingText = "Saving...",
  resetForm = true
) {
  const submitButton = popup.querySelector(".popup__save-button");

  // Start with enabling the button and resetting its text
  submitButton.disabled = false;
  submitButton.textContent = submitText;

  // Disable and update button text
  submitButton.disabled = true;
  submitButton.textContent = loadingText;

  submitAction()
    .then(() => {
      // Close popup and reset button only on successful response
      popup.close();
      submitButton.disabled = false;
      submitButton.textContent = submitText;

      // Reset form if applicable and the flag is true
      if (resetForm) {
        const form = popup.querySelector("form");
        if (form) form.reset();
      }
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
      // If there's an error, keep the button enabled so the user can try again
      submitButton.disabled = false;
      submitButton.textContent = submitText;
    });
}
