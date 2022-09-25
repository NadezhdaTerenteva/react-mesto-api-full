import React, { useState } from "react";
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [registerData, setRegisterData] = useState({
    password: "",
    email: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (evt) => {
    setMessage("");
    const { name, value } = evt.target;
    setRegisterData({
      ...registerData,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();

    onRegister(registerData).catch((err) =>
      setMessage(err.message || "Что-то пошло не так")
    );
  };

  return (
    <div className="register">
      <h3 className="register__header">Регистрация</h3>
      <form onSubmit={handleSubmit} className="register__form">
        <input
          className="register__input"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={registerData.email || ""}
          required
          onChange={handleChange}
        ></input>
        <input
          className="register__input"
          type="password"
          id="password"
          name="password"
          autoComplete="current-password"
          placeholder="Пароль"
          value={registerData.password || ""}
          minLength="6" maxLength="6"
          required
          onChange={handleChange}
        ></input>
        <button className="register__submit-button" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <h4 className="register__caption">
        Уже зарегистрированы?
        <Link to="/sign-in" className="egister__caption register__caption-link">
          {" "}
          Войти
        </Link>
      </h4>
    </div>
  );
}

export default Register;
