import React from 'react';
import Header from './Header';
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from './PopupWithForm';
import ImagePopup from "./ImagePopup";

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});

    const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
    const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
    const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
    const handleCardClick = (card) => setSelectedCard(card);
    let popupTitle = '';
    let name = '';
    let children = '';

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({});
    }

    if (isEditAvatarPopupOpen) {
        popupTitle = 'Обновить аватар';
        name = 'avatar-edit';
        children = (
            <label className="popup__field">
                <input className="popup__input popup__input-text_type_link"
                       id="avatar-url-input"
                       name="link"
                       placeholder="Ссылка на изображение"
                       type="url"
                       required
                />
                <span className='popup__error' id='avatar-url-input-error'/>
            </label>
        );
    }

    if (isEditProfilePopupOpen) {
        popupTitle = 'Редактировать профиль';
        name = 'edit-profile';
        children = (
            <>
                <label className="popup__field">
                    <input className="popup__input popup__input-text_type_username"
                           id="username-input"
                           name="username"
                           type="text"
                           required
                           minLength="2"
                           maxLength="40"
                           placeholder="Имя"
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
                    />
                    <span className='popup__error' id='description-input-error'/>
                </label>
            </>
        );
    }

    if (isAddPlacePopupOpen) {
        popupTitle = 'Новое место';
        name = 'new-place';
        children = (
            <>
                <label className="popup__field">
                    <input className="popup__input popup__input-text_type_name"
                           id="placename-input"
                           name="name"
                           placeholder="Название"
                           type="text"
                           required
                           minLength="2"
                           maxLength="40"
                    />
                    <span className='popup__error' id='placename-input-error'/>
                </label>

                <label className="popup__field">
                    <input className="popup__input popup__input-text_type_link"
                           id="url-input"
                           name="link"
                           placeholder="Ссылка на картинку"
                           type="url"
                           required
                    />
                    <span className='popup__error' id='url-input-error'/>
                </label>
            </>
        );
    }

    return (
        <div className="page">
            <PopupWithForm
                title={popupTitle}
                name={name}
                isOpen={isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen}
                onClose={closeAllPopups}
            >
                {children}
            </PopupWithForm>

            <ImagePopup
                card={selectedCard}
                onClose={closeAllPopups}
            />

            <Header/>
            <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
            />
            <Footer/>
        </div>
    );
}

export default App;
