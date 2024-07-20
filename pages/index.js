import Card, { addCard } from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

const settings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__save-button",
  inactiveButtonClass: "modal__save-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

// ! ELEMENTS

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseButton = document.querySelector("#profile-close-button");
const profileTitle = document.querySelector("#profile-title");
const profileSubtitle = document.querySelector("#profile-subtitle");
const profileEditTitle = document.querySelector("#profile-edit-title");
const profileEditSubtitle = document.querySelector("#profile-edit-subtitle");
const profileEditForm = document.querySelector("#profile-edit-form");

const closeButtons = document.querySelectorAll(".modal__close-button");
const overlays = document.querySelectorAll(".modal__overlay");
const modals = document.querySelectorAll(".modal");

// Global Constants
export const addCardForm = document.querySelector("#add-card-form");
export const addCardModal = document.querySelector("#add-card-modal");
export const cardListEl = document.querySelector("#card-list");
export const editCardTitle = document.querySelector("#add-card-title");
export const editCardImage = document.querySelector("#add-card-image");

const modalSelectors = {
  profileEdit: "#profile-edit-modal",
  addCard: "#add-card-modal",
  cardImage: "#card-image-modal",
};

// listens for escape key when modal opened
const keydownListener = (evt) => {
  if (evt.key === "Escape" && findOpenedModal() != null) {
    const currentModal = findOpenedModal();
    if (currentModal) {
      closeModal(currentModal);
    }
  }
};

// ! FUNCTIONS

export function openModal(modal) {
  modal.classList.add("modal_opened");
  modal.classList.add("modal__overlay_active");
  // escape key event listener activates when modal is opened
  document.addEventListener("keydown", keydownListener);
}

export function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.classList.remove("modal__overlay_active");
  document.removeEventListener("keydown", keydownListener);
}

function findOpenedModal() {
  return document.querySelector(".modal_opened");
}

function fillProfileInputs() {
  // Trim removes any whitespace before text
  profileEditTitle.value = profileTitle.textContent.trim();
  profileEditSubtitle.value = profileSubtitle.textContent;

  // updates button state even though no new input entered
  profileEditTitle.dispatchEvent(new Event("input"));
  profileEditSubtitle.dispatchEvent(new Event("input"));
  // Automatically puts focus on title input when opened for easy editing
  profileEditTitle.focus();
  profileEditTitle.select();
}

// ! EVENT HANDLERS

// Prevents page from refreshing when 'save' is clicked
// Adds text entered in modal to profile
function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileEditTitle.value;
  profileSubtitle.textContent = profileEditSubtitle.value;
  closeModal(profileEditModal);
}

// ! EVENT LISTENERS

modals.forEach((modal) => {
  modal.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("modal")) {
      closeModal(modal);
    }
  });
});

// When edit button clicked, open profile modal
profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  fillProfileInputs();
});

// When add card button clicked, open modal

// When a modal close button clicked, check closest modal and run closeModal() on it
closeButtons.forEach((button) => {
  const closestModal = button.closest(".modal");
  button.addEventListener("click", () => {
    closeModal(closestModal);
  });
});

// When 'save' clicked, prevent page refreshing and
// add text entered to profile modal
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addCardForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const editCardTitle = document.querySelector("#add-card-title");
  const editCardImage = document.querySelector("#add-card-image");
  const newCardName = editCardTitle.value;
  const newCardLink = editCardImage.value;
  const cardListEl = document.querySelector("#card-list");
  const addCardModal = document.querySelector("#add-card-modal");

  if (newCardName && newCardLink) {
    // Basic validation
    const newCardData = { name: newCardName, link: newCardLink };

    // Create a new Card instance
    const card = new Card(newCardData, "#card-template");

    // Add new card to the card list DOM
    cardListEl.prepend(card.getCardElement());

    // Close modal and reset input values
    closeModal(addCardModal);
    editCardTitle.value = "";
    editCardImage.value = "";
  }
});

// ! CARDS

// Loop through initialCards array and create cards
initialCards.forEach((cardData) => {
  // Select the card template from HTML
  const cardTemplate = document.querySelector("#card-template");
  // Select the card list container where new cards will be appended
  const cardListEl = document.querySelector("#card-list");
  // Instantiate a new Card object
  const card = new Card(cardData);

  // Get the HTML representation of the card element
  const cardElement = card.getCardElement();
  // Append the card element to the card list
  cardListEl.appendChild(cardElement);
});

// Add card
initialCards.forEach((cardData) => {
  addCard(cardData);
});

// ! FORM VALIDATOR

const editFormValidator = new FormValidator(settings, profileEditForm);
const addCardFormValidator = new FormValidator(settings, addCardForm);

editFormValidator.enableValidation();
addCardFormValidator.enableValidation();
