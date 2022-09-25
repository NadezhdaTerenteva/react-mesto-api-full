import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login({ onLogin }) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (!loginData.email || !loginData.password) {
      return;
    }

    onLogin(loginData).catch((err) =>
      setMessage(err.message || "Что-то пошло не так")
    );
  };

  return (
    <div className="login">
      <h3 className="login__header">Вход</h3>
      <form onSubmit={handleSubmit} className="login__form">
        <input
          className="login__input"
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={loginData.email}
          required
          onChange={handleChange}
        ></input>
        <input
          className="login__input"
          type="password"
          id="password"
          name="password"
          placeholder="Пароль"
          value={loginData.password}
          required
          onChange={handleChange}
        ></input>
        <button className="login__submit-button" type="submit">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
