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

// ! INSTANTIATE CLASSES

// Instantiate popups
const deleteCardPopup = new PopupDeleteCard(
  { popupSelector: "#confirm-delete-modal" },
  handleConfirmDelete
);

const profileImagePopup = new PopupWithForm(
  "#profile-image-modal",
  handleProfileImageSubmit,
  formValidators["profile-image-form"]
);

const profileEditPopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit,
  formValidators["profile-edit-form"]
);

const addCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleAddCardSubmit,
  formValidators["add-card-form"]
);

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
        const newCardElement = createCard(
          newCardData,
          handleCardImageClick,
          handleDeleteClick,
          handleLikeClick
        );
        cardSection.addItem(newCardElement);
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
  if (!card._cardElement) {
    console.error("Card element is null for card:", card);
  }

  cardToDelete = card;
  deleteCardPopup.open();
}

// Handle card like button
// Handle card like button
function handleLikeClick(card) {
  const newLikeState = !card.isLiked;

  // First update the state of the card (for visual feedback)
  card.updateLikeState(newLikeState);
  card.isLiked = newLikeState;

  // Define the API request based on the new state
  const apiRequest = newLikeState
    ? api.likeCard(card.getId())
    : api.unlikeCard(card.getId());

  // Make the API request
  apiRequest
    .then(() => {
      // Success: The state was correctly updated on the server
      card.updateLikeState(newLikeState);
    })
    .catch((err) => {
      // Failure: Revert the UI state if there was an error
      console.error("Error toggling like state:", err);
      card.updateLikeState(!newLikeState); // Revert the visual state
      card.isLiked = !newLikeState; // Revert the internal state
    });
}

// Handle card delete confirmation submit
function handleConfirmDelete() {
  return handleSubmit(
    () => {
      if (!cardToDelete) {
        console.error("No card to delete.");
        return Promise.resolve();
      }

      return api
        .deleteCard(cardToDelete.getId())
        .then(() => {
          // Verify if cardToDelete still has a valid element
          if (cardToDelete._cardElement) {
            cardToDelete.removeCard();
          } else {
            console.warn("Card element is null");
          }
          cardToDelete = null;
          return Promise.resolve();
        })
        .catch((error) => {
          console.error("Error deleting card:", error);
          return Promise.reject(error);
        })
        .finally(() => {
          deleteCardPopup.close();
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
profileEditButton.addEventListener("click", () => {
  const userInput = user.getUserInfo();
  profileEditPopup.open({
    title: userInput.title,
    subtitle: userInput.subtitle,
  });
  formValidators["profile-edit-form"].resetValidation();
});

addCardButton.addEventListener("click", () => {
  addCardPopup.open(cardFormData);
});

profileImageButton.addEventListener("click", () => {
  profileImagePopup.open();
});
