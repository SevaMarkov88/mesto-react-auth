import React from "react";

import successSignUpImg from "../images/sign-up/success-sign-up.svg";
import notSuccessSignUpImg from "../images/sign-up/not-success-sign-up.svg";

function InfoTooltip(props) {
  return (
    <div className="popup">
      <div className="popup__main-container">
        <button
          className="popup__close"
          type="button"
          aria-label="Закрыть окно"
          onClick={props.onClose}
        />
        <img
          className="popup__icon"
          src={props.isSuccess ? successSignUpImg : notSuccessSignUpImg}
          alt={
            props.isSuccess
              ? "иконка успешной регистрации"
              : "иконка не успешной регистрации"
          }
        />
        <h3 className="popup__title">
          {props.isSuccess
            ? "Вы успешно зарегистрировались!"
            : "Что-то пошло не так! Пропробуйте ещё раз."}
        </h3>
      </div>
    </div>
  );
}

export default InfoTooltip;
