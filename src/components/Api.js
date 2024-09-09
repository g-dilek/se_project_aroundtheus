export default class Api {
  constructor(options) {
    this._headers = options.headers;
    this._baseUrl = options.baseUrl;
  }

  // Handle HTTP response
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error ${res.status}`);
    }
  }

  // Make a fetch request
  _request(url, options) {
    return fetch(url, options).then(this._handleResponse);
  }

  // Cards

  // Fetch all cards
  getInitialCards() {
    return this._request(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  // Add a new card
  addCard({ name, link }) {
    if (!name || !link) {
      return Promise.reject("Missing name or link"); // Add this validation
    }
    return this._request(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
  }

  // Delete a card
  deleteCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  // Like a card
  likeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    });
  }

  // Unlike a card (dislike)
  unlikeCard(cardId) {
    return this._request(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    });
  }

  // Profile

  // Update profile information
  updateProfileInfo({ name, description }) {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about: description }),
    });
  }

  // Update profile avatar
  updateProfileAvatar({ avatar }) {
    return this._request(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    });
  }

  // Fetch user info
  getUserInfo() {
    return this._request(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  // Fetch both user info and initial cards
  getAppData() {
    return Promise.all([this.getUserInfo(), this.getInitialCards()]);
  }
}
