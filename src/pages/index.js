// JS imports
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Popup from "../components/Popup.js";
import Api from "../components/Api.js";

// other imports
import "../pages/index.css";
import { initialCards, settings } from "../utils/constants.js";

// ! API

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "d61b98fc-c3a9-4c62-af93-44f6069de42c",
    "Content-Type": "application/json",
  },
});

const section = new Section(
  {
    // to populate with API data
    items: [],
    renderer: (cardData) => {
      const card = createCard(cardData);
      section.addItem(card);
    },
  },
  "#card-list"
);

// Fetch and render initial cards
api
  .getInitialCards()
  .then((cards) => {
    console.log("Fetched cards:", cards);
    section.setItems(cards);
    section.renderItems();
  })
  .catch((err) => console.error("Error fetching initial cards:", err));

// ! ELEMENTS

// Edit profile

const profileEditButton = document.querySelector("#profile-edit-button");
const profileTitle = document.querySelector("#profile-title");
const profileSubtitle = document.querySelector("#profile-subtitle");

// Add new card
const addCardButton = document.querySelector("#add-card-button");
const cardListEl = document.querySelector(".cards__list");

// New profile Image
const profileImageButton = document.querySelector(".profile__image");
const profileImage = document.querySelector(".profile__image");

// Confirm card delete
const deleteIcon = document.querySelectorAll("#card-delete-button");
let cardToDelete = null;

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

// Function to create a new card element
function createCard(cardData) {
  const card = new Card(
    cardData,
    "#card-template",
    handleCardImageClick,
    handleDeleteClick
  );
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
// formValidators["profile-image-form"].resetValidation();

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
  api
    .createCard(newCardData)
    .then((cardData) => {
      const card = createCard(cardData);
      section.addItem(card);
      addCardPopup.close();
      formValidators["card-form"].disableButton();
    })
    .catch((err) => console.error("Error creating card:", err));
}

// New profile image handler
function handleProfileImageSubmit(newImageData) {
  const newImageUrl = newImageData.image;
  profileImage.src = newImageUrl;
  profileImagePopup.close();
}

// Confirm card deletion handler
function handleDeleteClick(card) {
  cardToDelete = card;
  confirmDeletePopup.open();
}

function handleConfirmDelete() {
  if (cardToDelete) {
    api
      .deleteCard(cardToDelete.getId())
      .then(() => {
        cardToDelete.deleteCard();
        cardToDelete = null;
        confirmDeletePopup.close();
      })
      .catch((err) => console.error("Error deleting card:", err));
  }
}

// Full card image handler
function handleCardImageClick(name, link) {
  imagePreviewPopup.open(name, link);
}

// ! INSTANTIATE CLASSES

// Confirm card delete form
const confirmDeletePopup = new Popup(
  "#confirm-delete-modal",
  handleConfirmDelete
);

// New profile image form
const profileImagePopup = new PopupWithForm(
  "#profile-image-modal",
  handleProfileImageSubmit
);

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

// User Info
const user = new UserInfo({
  title: ".profile__title",
  subtitle: ".profile__subtitle",
});

// ! EVENT LISTENERS FOR POPUPS

profileEditPopup.setEventListeners();
addCardPopup.setEventListeners();
imagePreviewPopup.setEventListeners();
profileImagePopup.setEventListeners();

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

profileImageButton.addEventListener("click", () => {
  profileImagePopup.open();
});

// deleteIcon.addEventListener("click", confirmDeletePopup.open());
