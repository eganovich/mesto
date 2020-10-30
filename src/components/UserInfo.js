import {editProfileFormName, editProfileFormAbout} from './constants.js';

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
        editProfileFormName.value = this._profileName.textContent;
        editProfileFormAbout.value = this._profileAbout.textContent;
    }
}
