import React from "react";
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';

import Header from './Header'
import Main from "./Main";
import Footer from "./Footer";
import PopupEditProfile from "./PopupEditProfile";
import PopupAvatarEdit from "./PopupAvatarEdit";
import PopupSubmitDelete from "./PopupSubmitDelete";
import ImagePopup from "./ImagePopup";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";

import {api} from "../utils/api"
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [isSubmitDeletePopupOpen, setSubmitDeletePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [loggedIn, setLoggedin] = React.useState();

  React.useEffect(() => {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([user, cards]) => {
          setCurrentUser(user);
          setCards(cards)})
        .catch((err) => console.log(err))
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        const newCards = cards.map((c) => c._id === card._id ? newCard : c);
        setCards(newCards);
      })
      .catch((err) => console.log(err))
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        const newCards = cards.filter((c) => c._id !== card._id);
        setCards(newCards);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function handleSubmitDeleteClick(card) {
    setSelectedCard(card);
    setSubmitDeletePopupOpen(true);
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data.name, data.about)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleUpdateAvatar(data) {
    api.updateAvatar(data.avatar)
      .then((data) => {
        setCurrentUser(data);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function handleAddPlaceSubmit(card) {
    api.addNewCard(card.name, card.link)
      .then((card) => {
        setCards([card, ...cards]);
          closeAllPopups();
      })
      .catch((err) => console.log(err))
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setImagePopupOpen(false);
    setSubmitDeletePopupOpen(false);
    setSelectedCard(null);
  }

  function handleLogin() {
    setLoggedin(true);
  }

  function handleRegistration(){

  }

  function handleCheckToken() {

  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <BrowserRouter>
            <Header />
            <Switch>
              <Route path="/sign-up">
                <Register />
              </Route>
              <Route path="/sign-in">
                <Login />
              </Route>
              <ProtectedRoute
                path="/main"
                component={Main}
                loggedIn={loggedIn}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleSubmitDeleteClick}
              />
              <Route exact path="/">
                {loggedIn ? (
                  <Redirect to="/main" />
                ) : (
                  <Redirect to="/sign-in" />
                )}
              </Route>
            </Switch>

            <Footer />

          <PopupEditProfile
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />
          <PopupAvatarEdit
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />
          <PopupSubmitDelete
            isOpen={isSubmitDeletePopupOpen}
            card={selectedCard}
            onClose={closeAllPopups}
            onSubmitDelete={handleCardDelete}
          />
          <ImagePopup
            isOpen={isImagePopupOpen}
            card={selectedCard}
            onClose={closeAllPopups}
          />
          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />
      </BrowserRouter>
    </CurrentUserContext.Provider>
  );
}

export default App;
