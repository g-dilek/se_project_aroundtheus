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

// ! ELEMENTS

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileCloseButton = document.querySelector("#profile-close-button");
const profileTitle = document.querySelector("#profile-title");
const profileSubtitle = document.querySelector("#profile-subtitle");
const profileEditTitle = document.querySelector("#profile-edit-title");
const profileEditSubtitle = document.querySelector("#profile-edit-subtitle");
const profileEditForm = document.querySelector("#profile-edit-form");

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector("#card-list");
const cardImageModal = document.querySelector("#card-image-modal");
const cardImageCloseButton = document.querySelector("#card-image-close-button");
const cardFullImage = document.querySelector("#card-full-image");
const cardCaption = document.querySelector("#card-caption");

const addCardButton = document.querySelector("#add-card-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardCloseButton = document.querySelector(
  "#profile-add-card-close-button"
);
const editCardTitle = document.querySelector("#profile-add-card-title");
const editCardImage = document.querySelector("#profile-add-card-image");
const addCardForm = document.querySelector("#profile-add-card-form");

const closeButton = document.querySelectorAll(".modal__close-button");

// ! FUNCTIONS

function closePopUp(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function fillProfileInputs() {
  // Trim removes any whitespace before text
  profileEditTitle.value = profileTitle.textContent.trim();
  profileEditSubtitle.value = profileSubtitle.textContent;
  // Automatically puts focus on title input when opened for easy editing
  profileEditTitle.focus();
  profileEditTitle.select();
}

function focusCardFormInput() {
  // Automatically puts focus on card title input when opened for easy editing
  editCardTitle.focus();
  editCardTitle.select();
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector("#card-image");
  const cardTitleEl = cardElement.querySelector("#card-title");
  const profileCardLikeButton = cardElement.querySelector("#card-like-button");

  profileCardLikeButton.addEventListener("click", () => {
    profileCardLikeButton.classList.toggle("cards__like-button-active");
  });
  const profileCardDeleteButton = cardElement.querySelector(
    "#card-delete-button"
  );
  profileCardDeleteButton.addEventListener("click", () => {
    cardElement.remove();
  });
  cardImageEl.addEventListener("click", () => {
    openModal(cardImageModal);
    cardFullImage.src = cardImageEl.src;
    cardFullImage.alt = cardImageEl.alt;
    cardCaption.textContent = cardData.name;
  });
  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardTitleEl.textContent;

  return cardElement;
}

function addCard() {
  // Creates new card and adds to beginning of array
  const newCardName = editCardTitle.value;
  const newCardLink = editCardImage.value;
  const newCard = { name: newCardName, link: newCardLink };
  // Generate HTML for new card
  const newCardElement = getCardElement(newCard);
  // Append new card HTML to card list
  cardListEl.prepend(newCardElement);
}

// ! EVENT HANDLERS

// Prevents page from refreshing when 'save' is clicked
// Adds text entered in modal to profile
function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileEditTitle.value;
  profileSubtitle.textContent = profileEditSubtitle.value;
  closePopUp(profileEditModal);
}

// When add card submitted: prevents refresh, closes add card modal,
// adds new card, resets title and image values only after submit
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  closePopUp(addCardModal);
  addCard();
  editCardTitle.value = "";
  editCardImage.value = "";
}

// ! EVENT LISTENERS

// When edit button clicked, open profile modal
profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  fillProfileInputs();
});

// When add card button clicked, open modal
addCardButton.addEventListener("click", () => {
  openModal(addCardModal);
  focusCardFormInput();
});

// When a modal close button clicked, check closest modal and run closePopUp() on it
closeButton.forEach((button) => {
  const closestModal = button.closest(".modal");
  button.addEventListener("click", () => {
    closePopUp(closestModal);
  });
});

// When 'save' clicked, prevent page refreshing and
// add text entered to profile modal
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// Same for add card modal
addCardForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});
