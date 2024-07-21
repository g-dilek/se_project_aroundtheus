import Card from "../components/Card.js";
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

// Edit profile
const profileEditButton = document.querySelector("#profile-edit-button");
const profileCloseButton = document.querySelector("#profile-close-button");
const profileTitle = document.querySelector("#profile-title");
const profileSubtitle = document.querySelector("#profile-subtitle");
const profileEditTitle = document.querySelector("#profile-edit-title");
const profileEditSubtitle = document.querySelector("#profile-edit-subtitle");

// Add new card
const addCardButton = document.querySelector("#add-card-button");
const editCardTitle = document.querySelector("#add-card-title");
const editCardImage = document.querySelector("#add-card-image");
const newCardName = editCardTitle.value;
const newCardLink = editCardImage.value;
const cardListEl = document.querySelector("#card-list");

// Forms
const profileEditForm = document.forms["profile-edit-form"];
const addCardForm = document.forms["add-card-form"];

// Modals
const addCardModal = document.querySelector("#add-card-modal");
const cardImageModal = document.querySelector("#card-image-modal");
const profileEditModal = document.querySelector("#profile-edit-modal");
const closeButtons = document.querySelectorAll(".modal__close-button");
const overlays = document.querySelectorAll(".modal__overlay");
const modals = document.querySelectorAll(".modal");

// Card - Image preview
const cardFullImage = document.querySelector("#card-full-image");
const cardCaption = document.querySelector("#card-caption");

const modalSelectors = {
  profileEdit: "#profile-edit-modal",
  addCard: "#add-card-modal",
  cardImage: "#card-image-modal",
};

// ! FUNCTIONS

function openModal(modal) {
  modal.classList.add("modal_opened");
  modal.classList.add("modal__overlay_active");
  // escape key event listener activates when modal is opened
  document.addEventListener("keydown", keydownListener);
}

function closeModal(modal) {
  modal.classList.remove("modal_opened");
  modal.classList.remove("modal__overlay_active");
  document.removeEventListener("keydown", keydownListener);
}

// listens for escape key when modal opened
const keydownListener = (evt) => {
  if (evt.key === "Escape") {
    const currentModal = findOpenedModal();
    if (currentModal) {
      closeModal(currentModal);
    }
  }
};

function focusCardFormInput() {
  // Automatically puts focus on card title input when opened for easy editing
  editCardTitle.focus();
  editCardTitle.select();
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

// Function to create a new card element
function createCard(item) {
  const card = new Card(item, "#card-template", handleCardImageClick);
  return card.getCardElement();
}

// Function to add a new card to the DOM
function addCard(item) {
  const cardElement = createCard(item);
  cardListEl.prepend(cardElement);
}

// ! DISPLAY INITIAL CARDS

// Add initial cards
initialCards.forEach((cardData) => {
  const cardElement = createCard(cardData);
  cardListEl.appendChild(cardElement);
});

// ! EVENT HANDLERS

// Prevents page from refreshing when 'save' is clicked
// Adds text entered in modal to profile
function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileEditTitle.value;
  profileSubtitle.textContent = profileEditSubtitle.value;
  closeModal(profileEditModal);
}

// When add card submitted: prevents refresh, closes add card modal,
// adds new card, resets title and image values only after submit
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const newCardData = {
    name: editCardTitle.value,
    link: editCardImage.value,
  };
  addCard(newCardData);
  closeModal(addCardModal);
  editCardTitle.value = "";
  editCardImage.value = "";
}

// Handle image click
function handleCardImageClick(cardData) {
  openModal(cardImageModal);
  cardFullImage.src = cardData.link;
  cardFullImage.alt = cardData.name;
  cardCaption.textContent = cardData.name;
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

addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
  focusCardFormInput();
});

addCardForm.addEventListener("submit", handleAddCardSubmit);

// ! FORM VALIDATOR

// This object stores validators
const formValidators = {};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    // Get form id from index.html
    const formId = formElement.getAttribute("id");
    formValidators[formId] = validator;
    validator.enableValidation();
  });
};

enableValidation(settings);

// Now we can select the form to validate using its id from index.html
formValidators["add-card-form"].resetValidation();
