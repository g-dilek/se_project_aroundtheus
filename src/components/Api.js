class Api {
  constructor(options) {
    // constructor body
  }

  getInitialCards() {
    // ...
  }

  // other methods for working with the API
}

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "c56e30dc-2883-4270-a59e-b2f7bae969c6",
    "Content-Type": "application/json",
  },
});

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
