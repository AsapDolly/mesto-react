import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ _id, name, link, likes, owner, onCardClick, onCardLike, onCardDelete }){

    const currentUser = React.useContext(CurrentUserContext);
    const isOwn = owner._id === currentUser._id;
    const isLiked = likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `element__like ${isLiked && 'element__like_active'}`;

    function handleClick() {
        onCardClick({name, link});
    }

    function handleLikeClick(){
        onCardLike({ _id, likes });
    }

    function handleDeleteClick(){
        onCardDelete(_id);
    }

    return(
        <div className="element">
            {isOwn && (<button className="element__trash" onClick={handleDeleteClick} type="button"/>)}
            <div className="element__image-area">
                <img className="element__image" alt={name} src={link} onClick={handleClick}/>
            </div>
            <div className="element__row">
                <p className="element__caption">{name}</p>
                <div className="element__like-group">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"/>
                    <p className="element__like-count">{likes.length}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;