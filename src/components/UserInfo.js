

export default class UserInfo {
    constructor(profileNameSelector, profileAboutSelector) {
        this._profileName = document.querySelector(profileNameSelector);
        this._profileAbout = document.querySelector(profileAboutSelector);
    }
    setUserInfo(newUserInto) {
        this._profileName.textContent = newUserInto.name;
        this._profileAbout.textContent = newUserInto.about;
    }
    getUserInfo() {
        this.userInfo = {}
        this.userInfo.name = this._profileName.textContent;
        this.userInfo.about = this._profileAbout.textContent;
        return this.userInfo;
    }
}
