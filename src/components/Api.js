export default class Api {
  constructor(options) {
    this._authorization = "d61b98fc-c3a9-4c62-af93-44f6069de42c";
    this._baseUrl = options.baseUrl;
    console.log("Base URL:", this._baseUrl);
    console.log("Fetching URL:", `${this._baseUrl}/cards`);
    console.log("Authorization Header:", this._authorization);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: this._authorization,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((data) => {
        console.log("API response data:", data);
        return data;
      })
      .catch((err) => console.error(err));
  }

  addCard(cardData) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cardData),
    })
      .then((res) =>
        res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
      )
      .catch((err) => console.error(err));
  }

  // Create a new card
  createCard({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        authorization: this._authorization,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, link }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => console.error(err));
  }

  // Delete a card
  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    })
      .then((res) => {
        if (res.ok) return;
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => console.error(err));
  }

  // Like a card
  likeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._authorization,
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => console.error(err));
  }

  // Dislike a card
  dislikeCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._authorization,
      },
    })
      .then((res) => {
        if (res.ok) return res.json();
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => console.error(err));
  }
}

//     GET /users/me – Get the current user’s info
//     PATCH /users/me – Update your profile information
//     PATCH /users/me/avatar – Update avatar

// Card routes

//     GET /cards – Get all cards
//     POST /cards – Create a card
//     DELETE /cards/:cardId – Delete a card
//     PUT /cards/:cardId/likes – Like a card
//     DELETE /cards/:cardId/likes – Dislike a card
