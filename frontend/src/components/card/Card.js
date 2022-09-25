import React from 'react'; 

import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';


function Card({card, onCardClick, onCardLike, onCardDelete}) {

  const { owner, name, link, likes } = card;

  const currentUser = React.useContext(CurrentUserContext);

  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = owner._id === currentUser._id;

// Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
  `${isOwn ? 'photo-grid__remove-button' : 'photo-grid__remove-button_hidden'}`); 
  
  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = likes.some(i => i._id === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `${isLiked ? 'photo-grid__item-like-icon photo-grid__item-like-icon_active' : 'photo-grid__item-like-icon'}`); 


  function handleClick() {
    onCardClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleDeleteClick() {
    onCardDelete(card);
  }

  return (
    <li className="photo-grid__item">
      <button 
      type="button" 
      className={cardDeleteButtonClassName}
      onClick={handleDeleteClick}
      >
      </button>
      <img
        src={link}
        alt={name}
        className="photo-grid__item-img"
        onClick={handleClick}
      />
      <div className="photo-grid__item-title">
        <h2 className="photo-grid__item-name">{name}</h2>
        <div className="photo-grid__item-likes-container">
          <button 
          type="button" 
          className={cardLikeButtonClassName}
          onClick={handleLikeClick}
          >
          </button>
          <h4 className="photo-grid__item-like-counter">{likes.length}</h4>
        </div>
      </div>
    </li>
  );
}

export default Card;
