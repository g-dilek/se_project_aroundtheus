// JS imports
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";

// other imports
import "../pages/index.css";
import { initialCards, settings } from "../utils/constants.js";

// ! ELEMENTS

// Edit profile
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const profileEditButton = document.querySelector("#profile-edit-button");
const profileTitle = document.querySelector("#profile-title");
const profileSubtitle = document.querySelector("#profile-subtitle");

// Add new card
const addCardModal = document.querySelector("#add-card-modal");
const addCardForm = addCardModal.querySelector(".modal__form");
const addCardButton = document.querySelector("#add-card-button");
const editCardTitle = document.querySelector("#add-card-title");

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
function handleAddCardSubmit(newCardData) {
  const name = newCardData.name;
  const alt = newCardData.name;
  const link = newCardData.link;
  section.addItem(createCard({ name, alt, link }));
  addCardPopup.close();
  FormValidator.resetValidation;
}

// ! FORM VALIDATOR

const addCardFormValidator = new FormValidator(settings, addCardForm);
addCardFormValidator.enableValidation();
const profileEditFormValidator = new FormValidator(settings, profileEditForm);
profileEditFormValidator.enableValidation();

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
