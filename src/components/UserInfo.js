export default class UserInfo {
    constructor(profileNameSelector, profileAboutSelector, profileAvatar) {
        this._profileName = document.querySelector(profileNameSelector);
        this._profileAbout = document.querySelector(profileAboutSelector);
        this._profileAvatar = document.querySelector(profileAvatar);
    }
    setUserInfo(newUserInto) {
        this._profileName.textContent = newUserInto.name;
        this._profileAbout.textContent = newUserInto.about;
    }

    setUserAvatar(newUserInto){
      this._profileAvatar.style.backgroundImage = `url('${newUserInto.avatar}')`;
    }

    getUserInfo() {
        this.userInfo = {}
        this.userInfo.name = this._profileName.textContent;
        this.userInfo.about = this._profileAbout.textContent;
        return this.userInfo;
    }

}
