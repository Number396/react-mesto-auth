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
import ProtectedRouteElement from "./ProtectedRoute";
import { apiAuth } from "../utils/authApi";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  // const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState({ isOpen: false, succeded: false });
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  //поднял контекст что бы ресетить поля формы после удачного запроса
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getCards()])
      .then(([userData, initialCards]) => {
        setCurrentUser(userData);
        setCards(initialCards);
      })
      .catch((error) => console.log(`Ошибка при загрузке страницы: ${error}`));
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

  // function handleInfoTooltipOpen() {
  //   setIsInfoTooltipOpen(true);
  // }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setisAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleCardClick(card) {
    setIsImagePopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(item => item._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((cards) => cards.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((error) => console.log(`Ошибка установки лайка: ${error}`));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((cards) => cards.filter((c) => c._id !== card._id));
      })
      .catch((error) => console.log(`Ошибка при удалении карточки: ${error}`));
  }

  function handleUpdateUser({ name, about }) {
    api.setUserInfo({ name, about })
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка при обновлении профиля: ${error}`));
  }

  function handleUpdateAvatar({ avatar, inputRef }) {
    api.setUserAvatar(avatar)
      .then((userData) => {
        setCurrentUser(userData);
        inputRef.current.form.reset();
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка при обновлении аватара: ${error}`));
  }

  function handleAddPlaceSubmit({ name, link }) {
    api.addCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setName('');
        setLink('');
        closeAllPopups();
      })
      .catch((error) => console.log(`Ошибка добавления карточки: ${error}`))
  }

  function handleRegister({ email, password }) {
    console.log(email, password);
    apiAuth.register(email, password)
      .then((data) => {
        setIsInfoTooltipOpen({ isOpen: true, succeded: true });
        navigate("/signin", { replace: true });
        console.log(data);
      })
      .catch((error) => {
        setIsInfoTooltipOpen({ isOpen: true, succeded: false });
        console.log(`Ошибка регистрации: ${error}`)
      })
  }

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header
          isLoggedIn={loggedIn}
        />

        <Routes>
          <Route
            path="/signup"
            element={<Register
              loggedIn={loggedIn}
              handleRegister={handleRegister}
            />}
          />
          <Route path="/signin" element={<Login loggedIn={loggedIn} />} />
          <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/signin" />} />
          <Route path="/" element={<ProtectedRouteElement
            element={
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                cards={cards}
                setCards={setCards}
                onCardDelete={handleCardDelete}
              />
            }
            loggedIn={loggedIn}
          />}
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
          name={name}
          link={link}
          setName={setName}
          setLink={setLink}
        />

        <PopupWithForm>
          title="Вы уверены?"
          name="confirm"
          btnText="Да"
          extraClass="popup__set_type_confirm"
        </PopupWithForm>

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups} />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
        />

      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
