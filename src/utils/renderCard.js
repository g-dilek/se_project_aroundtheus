import { createCard } from "./createCard.js";
import { cardSection } from "../pages/index.js";

export function renderCard(item, method = "addItem") {
  try {
    const cardElement = createCard(item);
    if (typeof cardSection[method] === "function") {
      cardSection[method](cardElement);
    } else {
      console.error(`Method ${method} is not a function on cardSection.`);
    }
  } catch (error) {
    console.error("Error rendering card:", error);
  }
}
