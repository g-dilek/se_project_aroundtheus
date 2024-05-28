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

const profileAddCardButton = document.querySelector("#profile-add-card-button");
const profileAddCardModal = document.querySelector("#profile-add-card-modal");
const profileAddCardCloseButton = document.querySelector(
  "#profile-add-card-close-button"
);
const profileEditCardTitle = document.querySelector("#profile-add-card-title");
const profileEditCardImage = document.querySelector("#profile-add-card-image");
const profileAddCardForm = document.querySelector("#profile-add-card-form");

// ! FUNCTIONS

function closePopUp(modal) {
  modal.classList.remove("modal_opened");
}

function openModal(modal) {
  modal.classList.add("modal_opened");
}

function editProfile() {
  // Trim removes any whitespace before text
  profileEditTitle.value = profileTitle.textContent.trim();
  profileEditSubtitle.value = profileSubtitle.textContent;
  // Automatically puts focus on title input when opened for easy editing
  profileEditTitle.focus();
  profileEditTitle.select();
}

function editCard() {
  // Automatically puts focus on card title input when opened for easy editing
  profileEditCardTitle.focus();
  profileEditCardTitle.select();
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
  });
  cardImageCloseButton.addEventListener("click", () => {
    closePopUp(cardImageModal);
  });
  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardTitleEl.textContent;

  return cardElement;
}

function addCard() {
  // Creats new card and adds to beginning of array
  let newCardName = profileEditCardTitle.value;
  let newCardLink = profileEditCardImage.value;
  let newCard = { name: newCardName, link: newCardLink };
  initialCards.unshift(newCard);
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

// Prevents refresh
function handleAddCardSubmit(evt) {
  evt.preventDefault();
  closePopUp(profileAddCardModal);
  addCard();
}

// ! EVENT LISTENERS

// Here's where I'll add openModal- at arrow function
// When edit button clicked, open profile modal
profileEditButton.addEventListener("click", () => {
  openModal(profileEditModal);
  editProfile();
});

//Add openModal here too
// When add card button clicked, open modal
profileAddCardButton.addEventListener("click", () => {
  openModal(profileAddCardModal);
  editCard();
});

// When modal close button clicked, close modal
profileCloseButton.addEventListener("click", () => {
  closePopUp(profileEditModal);
});

profileAddCardCloseButton.addEventListener("click", () => {
  closePopUp(profileAddCardModal);
});

// When 'save' clicked, prevent page refreshing and
// add text entered to profile
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

// Same for add card modal
profileAddCardForm.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});

// Add delete icon - make it delete card
// When photo clicked, open modal of full-size picture
// Smooth transitions - use visibility
