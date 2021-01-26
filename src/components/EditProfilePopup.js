import React from 'react';
import PopupWithForm from "./PopupWithForm";
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const currentUser = React.useContext(CurrentUserContext);
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
    }

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]);

    return (
        <PopupWithForm
            title='Редактировать профиль'
            name='edit-profile'
            isOpen={isOpen}
            buttonText='Сохранить'
            onClose={onClose}
            onSubmit={handleSubmit}
        >
            <label className="popup__field">
                <input className="popup__input popup__input-text_type_username"
                       id="username-input"
                       name="username"
                       type="text"
                       required
                       minLength="2"
                       maxLength="40"
                       placeholder="Имя"
                       value={name}
                       onChange={handleNameChange}
                />
                <span className='popup__error' id='username-input-error'/>
            </label>

            <label className="popup__field">
                <input className="popup__input popup__input-text_type_description"
                       id="description-input"
                       name="description"
                       type="text"
                       required
                       minLength="2"
                       maxLength="200"
                       placeholder="Занятие"
                       value={description}
                       onChange={handleDescriptionChange}
                />
                <span className='popup__error' id='description-input-error'/>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;