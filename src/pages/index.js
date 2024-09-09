// JS imports
import { settings } from "../utils/constants.js";
import { handleSubmit } from "../utils/handleSubmit.js";
import { renderCard } from "../utils/renderCard.js";
import { createCard } from "../utils/createCard.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Api from "../components/Api.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";

// other imports
import "../pages/index.css";

// ! ELEMENTS

// Profile edit
const profileEditButton = document.querySelector("#profile-edit-button");
const profileTitle = document.querySelector("#profile-title");
const profileSubtitle = document.querySelector("#profile-subtitle");

// Card addition
const addCardButton = document.querySelector("#add-card-button");

// Profile image
const profileImageButton = document.querySelector(
  ".profile__avatar-edit-button"
);

// Card deletion
let cardToDelete = null;

// Form data
let cardFormData = {
  title: "",
  image: "",
};

// ! INSTANTIATE CLASSES

// Instantiate popups
const deleteCardPopup = new PopupDeleteCard(
  { popupSelector: "#confirm-delete-modal" },
  handleConfirmDelete
);

deleteCardPopup.setDeleteConfirmCallback(handleConfirmDelete);

const profileImagePopup = new PopupWithForm(
  "#profile-image-modal",
  handleProfileImageSubmit
);

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);

const addCardPopup = new PopupWithForm("#add-card-modal", handleAddCardSubmit);

const imagePreviewPopup = new PopupWithImage("#card-image-modal");

// Instantiate API
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "298fcaaa-e173-4e81-9326-ea95e21a4625",
    "Content-Type": "application/json",
  },
});

// Instantiate user info
const user = new UserInfo({
  title: ".profile__title",
  subtitle: ".profile__subtitle",
  avatar: ".profile__image",
});

// Instantiate card section
export const cardSection = new Section(
  {
    items: [],
    renderer: (item) => {
      const cardElement = createCard(
        item,
        handleCardImageClick,
        handleDeleteClick,
        handleLikeClick
      );
      cardSection.addItem(cardElement);
    },
  },
  "#card-list"
);

// ! INITIAL DATA FETCHING

// Fetch initial cards and user info
const initialize = async () => {
  try {
    const [cards, userInfo] = await Promise.all([
      api.getInitialCards(),
      api.getUserInfo(),
    ]);

    cardSection.setItems(cards);
    user.setUserInfo({
      name: userInfo.name,
      about: userInfo.about,
    });
    user.setUserAvatar({
      avatar: userInfo.avatar,
    });
  } catch (err) {
    console.error("Initialization error:", err);
  }
};

initialize();

// ! FORM VALIDATION

const formValidators = {};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(settings, formElement);
    const formName = formElement.getAttribute("name");
    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(settings);

// ! EVENT HANDLERS

// Handle profile edit form submission
function handleProfileEditSubmit(profileData) {
  return handleSubmit(() => {
    return api
      .updateProfileInfo({
        name: profileData.title,
        description: profileData.subtitle,
      })
      .then((updatedData) => {
        user.setUserInfo(updatedData);
      });
  }, profileEditPopup);
}

// Add card handler
function handleAddCardSubmit(inputValues) {
  return handleSubmit(() => {
    return api
      .addCard({ name: inputValues.title, link: inputValues.image })
      .then((newCardData) => {
        renderCard(newCardData, "appendItem");
      });
  }, addCardPopup);
}

// Handle profile image form submission
function handleProfileImageSubmit(newImageData) {
  return handleSubmit(() => {
    return api
      .updateProfileAvatar({ avatar: newImageData.image })
      .then((res) => {
        user.setUserAvatar({ avatar: res.avatar });
      });
  }, profileImagePopup);
}

// Handle card delete confirmation
function handleDeleteClick(card) {
  cardToDelete = card;
  deleteCardPopup.open();
}

// Handle card like button
function handleLikeClick(card) {
  const newLikeState = !card._isLiked;
  card.updateLikeState(newLikeState);
  card._isLiked = newLikeState;

  // Update server
  if (newLikeState) {
    api.likeCard(card.getId()).catch((err) => console.error(err));
  } else {
    api.unlikeCard(card.getId()).catch((err) => console.error(err));
  }
}

// Handle card delete confirmation submit
function handleConfirmDelete() {
  return handleSubmit(
    () => {
      return api.deleteCard(cardToDelete.getId()).then(() => {
        cardToDelete.handleDeleteClick();
        cardToDelete = null;
      });
    },
    deleteCardPopup,
    "Yes",
    "Deleting..."
  );
}

// Handle card image click
function handleCardImageClick(name, link) {
  imagePreviewPopup.open(name, link);
}

// ! EVENT LISTENERS

// Set event listeners for popups
profileEditPopup.setEventListeners();
addCardPopup.setEventListeners();
imagePreviewPopup.setEventListeners();
profileImagePopup.setEventListeners();
deleteCardPopup.setEventListeners();

// Set event listeners for buttons
// Handle profile edit button click
profileEditButton.addEventListener("click", () => {
  const userInput = user.getUserInfo();
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
