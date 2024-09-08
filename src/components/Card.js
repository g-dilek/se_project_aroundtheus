export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._title = data.name; // Use 'name' if that's how your data is structured
    this._image = data.link; // Use 'link' if that's how your data is structured
    this._id = data._id;
    this._likes = data.likes || []; // Array of like objects
    this._cardSelector = cardSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;

    this._cardTemplate = document.querySelector(this._cardSelector);
    this._cardElement = this._getCardElement();
    this._likeButton = this._cardElement.querySelector(".cards__like-button");
    this._deleteButton = this._cardElement.querySelector(
      ".cards__delete-button"
    );
    this._cardImageEl = this._cardElement.querySelector(".cards__image");

    this._setEventListeners();
    this._updateLikeState(); // Set the initial like state based on server data
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this);
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });

    this._cardImageEl.addEventListener("click", () => {
      this._handleImageClick(this._title, this._image);
    });
  }

  _getCardElement() {
    const cardElement =
      this._cardTemplate.content.firstElementChild.cloneNode(true);

    this._cardTitleEl = cardElement.querySelector(".cards__title");
    this._cardImageEl = cardElement.querySelector(".cards__image");

    this._cardTitleEl.textContent = this._title;
    this._cardImageEl.src = this._image;
    this._cardImageEl.alt = this._title;

    return cardElement;
  }

  getCardElement() {
    return this._cardElement;
  }

  getId() {
    return this._id;
  }

  handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _updateLikeState() {
    // Check if the current card is liked by checking the likes array
    const isLiked = this._likes.length > 0; // Assuming if there are any likes, the card is liked
    this.updateLikeState(isLiked);
  }

  updateLikeState(isLiked) {
    if (isLiked) {
      this._likeButton.classList.add("cards__like-button_active");
    } else {
      this._likeButton.classList.remove("cards__like-button_active");
    }
  }
}
