export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._title = data.name;
    this._image = data.link;
    this._id = data._id;
    this.isLiked = data.isLiked || false;
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;

    this._cardTemplate = document.querySelector(this._cardSelector);
    this._cardElement = this._getCardElement();
    this._setEventListeners();
    this._updateLikeState();
  }

  _setEventListeners() {
    this._cardElement
      .querySelector(".cards__like-button")
      .addEventListener("click", () => {
        this._handleLikeClick(this);
      });

    this._cardElement
      .querySelector(".cards__delete-button")
      .addEventListener("click", () => {
        console.log("Delete button clicked for card:", this);
        this._handleDeleteClick(this);
      });

    this._cardElement
      .querySelector(".cards__image")
      .addEventListener("click", () => {
        this._handleImageClick(this._title, this._image);
      });
  }

  _getCardElement() {
    const cardElement =
      this._cardTemplate.content.firstElementChild.cloneNode(true);
    cardElement.querySelector(".cards__title").textContent = this._title;
    cardElement.querySelector(".cards__image").src = this._image;
    cardElement.querySelector(".cards__image").alt = this._title;

    return cardElement;
  }

  getCardElement() {
    return this._cardElement;
  }

  getId() {
    return this._id;
  }

  removeCard() {
    if (this._cardElement) {
      this._cardElement.remove();
      this._cardElement = null;
    } else {
      console.error("Card element is null for card:", this);
    }
  }

  _updateLikeState() {
    this._cardElement
      .querySelector(".cards__like-button")
      .classList.toggle("cards__like-button_active", this.isLiked);
  }

  updateLikeState(isLiked) {
    this.isLiked = isLiked;
    this._updateLikeState();
  }
}
