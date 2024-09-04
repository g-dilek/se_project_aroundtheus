export default class UserInfo {
  constructor({ title, subtitle, avatar }) {
    this._title = document.querySelector(title);
    this._subtitle = document.querySelector(subtitle);
    this._avatar = document.querySelector(avatar);
    console.log("Avatar image element:", this._avatar);
    console.log("Title element:", this._title);
    console.log("Subtitle element:", this._subtitle);
  }

  getUserInfo() {
    return {
      title: this._title.textContent.trim(),
      subtitle: this._subtitle.textContent.trim(),
      avatar: this._avatar.src,
    };
  }

  setUserInfo({ name, about }) {
    this._title.textContent = name;
    this._subtitle.textContent = about;
  }

  setUserAvatar({ avatar }) {
    this._avatar.src = avatar;
  }
}
