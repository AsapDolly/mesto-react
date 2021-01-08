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
    const [popupTitle, setPopupTitle] = React.useState('');
    const [name, setName] = React.useState('');
    const [children, setChildren] = React.useState(<></>);
    const [selectedCard, setSelectedCard] = React.useState({});

    const handleCardClick = (card) => {
        setSelectedCard(card);
    }

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({});
    }

    React.useEffect(() => {
        if (isEditAvatarPopupOpen) {
            setPopupTitle('Обновить аватар');
            setName('avatar-edit');
            setChildren(
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
    }, [isEditAvatarPopupOpen]);

    React.useEffect(() => {
        if (isEditProfilePopupOpen) {
            setPopupTitle('Редактировать профиль');
            setName('edit-profile');
            setChildren(
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
    }, [isEditProfilePopupOpen]);

    React.useEffect(() => {
        if (isAddPlacePopupOpen) {
            setPopupTitle('Новое место');
            setName('new-place');
            setChildren(
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
    }, [isAddPlacePopupOpen]);

    return (
        <div className="page">
            <PopupWithForm
                title={popupTitle}
                name={name}
                children={children}
                isOpen={isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen}
                onClose={closeAllPopups}
            />

            <ImagePopup
                card={selectedCard}
                onClose = {closeAllPopups}
            />

            <Header/>
            <Main
                onEditProfile={() => setIsEditProfilePopupOpen(true)}
                onAddPlace={() => setIsAddPlacePopupOpen(true)}
                onEditAvatar={() => setIsEditAvatarPopupOpen(true)}
                onCardClick = {handleCardClick}
            />
            <Footer/>
        </div>
    );
}

export default App;
