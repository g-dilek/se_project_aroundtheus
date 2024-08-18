class Api {
  constructor(options) {
    this._authorization = "590f97d9-e5fa-4775-8c94-b9976acf5893";
  }

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1", {
      headers: {
        authorization: this._authorization,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => console.error(err));
  }

  // other methods for working with the API

  // Сreate a function in Api.js and return the Promise.all() method.
  renderCards() {
    // Pass the array of function calls for getting user information and
    // the list of cards to Promise.all() as a parameter.
    return Promise.all();
  }
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: this._authorization,
    "Content-Type": "application/json",
  },
});

// 123 test abc

// User routes

//     GET /users/me – Get the current user’s info
//     PATCH /users/me – Update your profile information
//     PATCH /users/me/avatar – Update avatar

// Card routes

//     GET /cards – Get all cards
//     POST /cards – Create a card
//     DELETE /cards/:cardId – Delete a card
//     PUT /cards/:cardId/likes – Like a card
//     DELETE /cards/:cardId/likes – Dislike a card
