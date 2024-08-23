class Api {
  constructor(options) {}

  getInitialCards() {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      headers: {
        authorization: process.env.API_KEY,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // ELSE if the server returns an error, reject the promise
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        this.renderCards(result);
      })
      .catch((err) => console.error(err));
  }

  // other methods for working with the API

  // Сreate a function in Api.js and return the Promise.all() method.
  renderCards() {
    // Pass the array of function calls for getting user information and
    // the list of cards to Promise.all() as a parameter.

    const section = new Section(
      {
        items: cards,
        renderer: (cardData) => {
          const card = createCard(cardData);
          section.addItem(card);
        },
      },
      "#card-list"
    );
    section.renderItems();
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
