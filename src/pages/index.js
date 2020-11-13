import "../pages/index.css";

import FormValidator from "../components/FormValidator.js";
import Card from "../components/Card.js";
import Section from "../components/Section.js";

import {
  objectForValidation,
  editProfileModal,
  addCardModal,
  editAvatarModal,
  editProfileModalOpenButton,
  addCardModalOpenButton,
  editAvatarOpenButton,
} from "../components/constants.js";

import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithImage from "../components/PopupWithImage.js";

import { setUserInfoFromProfile } from "../components/utils.js";
import PopupWithConfirmation from "../components/PopupWithConfirmation.js";
import Api from "../components/Api.js";

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-17",
  headers: {
    authorization: "cd3a27fc-dbc8-4f9e-8b6d-a08ba5c31a75",
    "Content-Type": "application/json",
  },
});

//Создаем экземпляр класса UserInfo для редактирования профиля
const userInfo = new UserInfo(
  ".profile__name",
  ".profile__about",
  ".profile__avatar"
);

//Создаем экземпляр класса PopupWithImage для попап увеличеня фото
const popupWithImage = new PopupWithImage(".modal_type_photo");
popupWithImage.setEventListeners();

//Создаем функцию создания карточки, которая создаем экземпляр класса Card,
//задает колбэки функций открытия превью фото, удаления карточки, лайка
//и возвращает готовую карточку
function createCard(item, myId) {
  const card = new Card({
    item: item,
    myId: myId,
    templateCardSelector: ".template-card",
    handleCardClick: (element) => {
      popupWithImage.open(element);
    },
    handleCardDelete: () => {
      const popupWithConfirmation = new PopupWithConfirmation({
        modalSelector: ".modal_type_delete-card",
        handleFormSubmit: (id) => {
          api.deleteCard(id).then(() => {
            card.deleteCard(id);
          });
        },
      });

      popupWithConfirmation.setEventListeners();
      popupWithConfirmation.open(item);
    },
    handleCardLike: (id, likes) => {
      debugger;
      function checkArray(likes) {
        for (let i = 0; i < likes.length; i++) {
          if (likes[i]._id == myId) {
            return true;
          }
        }
      }

      if (checkArray(likes)) {
        api.deleteLike(id).then((data) => {
          const likes = data.likes;
          card.setLike(likes, myId);
        });
      } else {
        api.setLike(id).then((data) => {
          const likes = data.likes;
          card.setLike(likes, myId);
        });
      }
    },
  });
  return card.createCard();
}

//Создаем экземпляр класс Section, который добавляет в контейнер готовые элементы карточек
const cardList = new Section(
  {
    renderer: (item, myId) => {
      debugger;
      const cardElement = createCard(item, myId);
      cardList.addItem(cardElement);
    },
  },
  ".places"
);

Promise.all([
  //в Promise.all передаем массив промисов которые нужно выполнить
  api.getInfoAboutUser(),
  api.getCards(),
])
  .then(([infoAboutUser, initialCards]) => {
    userInfo.setUserInfo(infoAboutUser);
    userInfo.setUserAvatar(infoAboutUser);
    const myId = infoAboutUser._id;

    const items = initialCards.map((card) => {
      return {
        name: card.name,
        link: card.link,
        id: card._id,
        ownerId: card.owner._id,
        likes: card.likes,
      };
    });
    cardList.renderItems(items, myId);
  })
  .catch((err) => {
    // попадаем сюда если один из промисов завершится ошибкой
    console.log(err);
  });

//Создаем экземпляр класса FormValidator для Модалки редактирования профиля
const editeProfileValidator = new FormValidator(
  objectForValidation,
  editProfileModal
);
editeProfileValidator.enableValidation();

//Создаем экземпляр класса FormValidator для Модалки добавления новой карточки
const addCardValidator = new FormValidator(objectForValidation, addCardModal);
addCardValidator.enableValidation();

//Создаем экземпляр класса FormValidator для Модалки добавления новой карточки
const editAvatarValidator = new FormValidator(
  objectForValidation,
  editAvatarModal
);
editAvatarValidator.enableValidation();

//Создаем экземпляр класса PopupWithForm для модалки обновления профиля
const popupWithFormForEditProfile = new PopupWithForm({
  modalSelector: ".modal_type_edit-profile",
  handleFormSubmit: (newUserInfo) => {
    popupWithFormForEditProfile.setLoading(true);
    api.patchInfoAboutUser(newUserInfo).then((data) => {
      userInfo.setUserInfo(data);
      popupWithFormForEditProfile.close();
      popupWithFormForEditProfile.setLoading(false);
    });
  },
});

//добавляем слушателей на модалку popupWithFormForEditProfile
popupWithFormForEditProfile.setEventListeners();

//Добавляем слушатель на кнопку открытия Модалки обновления профиля
editProfileModalOpenButton.addEventListener("click", () => {
  editeProfileValidator.enableButton();
  const userInfoFromProfile = userInfo.getUserInfo();
  setUserInfoFromProfile(userInfoFromProfile);
  editeProfileValidator.resetErrors();
  popupWithFormForEditProfile.open();
});

//Создаем экземпляр класса PopupWithForm для модалки обновления аватара
const popupWithFormForEditAvatar = new PopupWithForm({
  modalSelector: ".modal_type_edit-avatar",
  handleFormSubmit: (newUserInfo) => {
    debugger;
    popupWithFormForEditAvatar.setLoading(true);
    api.patchAvatar(newUserInfo).then((data) => {
      userInfo.setUserAvatar(data);
      popupWithFormForEditAvatar.close();
      popupWithFormForEditAvatar.setLoading(false);
    });
  },
});

//добавляем слушателей на модалку popupWithFormForEditAvatar
popupWithFormForEditAvatar.setEventListeners();

//Добавляем слушатель на кнопку открытия Модалки обновления аватара
editAvatarOpenButton.addEventListener("click", () => {
  editAvatarValidator.disableButton();
  editAvatarValidator.resetErrors();
  popupWithFormForEditAvatar.open();
});

//Создаем экземпляр класса PopupWithForm для Модалки добавления новой карточки
const popupWithFormForAddCard = new PopupWithForm({
  modalSelector: ".modal_type_add-card",
  handleFormSubmit: (newCard) => {
    popupWithFormForAddCard.setLoading(true);
    api.postNewCard(newCard).then((data) => {
      const myId = data.owner._id;
      const items = [];
      items[0] = {
        name: data.name,
        link: data.link,
        id: data._id,
        ownerId: data.owner._id,
        likes: data.likes,
      };
      cardList.renderItems(items, myId);
      popupWithFormForAddCard.close();
      popupWithFormForAddCard.setLoading(false);
    });
  },
});

//добавляем слушателей на модалку popupWithFormForAddCard
popupWithFormForAddCard.setEventListeners();

//Добавляем слушатель на кнопку открытия Модалки добавления новой карточки
addCardModalOpenButton.addEventListener("click", () => {
  addCardValidator.disableButton();
  addCardValidator.resetErrors();
  popupWithFormForAddCard.open();
});
