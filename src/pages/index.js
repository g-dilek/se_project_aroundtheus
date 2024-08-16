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

const profileEditButton = document.querySelector("#profile-edit-button");
const profileTitle = document.querySelector("#profile-title");
const profileSubtitle = document.querySelector("#profile-subtitle");

// Add new card
const addCardButton = document.querySelector("#add-card-button");
const cardListEl = document.querySelector(".cards__list");

// store form data to allow for saving of data
// despite opening and closing modal. only cleared
// when form submitted
let cardFormData = {
  title: "",
  image: "",
};

// ! FUNCTIONS

// allows saving of data when add card modal is closed
// and re-opened, but not submitted
function updateCardFormData(data) {
  cardFormData = { ...data };
}

function handleCardImageClick(name, link) {
  imagePreviewPopup.open(name, link);
}

// Function to create a new card element
function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleCardImageClick);
  return card.getCardElement();
}

// ! FORM VALIDATOR

// define an object for storing validators
const formValidators = {};

const enableValidation = (settings) => {
  // make an array of all forms and grab all their elements (see settings)
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  // iterate through each element
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    const formName = formElement.getAttribute("name");
    // assign validators to the passed-in formName and enable validation
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settings);

formValidators["profile-form"].resetValidation();
formValidators["card-form"].resetValidation();

// ! EVENT HANDLERS

// Profile edit handler
function handleProfileEditSubmit(profileData) {
  user.setUserInfo({
    title: profileData.title,
    subtitle: profileData.subtitle,
  });
  profileEditPopup.close();
}

// Add card handler
function handleAddCardSubmit(newCardData) {
  const name = newCardData.title;
  const alt = newCardData.title;
  const link = newCardData.image;
  section.addItem(createCard({ name, alt, link }));
  addCardPopup.close();
  formValidators["card-form"].disableButton();
}

// ! INSTANTIATE CLASSES

// Edit profile form
const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

// Add card form
const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardSubmit,
  // new handler to allow for saving of data on modal close
  updateCardFormData
);

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
  title: ".profile__title",
  subtitle: ".profile__subtitle",
});

// ! EVENT LISTENERS FOR POPUPS

profileEditPopup.setEventListeners();
addCardPopup.setEventListeners();
imagePreviewPopup.setEventListeners();

// ! EVENT LISTENERS FOR BUTTONS

profileEditButton.addEventListener("click", () => {
  const { title, subtitle } = user.getUserInfo();
  profileEditPopup.open({
    title: title,
    subtitle: subtitle,
  });
  formValidators["profile-form"].resetValidation();
});

addCardButton.addEventListener("click", () => {
  addCardPopup.open(cardFormData);
});
