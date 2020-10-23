const editProfileModal = document.querySelector('.modal_type_edit-profile');
//Объявляем элементы внутри модальных окон
//editProfileModal
const editProfileFormName = editProfileModal.querySelector('.modal__input_type_name');
const editProfileFormAbout = editProfileModal.querySelector('.modal__input_type_about');

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
