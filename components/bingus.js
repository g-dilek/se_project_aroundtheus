import { openModal, closeModal } from "../pages/index.js";

const cardTemplate =
  document.querySelector("#card-template").content.firstElementChild;
const cardListEl = document.querySelector("#card-list");
const cardImageModal = document.querySelector("#card-image-modal");
const cardImageCloseButton = document.querySelector("#card-image-close-button");
const cardFullImage = document.querySelector("#card-full-image");
const cardCaption = document.querySelector("#card-caption");

const addCardButton = document.querySelector("#add-card-button");
const addCardModal = document.querySelector("#add-card-modal");
const addCardCloseButton = document.querySelector("#add-card-close-button");
const editCardTitle = document.querySelector("#add-card-title");
const editCardImage = document.querySelector("#add-card-image");
const addCardForm = document.querySelector("#add-card-form");

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardElement = this._getCardElement();
    this._setEventListeners();
  }

  _focusCardFormInput() {
    // Automatically puts focus on card title input when opened for easy editing
    editCardTitle.focus();
    editCardTitle.select();
  }

  // Event listeners
  _setEventListeners() {
    const likeButton = this._cardElement.querySelector(".cards__like-button");
    const deleteButton = this._cardElement.querySelector(
      ".cards__delete-button"
    );
    // Like button event listener

    likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    // Delete button event listener
    deleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });

    // Modal preview image listener
    const cardImageEl = this._cardElement.querySelector("#card-image");
    cardImageEl.addEventListener("click", this._handleImageClick.bind(this));

    addCardForm.addEventListener("submit", () => this._handleAddCardSubmit());

    addCardButton.addEventListener("click", () => {
      openModal(addCardModal);
      this._focusCardFormInput();
    });
  }

  // When add card submitted: prevents refresh, closes add card modal,
  // adds new card, resets title and image values only after submit
  _handleAddCardSubmit(evt) {
    evt.preventDefault();
    closeModal(addCardModal);
    addCard();
    editCardTitle.value = "";
    editCardImage.value = "";
  }

  // Like button handler
  _handleLikeButton() {
    const likeButton = this._cardElement.querySelector(".cards__like-button");
    likeButton.classList.toggle("cards__like-button-active");
  }

  // Delete button handler
  _handleDeleteButton() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _handleImageClick() {
    openModal(cardImageModal); // Assuming cardImageModal is accessible here
    cardFullImage.src = this._link;
    cardFullImage.alt = this._name;
    cardCaption.textContent = this._name;
  }

  _getCardElement() {
    const cardElement = cardTemplate.cloneNode(true);
    const cardImageEl = cardElement.querySelector("#card-image");
    const cardTitleEl = cardElement.querySelector("#card-title");
    cardTitleEl.textContent = this._name;
    cardImageEl.src = this._link;
    cardImageEl.alt = this._name;

    return cardElement;
  }

  getCardElement() {
    return this._cardElement;
  }

  _addCard() {
    // Creates new card and adds to beginning of array
    const newCardName = editCardTitle.value;
    const newCardLink = editCardImage.value;
    const newCard = { name: newCardName, link: newCardLink };
    // Generate HTML for new card
    const newCardElement = getCardElement(newCard);
    // Append new card HTML to card list
    cardListEl.prepend(newCardElement);
  }
}

export function addCard(newCard) {
  const card = new Card(newCard);
  cardListEl.prepend(card.getCardElement());
}
