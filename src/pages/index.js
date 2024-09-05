// JS imports
import { settings } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Popup from "../components/Popup.js";
import Api from "../components/Api.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";

// other imports
import "../pages/index.css";

// ! ELEMENTS

// Edit profile
const profileEditButton = document.querySelector("#profile-edit-button");
const profileTitle = document.querySelector("#profile-title");
const profileSubtitle = document.querySelector("#profile-subtitle");

// Add new card
const addCardModal = document.querySelector("#add-card-modal");
const addCardButton = document.querySelector("#add-card-button");
const cardListEl = document.querySelector("#card-list");
const addCardForm = addCardModal.querySelector(".modal__form");

// New profile Image
const profileImageButton = document.querySelector(
  ".profile__avatar-edit-button"
);
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

// ! INSTANTIATE CLASSES

// Confirm card delete form
const deleteCardPopup = new PopupDeleteCard({
  popupSelector: "#confirm-delete-modal",
});

deleteCardPopup.setDeleteConfirmCallback(handleConfirmDelete);

// New profile image form / Avatar
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

// API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "298fcaaa-e173-4e81-9326-ea95e21a4625",
    "Content-Type": "application/json",
  },
});

// User Info
const user = new UserInfo({
  title: ".profile__title",
  subtitle: ".profile__subtitle",
  avatar: ".profile__image",
});

// Creates card section
const cardSection = new Section(
  {
    items: [],
    renderer: (item) => {
      const card = createCard(item);
      cardSection.addItem(card.getCardElement());
    },
  },
  "#card-list"
);

// Fetches initial cards from server
api
  .getInitialCards()
  .then((cards) => {
    cardSection.setItems(cards);
  })
  .catch((err) => console.error("Error fetching initial cards:", err));

// Fetch and render user info
api
  .getUserInfo()
  .then((userInfo) => {
    user.setUserInfo({
      name: userInfo.name,
      about: userInfo.about,
    });
    user.setUserAvatar({
      avatar: userInfo.avatar,
    });
  })
  .catch((err) => console.error("Error fetching user info:", err));

// ! FUNCTIONS

// allows saving of data when add card modal is closed
// and re-opened, but not submitted
function updateCardFormData(data) {
  cardFormData = { ...data };
}

// Function to create a new card element
function createCard(cardData) {
  return new Card(
    {
      title: cardData.name,
      image: cardData.link,
      _id: cardData._id,
    },
    "#card-template",
    handleCardImageClick,
    handleDeleteCard,
    handleLikeCard
  );
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

// ! FUNCTIONS / EVENT HANDLERS

// Profile edit handler
function handleProfileEditSubmit(profileData) {
  profileEditPopup.renderLoading(true);
  api
    .updateProfileInfo({
      name: profileData.title,
      description: profileData.subtitle,
    })
    .then((updatedData) => {
      user.setUserInfo(updatedData);
      profileEditPopup.close();
    })
    .catch((err) => console.error(`Failed to update profile: ${err}`))
    .finally(() => {
      profileEditPopup.renderLoading(false);
    });
}

// Add card handler
function handleAddCardSubmit(inputValues) {
  addCardPopup.renderLoading(true);
  api
    .addCard({ name: inputValues.title, link: inputValues.image })
    .then((newCardData) => {
      const newCard = createCard(newCardData);
      cardSection.addItem(newCard.getCardElement());
      addCardPopup.close();
      formValidators["card-form"].resetValidation();
    })
    .catch((err) => console.error("Error adding card:", err))
    .finally(() => {
      addCardPopup.renderLoading(false);
    });
}
// New profile image handler
function handleProfileImageSubmit(newImageData) {
  profileImagePopup.renderLoading(true);
  api
    .updateProfileAvatar({ avatar: newImageData.image })
    .then((res) => {
      user.setUserAvatar({ avatar: res.avatar });
      profileImagePopup.close();
    })
    .catch(console.error)
    .finally(() => {
      profileImagePopup.renderLoading(false);
    });
}

// Confirm card deletion handler
function handleDeleteCard(card) {
  cardToDelete = card;
  deleteCardPopup.open();
}

// Like button handler
const handleLikeCard = (card) => {
  const cardId = card.getId();
  api
    .likeCard(cardId)
    .then(() => {
      card.flipLikeState();
    })
    .catch((err) => {
      console.error(`Error: ${err}`);
    });
};

function handleConfirmDelete() {
  deleteCardPopup.renderLoading(true);
  api
    .deleteCard(cardToDelete.getId())
    .then(() => {
      cardToDelete.handleDeleteCard();
      cardToDelete = null;
      deleteCardPopup.close();
    })
    .catch((err) => {
      console.error("Error deleting card:", err);
    })
    .finally(() => {
      deleteCardPopup.renderLoading(false);
    });
}

// Full card image handler
function handleCardImageClick(name, link) {
  imagePreviewPopup.open(name, link);
}

// ! EVENT LISTENERS FOR POPUPS

profileEditPopup.setEventListeners();
addCardPopup.setEventListeners();
imagePreviewPopup.setEventListeners();
profileImagePopup.setEventListeners();
deleteCardPopup.setEventListeners();

// ! EVENT LISTENERS FOR BUTTONS

profileEditButton.addEventListener("click", () => {
  const userInput = user.getUserInfo();
  profileTitle.value = userInput.title;
  profileSubtitle.value = userInput.title;
  profileEditPopup.open({
    title: userInput.title,
    subtitle: userInput.subtitle,
  });
  formValidators["profile-form"].resetValidation();
});

addCardButton.addEventListener("click", () => {
  addCardPopup.open(cardFormData);
});

profileImageButton.addEventListener("click", () => {
  profileImagePopup.open();
});
