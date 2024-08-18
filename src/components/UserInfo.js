export default class UserInfo {
  constructor({ title, subtitle }) {
    this._title = document.querySelector(title);
    this._subtitle = document.querySelector(subtitle);
    this._image = document.querySelector(".profile__image");
  }

  getUserInfo() {
    return {
      title: this._title.textContent.trim(),
      subtitle: this._subtitle.textContent.trim(),
      image: this._image,
    };
  }

  setUserInfo({ title, subtitle }) {
    this._title.textContent = title;
    this._subtitle.textContent = subtitle;
    this._image = image;
  }
}
