import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isEditAvatarPopupOpen, closeAllPopups, onUpdateAvatar}) {

    const avatarUrl = React.useRef();

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar(avatarUrl.current.value);
        avatarUrl.current.value = '';
    }

    return (
        <PopupWithForm
            title='Обновить аватар'
            name='avatar-edit'
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onSubmit={handleSubmit}>

            <label className="popup__field">
                <input className="popup__input popup__input-text_type_link"
                       ref={avatarUrl}
                       id="avatar-url-input"
                       name="link"
                       placeholder="Ссылка на изображение"
                       type="url"
                       required
                />
                <span className='popup__error' id='avatar-url-input-error'/>

            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;