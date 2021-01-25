import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddNewPlacePopup from "./AddNewPlacePopup";
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import api from '../utils/api';

function App() {
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
    const [selectedCard, setSelectedCard] = React.useState({});
    const [cards, setCards] = React.useState([]);
    const [currentUser, setCurrentUser] = React.useState({});

    React.useEffect(() => {
        api.getInitialCards()
            .then(result => setCards(result))
            .catch((error) => {
                console.log(error);
            });
    }, []);

    React.useEffect(() => {
        api.getUserInformation()
            .then((res) => {
                setCurrentUser(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
    const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
    const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);
    const handleCardClick = (card) => setSelectedCard(card);

    const closeAllPopups = () => {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({});
    }

    function handleUpdateUser(data) {
        api.updateUserInfo(data)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleUpdateAvatar(url) {
        api.updateUserAvatar(url)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i._id === currentUser._id);

        api.setCardLike(card._id, isLiked)
            .then((newCard) => {
                const newCards = cards.map((c) => c._id === card._id ? newCard : c);
                setCards(newCards);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleCardDelete(cardId) {
        api.removeCard(cardId)
            .then(() => {
                const newCards = cards.filter((c) => c._id !== cardId);
                setCards(newCards);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function handleAddNewPlace(data) {
        api.addNewCard(data)
            .then((res) => {
                setCards([res, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="page">

                <EditAvatarPopup
                    isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                    closeAllPopups={closeAllPopups}
                    onUpdateAvatar={handleUpdateAvatar}
                />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onUpdateUser={handleUpdateUser}
                />

                <AddNewPlacePopup
                    isAddPlacePopupOpen={isAddPlacePopupOpen}
                    closeAllPopups={closeAllPopups}
                    onAddNewPlace={handleAddNewPlace}
                />

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
                    cards={cards}
                    handleCardLike={handleCardLike}
                    handleCardDelete={handleCardDelete}
                />
                <Footer/>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
