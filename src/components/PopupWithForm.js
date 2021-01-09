import React from 'react';

function PopupWithForm({ children, title, name, isOpen, onClose }) {
    return (
        <div className={`popup popup_${name} ${isOpen ? 'popup_opened' : ''}`}>
            <form className={`popup__form popup__form_${name}`} name={`${name}-form`} noValidate>
                <button className={`popup__close popup__close_${name} popup__close_mobile-position_in-corner`}
                        type="button" onClick={onClose}/>
                <h2 className="popup__title">{title}</h2>
                <div className="popup__input-list">
                    {children}
                </div>
                <button className="popup__create-button popup__button" type="submit">Ok</button>
            </form>
            <div className="popup__overlay"/>
        </div>
    );
}

export default PopupWithForm;