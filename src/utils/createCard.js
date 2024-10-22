import Card from "../components/Card.js";

export function createCard(data, handleImageClick, handleDelete, handleLike) {
  const card = new Card(
    data,
    "#card-template",
    handleImageClick,
    handleDelete,
    handleLike
  );
  return card.getCardElement();
}
