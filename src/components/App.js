import { useEffect, useState } from "react";
import { api } from "../utils/api";
import AddPlacePopup from "./AddPlacePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import EditAvatarPopup from "./EditAvatarPopup";
import EditProfilePopup from "./EditProfilePopup";
import Footer from "./Footer";
import Header from "./Header";
import ImagePopup from "./ImagePopup";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

import InfoTooltip from "./InfoTooltip";
import ProtectedRoute from "./ProtectedRoute";
import { apiAuth } from "../utils/authApi";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [infoTooltipSet, setInfoTooltipSet] = useState({ isOpen: false, isSucceded: false });
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ email: " " });
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((error) => console.log(`Ошибка при загрузке страницы: ${error}`));
  }, []);

  useEffect(() => {
    tokenCheck();
  }, []);

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setisAddPlacePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setInfoTooltipSet({ ...infoTooltipSet, isOpen: false });
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    api
      .changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) =>
          cards.map((c) => (c._id === card._id ? newCard : c))
        );
      })
      .catch((error) => console.log(`Ошибка установки лайка: ${error}`));
  }

  function handleCardDelete(card) {
    api
      .deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((error) => console.log(`Ошибка при удалении карточки: ${error}`));
  }

  function handleUpdateUser({ nameinput, aboutinput }) {
    api
      .setUserInfo({ name: nameinput, about: aboutinput })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка при обновлении профиля: ${error}`));
  }

  function handleUpdateAvatar({ avatar, inputRef }) {
    api
      .setUserAvatar(avatar)
      .then((userData) => {
        setCurrentUser(userData);
        inputRef.current.form.reset();
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка при обновлении аватара: ${error}`));
  }

  function handleAddPlaceSubmit({ placeinput, linkinput }) {
    api
      .addCard({ name: placeinput, link: linkinput })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка добавления карточки: ${error}`));
  }

  function handleRegister({ email, password }) {
    apiAuth
      .register(email, password)
      .then(() => {
        setInfoTooltipSet({ isOpen: true, isSucceded: true });
        navigate("/signin", { replace: true });
      })
      .catch((error) => {
        setInfoTooltipSet({ isOpen: true, isSucceded: false });
        console.log(`Ошибка регистрации: ${error}`);
      });
  }

  function handleLogin({ email, password }) {
    apiAuth
      .login(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          setLoggedIn(true);
          navigate("/", { replace: true });
        }
      })
      .then(() => tokenCheck())
      .catch((error) => console.log(`Ошибка входа: ${error}`));
  }

  function tokenCheck() {
    const token = localStorage.getItem("token");
    if (token) {
      apiAuth
        .checkToken(token)
        .then(({ data }) => {
          setLoggedIn(true);
          setUserData({ email: data.email });
          navigate("/", { replace: true });
        })
        .catch((error) => console.log(`Ошибка: ${error}`));
    }
  }

  function handleLoginClick() {
    localStorage.removeItem("token");
    navigate("/signin", { replace: true });
    setLoggedIn(false);
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          onLoginClick={handleLoginClick}
          userData={userData}
        />

        <Routes>
          <Route
            path="/signup"
            element={
              <Register loggedIn={loggedIn} handleRegister={handleRegister} />
            }
          />
          <Route
            path="/signin"
            element={<Login loggedIn={loggedIn} handleLogin={handleLogin} />}
          />
          <Route
            path="*"
            element={loggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />}
          />
          <Route
            path="/"
            element={
              <ProtectedRoute
                component={Main}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                cards={cards}
                setCards={setCards}
                onCardDelete={handleCardDelete}
                loggedIn={loggedIn}
              />
            }
          />
        </Routes>

        <Footer />

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

        <PopupWithForm
          title="Вы уверены?"
          name="confirm"
          btnText="Да"
          extraClass="popup__set_type_confirm"
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          infoTooltipSet={infoTooltipSet}
          onClose={closeAllPopups} />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
