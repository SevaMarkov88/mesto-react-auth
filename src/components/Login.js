import React from "react";

function Login(props) {
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");

  React.useEffect(() => {
    setUserName("");
    setPassword("");
  }, []);

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
    }

  return (
    <div className="popup__main-container">
      <form className="popup__form" onSubmit={handleSubmit}>
        <input
          type="email"
          id="input-name"
          className="popup__text"
          placeholder="email"
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
          type="password"
          id="input-job"
          className="popup__text"
          placeholder="password"
          minLength="2"
          maxLength="200"
          required
          autoComplete="off"
          name="job"
          value={password || ""}
          onChange={handlePasswordChange}
        />
        <button
          className="popup__button"
          type="submit"
          aria-label="Войти"
        >Войти</button>
      </form>
    </div>
  );
}

export default Login;