import React from "react";
import { useState, useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

import PopupWithForm from "../popupWithForm/PopupWithForm.js";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = useState("");

  const [description, setDescription] = useState("");

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="profile"
      button="Сохранить"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        value={name || ""}
        onChange={handleNameChange}
        type="text"
        name="name"
        className="popup__input"
        id="name"
        required
        minLength={2}
        maxLength={40}
      />
      <span id="name-error" />
      <input
        value={description || ""}
        onChange={handleDescriptionChange}
        type="text"
        name="about"
        className="popup__input"
        id="about"
        required
        minLength={2}
        maxLength={200}
      />
      <span id="about-error" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
