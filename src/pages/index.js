// JS imports
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";

// other imports
import "../pages/index.css";

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
const cardListEl = document.querySelector("#card-list");

// // ! DISPLAY INITIAL CARDS

// // Add initial cards
// initialCards.forEach((cardData) => {
//   const cardElement = createCard(cardData);
//   cardListEl.appendChild(cardElement);
// });

// ! FUNCTIONS

function focusCardFormInput() {
  // Automatically puts focus on card title input when opened for easy editing
  editCardTitle.focus();
  editCardTitle.select();
}

function handleCardImageClick(name, link) {
  imagePreviewPopup.open(name, link);
}

// Function to create a new card element
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardImageClick);
  return card.getCardElement();
}

// ! EVENT HANDLERS

// Profile edit handler
function handleProfileEditSubmit(profileData) {
  const title = profileData.title;
  const subtitle = profileData.subtitle;
  user.setUserInfo({ title, subtitle });
  profileEditPopup.close();
}

// Add card handler
function handleAddCardSubmit(newCardData, cardListEl) {
  const name = newCardData.name;
  const alt = newCardData.name;
  const link = newCardData.link;
  section.addItem(createCard({ name, alt, link }));
  addCardPopup.close();
  FormValidator.resetValidation;
}

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

// ! INSTANTIATE CLASSES

// Edit profile form
const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

// Add card form
const addCardPopup = new PopupWithForm("#add-card-modal", handleAddCardSubmit);

// Full image popup
const imagePreviewPopup = new PopupWithImage("#card-image-modal");

//Section
const section = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      section.addItem(createCard(item));
    },
  },
  "#card-list"
);
section.renderItems();

// User Info
const user = new UserInfo({
  name: ".profile__title",
  description: ".profile__subtitle",
});

// Set event listeners for popups
profileEditPopup.setEventListeners();
addCardPopup.setEventListeners();
imagePreviewPopup.setEventListeners();

// Event listeners for buttons
profileEditButton.addEventListener("click", () => {
  const currentTitle = profileTitle.textContent.trim();
  const currentSubtitle = profileSubtitle.textContent;
  profileEditPopup.open({ title: currentTitle, subtitle: currentSubtitle });
});

addCardButton.addEventListener("click", () => {
  addCardPopup.open({ title: "", image: "" });
  focusCardFormInput();
});
