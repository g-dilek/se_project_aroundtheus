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

// ! FUNCTIONS

function closePopUp() {
  profileEditModal.classList.remove("modal__opened");
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector("#card-image");
  const cardTitleEl = cardElement.querySelector("#card-title");
  const cardSubtitleEl = cardElement.querySelector("#card-subtitle");
  cardTitleEl.textContent = cardData.name;
  cardImageEl.src = cardData.link;
  cardImageEl.alt = cardTitleEl.textContent;

  return cardElement;
}

// ! EVENT HANDLERS

// Prevents page from refreshing when 'save' is clicked
// Adds text entered in modal to profile
function handleProfileEditSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = profileEditTitle.value;
  profileSubtitle.textContent = profileEditSubtitle.value;
  closePopUp();
}

// ! EVENT LISTENERS

// When edit button clicked, open modal
profileEditButton.addEventListener("click", () => {
  profileEditModal.classList.add("modal__opened");
  // Trim removes any whitespace before text
  profileEditTitle.value = profileTitle.textContent.trim();
  profileEditSubtitle.value = profileSubtitle.textContent;
  // Automatically puts focus on title input when opened for easy editing
  profileEditTitle.focus();
  profileEditTitle.select();
});

// When modal close button clicked, close modal
profileCloseButton.addEventListener("click", closePopUp);

// When 'save' clicked, prevent page refreshing and
// add text entered to profile
profileEditForm.addEventListener("submit", handleProfileEditSubmit);

initialCards.forEach((cardData) => {
  const cardElement = getCardElement(cardData);
  cardListEl.append(cardElement);
});
