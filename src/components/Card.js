export default class Card {
  constructor(
    data,
    cardSelector,
    handleImageClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._title = data.title;
    this._image = data.image;
    this._id = data._id;
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

    this._setEventListeners();
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._deleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });

    this._cardImageEl.addEventListener("click", () => {
      // Ensure this line passes correct arguments
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
}
