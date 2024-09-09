import { createCard } from "./createCard.js";
import { cardSection } from "../pages/index.js";

export function renderCard(item, method = "addItem") {
  const cardElement = createCard(item);
  // Add the card to the section using the specified method
  cardSection[method](cardElement);
}
