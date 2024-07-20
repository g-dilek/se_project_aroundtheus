// Import global functions and elements
import {
  openModal,
  closeModal,
  cardListEl,
  addCardForm,
  addCardModal,
  editCardTitle,
  editCardImage,
} from "../pages/index.js";

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._cardElement = this._getCardElement(data);
    this._setEventListeners();
  }

  _focusCardFormInput() {
    // Automatically puts focus on card title input when opened for easy editing
    editCardTitle.focus();
    editCardTitle.select();
  }

  // Event listeners
  _setEventListeners() {
    // Elements
    const likeButton = this._cardElement.querySelector("#card-like-button");
    const deleteButton = this._cardElement.querySelector("#card-delete-button");
    const cardImageEl = this._cardElement.querySelector("#card-image");
    const addCardButton = document.querySelector("#add-card-button");

    // Like button event listener
    likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    // Delete button event listener
    deleteButton.addEventListener("click", () => {
      this._handleDeleteButton();
    });

    // Modal preview image event listener
    cardImageEl.addEventListener("click", this._handleImageClick.bind(this));

    // Add card event listener

    addCardButton.addEventListener("click", () => {
      openModal(addCardModal);
      this._focusCardFormInput();
    });
  }

  _addCard() {
    // Creates new card and adds to array
    const newCardName = editCardTitle.value;
    const newCardLink = editCardImage.value;
    const newCard = { name: newCardName, link: newCardLink };
    // Generate HTML for new card
    const newCardElement = this._getCardElement(newCard);
    // Add new card HTML to card list
    cardListEl.prepend(newCardElement);
  }

  // When add card submitted: prevents refresh, closes add card modal,
  // adds new card, resets title and image values only after submit
  _handleAddCardSubmit(evt) {
    evt.preventDefault();
    closeModal(addCardModal);
    this._addCard();
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
    const cardImageModal = document.querySelector("#card-image-modal");
    openModal(cardImageModal);
    const cardFullImage = document.querySelector("#card-full-image");
    cardFullImage.src = this._link;
    cardFullImage.alt = this._name;
    // Caption refers to the text under the full image modal - same as name
    const cardCaption = document.querySelector("#card-caption");
    cardCaption.textContent = this._name;
  }

  _getCardElement() {
    const cardTemplate =
      document.querySelector("#card-template").content.firstElementChild;
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
}

export function addCard(newCard) {
  const card = new Card(newCard);
  cardListEl.prepend(card.getCardElement());
}
