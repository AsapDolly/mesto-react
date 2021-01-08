import React from 'react';

function ImagePopup({ card, onClose }) {

    return (
        <div className={`popup popup_image ${card.hasOwnProperty('link') && 'popup_opened'}`}>
            <div className='popup__content'>
                <button className="popup__close popup__close_image popup__close_mobile-position_in-corner"
                        type="button" onClick={onClose}/>
                <img className="popup__img" src={card.link} alt={card.name}/>
                    <p className="popup__caption">{card.name}</p>
            </div>
            <div className="popup__overlay"/>
        </div>

    );
}

export default ImagePopup;