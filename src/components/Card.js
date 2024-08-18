export default class Card {
  constructor(data, cardSelector, handleImageClick, handleDeleteClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;

    // Fetch DOM elements and store them as class fields
    this._cardTemplate = document.querySelector(this._cardSelector);
    this._cardElement = this._getCardElement();
    this._likeButton = this._cardElement.querySelector(".cards__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".cards__delete-button"
    );

    // Bind event listeners
    this._setEventListeners();
  }

  // Event listeners setup
  _setEventListeners() {
    // Like button event listener
    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });

    // Delete button event listener
    this._deleteButton.addEventListener("click", () => {
      // open are you sure popup here
      this._handleDeleteClick(this);
    });

    // Card image click event listener
    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick({ name: this._name, link: this._link });
    });
  }

  // Like button handler
  _handleLikeButton() {
    this._likeButton.classList.toggle("cards__like-button-active");
  }

  // Delete button handler
  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  // Method to create the card element
  _getCardElement() {
    const cardElement =
      this._cardTemplate.content.firstElementChild.cloneNode(true);
    this._cardTitleEl = cardElement.querySelector(".cards__title");
    this._cardImageEl = cardElement.querySelector(".cards__image");
    this._cardTitleEl.textContent = this._name;
    this._cardImageEl.src = this._link;
    this._cardImageEl.alt = this._name;
    return cardElement;
  }

  // Public method to get the card element
  getCardElement() {
    return this._cardElement;
  }
}
