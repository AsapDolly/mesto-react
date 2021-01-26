import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddNewPlacePopup({isAddPlacePopupOpen, closeAllPopups, onAddNewPlace}){

    const [placeName, setPlaceName] = React.useState('');
    const [url, setUrl] = React.useState('');

    function handlePlaceNameChange(e) {
        setPlaceName(e.target.value);
    }

    function handleUrlChange(e) {
        setUrl(e.target.value);
    }

    function handleAddPlaceSubmit(e) {
        e.preventDefault();
        onAddNewPlace({
            name:placeName,
            link:url
        });
    }

    return(
        <PopupWithForm
            title='Новое место'
            name='new-place'
            isOpen={isAddPlacePopupOpen}
            buttonText='Создать'
            onClose={closeAllPopups}
            onSubmit={handleAddPlaceSubmit}
        >
            <label className="popup__field">
                <input className="popup__input popup__input-text_type_name"
                       id="placename-input"
                       name="name"
                       placeholder="Название"
                       type="text"
                       minLength="2"
                       maxLength="40"
                       value={placeName}
                       onChange={handlePlaceNameChange}
                       required
                />
                <span className='popup__error' id='placename-input-error'/>
            </label>

            <label className="popup__field">
                <input className="popup__input popup__input-text_type_link"
                       id="url-input"
                       name="link"
                       placeholder="Ссылка на картинку"
                       type="url"
                       value={url}
                       onChange={handleUrlChange}
                       required
                />
                <span className='popup__error' id='url-input-error'/>
            </label>
        </PopupWithForm>
)
}

export default AddNewPlacePopup;