import React from "react";
import { withRouter } from "react-router-dom";
import {auth} from '../utils/auth';
import PopupWithForm from "./PopupWithForm";

function Login(props) {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    setUserName("");
    setPassword("");
  }, [props.isOpen]);

  function handleUserNameChange(e) {
    setUserName(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
      e.preventDefault();
      if (!userName || !password) {
          return;
      }
      auth.authorize(userName, password)
        .then((data) => {
            if (data.jwt) {
            setUserName(userName);
            setPassword(password);
            props.handleLogin();
            props.history.push('/')
            }
        })
        .catch((err) => console.log(err));
  }

  return (
    <PopupWithForm
      name="login"
      title="Редактировать профиль"
      btn="Сохранить"
      formName="edit"
      isOpen={props.isOpen && "popup_opened"}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="input-name"
        className="popup__text popup__text_input-type_name"
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        required
        autoFocus
        autoComplete="off"
        name="name"
        value={userName || ""}
        onChange={handleUserNameChange}
      />
      <input
        type="text"
        id="input-job"
        className="popup__text popup__text_input-type_job"
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        required
        autoComplete="off"
        name="job"
        value={password || ""}
        onChange={handlePasswordChange}
      />
    </PopupWithForm>
  );
}

export default withRouter(Login);