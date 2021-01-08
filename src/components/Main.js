import React from 'react';
import editButtonImage from '../images/edit-button.svg';
import addButtonImage from '../images/add-button.svg';
import api from '../utils/api.js';
import Card from './Card';

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick}) {
    const [userName, setUserName] = React.useState('');
    const [userDescription, setUserDescription] = React.useState('');
    const [userAvatar, setUserAvatar] = React.useState('');
    const [cards, setCards] = React.useState([]);

    React.useEffect(() => {
        api.getUserInformation()
            .then((res) => {
                setUserName(res.name);
                setUserDescription(res.about);
                setUserAvatar(res.avatar);
            })
            .then(()=>{
                api.getInitialCards()
                    .then((result) => {
                        setCards(result);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <main className="content">
                <section className="profile">

                    <div className="profile__userinfo">
                        <div className="profile__avatar-overlay" onClick={onEditAvatar}/>
                        <div className="profile__avatar"
                             style={{backgroundImage: `url(${userAvatar})`}}
                        />

                        <div className="profile__user-description">
                            <div className="profile__username-edit">
                                <h1 className="profile__username">{userName}</h1>
                                <button className="profile__edit-button" type="button" onClick={onEditProfile}>
                                    <img alt="редактировать" src={editButtonImage}/>
                                </button>
                            </div>
                            <p className="profile__description">{userDescription}</p>
                        </div>
                    </div>

                    <button className="profile__add-button" type="button" onClick={onAddPlace}>
                        <img alt="добавить" src={addButtonImage}/>
                    </button>
                </section>

                <section className="elements">
                    {cards.map(({_id, ...props}) => <Card key={_id} { ...props } onCardClick = {onCardClick}/>)}
                </section>

            </main>
        </>
    );
}

export default Main;
