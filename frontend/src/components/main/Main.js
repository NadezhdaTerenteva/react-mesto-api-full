import React from "react";

import { CurrentUserContext } from "../../contexts/CurrentUserContext.js";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <div onClick={onEditAvatar} className="profile__avatar-cover">
          <img
            src={currentUser.avatar}
            alt="Имя пользователя"
            className="profile__avatar"
            name="avatar"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__title" name="name">
            {currentUser.name}
          </h1>
          <p className="profile__subtitle" name="about">
            {currentUser.about}
          </p>
          <button
            onClick={onEditProfile}
            aria-label="Редактировать"
            type="button"
            className="profile__edit-button"
          />
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          className="profile__add-button"
        />
      </section>
      <section className="photo-grid">
        <ul className="photo-grid__items">{cards}</ul>
      </section>
    </main>
  );
}

export default Main;
