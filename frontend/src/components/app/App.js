import React, { useState, useEffect } from "react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";

import * as auth from "../../utils/Auth.js";
import { api } from "../../utils/Api.js";
import ProtectedRoute from "../protectedRoute/ProtectedRoute.js";

import Footer from "../footer/Footer.js";
import Header from "../header/Header.js";
import Main from "../main/Main.js";
import PopupWithForm from "../popupWithForm/PopupWithForm.js";
import ImagePopup from "../imagePopup/ImagePopup.js";
import EditProfilePopup from "../editProfilePopup/EditProfilePopup.js";
import EditAvatarPopup from "../editAvatarPopup/EditAvatarPopup.js";
import AddPlacePopup from "../addPlacePopup/AddPlacePopup.js";
import Card from "../card/Card.js";
import Register from "../register/Register.js";
import Login from "../login/Login.js";
import InfoTooltip from "../infoTooltip/InfoTooltip.js";

import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function App() {
  const [currentUser, setCurrentUser] = useState({ name: "", about: "" });

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);

  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);

  const [isInfoTooltipOpen, setInfotooltipOpen] = useState(false);

  const [selectedCard, setSelectedCard] = useState(null);

  const [cards, setCards] = useState([]);

  const [userEmail, setUserEmail] = useState("");

  const [statusMessage, setStatusMessage] = useState(true);

  const [tooltipMessage, setTooltipMessage] = useState("");

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const history = useHistory();

  // Получаем данные пользователя
  useEffect(() => {
    if (isLoggedIn)
      api
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [isLoggedIn]);

  // Получаем карточки

  useEffect(() => {
    if (isLoggedIn)
      api
        .getCards()
        .then((cards) => {
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
  }, [isLoggedIn]);

  const cardList = cards.map((item) => {
    return (
      <Card
        key={item._id}
        card={item}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />
    );
  });

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api
        .setLikes(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      api
        .deleteLikes(card._id, !isLiked)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleCardDelete(card) {
    const isOwn = card.owner._id === currentUser._id;

    if (isOwn) {
      api
        .deleteCard(card._id)
        .then(() => {
          setCards((prevState) => prevState.filter((i) => card._id !== i._id));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleInfoTooltipClick() {
    setInfotooltipOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setInfotooltipOpen(false);
    setSelectedCard(null);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleUpdateUser(userData) {
    api
      .setUserInfo(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(userData) {
    api
      .changeUserAvatar(userData)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(card) {
    api
      .addCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function tokenCheck() {
    const jwt = localStorage.getItem("jwt");

    if (!jwt) {
      return;
    }

    auth
      .getContent(jwt)
      .then((data) => {
        setUserEmail(data.data.email);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    tokenCheck();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      history.push("/");
    }
  }, [isLoggedIn, history]);

  function onLogin(data) {
    const { email, password } = data;
    return auth
      .authorize(email, password)
      .then((res) => {
        setUserEmail(email);
        setIsLoggedIn(true);
        localStorage.setItem("jwt", res.token);
      })
      .catch((err) => {
        handleInfoTooltipClick();
        setStatusMessage(false);
        setTooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
        console.log(err);
      });
  }

  function onRegister(data) {
    return auth
      .register(data)
      .then(() => {
        history.push("/sign-in");
        setStatusMessage(true);
        setTooltipMessage("Вы успешно зарегистрировались!");
      })
      .catch((err) => {
        setStatusMessage(false);
        setTooltipMessage("Что-то пошло не так! Попробуйте ещё раз.");
        console.log(err);
      })
      .finally(() => {
        handleInfoTooltipClick();
      });
  }

  function onLogout() {
    setIsLoggedIn(false);
    localStorage.removeItem("jwt");
    history.push("/sign-in");
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="page">
          <Header
            isLoggedIn={isLoggedIn}
            onLogout={onLogout}
            user={userEmail}
          />
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              isLoggedIn={isLoggedIn}
              component={Main}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onEditAvatar={handleEditAvatarClick}
              onCardClick={handleCardClick}
              onCardLike={handleCardLike}
              onCardDelete={handleCardDelete}
              cards={cardList}
            />
            <Route path="/sign-up">
              <Register onRegister={onRegister} />
            </Route>
            <Route path="/sign-in">
              <Login onLogin={onLogin} />
            </Route>
            <Route path="*">
              {isLoggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
          </Switch>
          <Footer />
        </div>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        <PopupWithForm title="Вы уверены?" name="confirm" button="Да">
          <button className="popup__close-button" type="button" />
          <h3 className="popup__header popup__header_confirm">Вы уверены?</h3>
        </PopupWithForm>

        <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>

        <InfoTooltip
          name="infotooltip"
          isLoggedIn={isLoggedIn}
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          userStatus={statusMessage}
          tooltipMessage={tooltipMessage}
        ></InfoTooltip>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
