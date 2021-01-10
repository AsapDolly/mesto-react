import React from 'react';

function Card({ name, link, likes, onCardClick }){

    function handleClick() {
        onCardClick({name, link});
    }

    return(
        <div className="element">
            <button className="element__trash" type="button"/>
            <div className="element__image-area">
                <img className="element__image" alt={name} src={link} onClick={handleClick}/>
            </div>
            <div className="element__row">
                <p className="element__caption">{name}</p>
                <div className="element__like-group">
                    <button className="element__like" type="button"/>
                    <p className="element__like-count">{likes.length}</p>
                </div>
            </div>
        </div>
    );
}

export default Card;