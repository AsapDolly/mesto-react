import React from 'react';
import editButtonImage from '../images/edit-button.svg';
import addButtonImage from '../images/add-button.svg';
import api from '../utils/api.js';
import Card from './Card';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, handleCardLike, handleCardDelete}) {

    const currentUser = React.useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">

                <div className="profile__userinfo">
                    <div className="profile__avatar-overlay" onClick={onEditAvatar}/>
                    <div className="profile__avatar"
                         style={{backgroundImage: `url(${currentUser.avatar})`}}
                    />

                    <div className="profile__user-description">
                        <div className="profile__username-edit">
                            <h1 className="profile__username">{currentUser.name}</h1>
                            <button className="profile__edit-button" type="button" onClick={onEditProfile}>
                                <img alt="редактировать" src={editButtonImage}/>
                            </button>
                        </div>
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                </div>

                <button className="profile__add-button" type="button" onClick={onAddPlace}>
                    <img alt="добавить" src={addButtonImage}/>
                </button>
            </section>

            <section className="elements">
                {cards.map((props) => (
                    <Card
                        key={props._id}
                        {...props}
                        onCardClick={onCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                    />)
                )}
            </section>

        </main>
    );
}

export default Main;
