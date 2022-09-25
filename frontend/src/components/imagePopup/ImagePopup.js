function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_preview ${card && "popup_opened"}`}
      id="popup-preview"
    >
      <div className="popup__photo-preview">
        <button
          className="popup__close-button"
          type="button"
          onClick={onClose}
        /> 
        {/* optional chaining */}
        <img src={card?.link} alt="Foto" className="popup__photo-preview-img" />
        <h2 className="popup__photo-preview-title">{card?.name}</h2>
      </div>
    </div>
  )
}

export default ImagePopup;
