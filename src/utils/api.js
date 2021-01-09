class Api {
    constructor(config) {
        this._baseUrl = config.baseUrl;
        this._headers = config.headers;
    }

    _checkResult(res) {
        if (res.ok) {
            return res.json();
        }

        return Promise.reject(`Произошла ошибка: ${res.status}`);
    }

    getUserInformation() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: "GET",
            headers: this._headers
        })
            .then((res) => this._checkResult(res))
            .catch(err => console.log(`Загрузка информации о пользователе: ${err}`));
    }

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, {
            method: "GET",
            headers: this._headers
        })
            .then((res) => this._checkResult(res))
            .catch(err => console.log(`Загрузка начального набора карточек: ${err}`));
    }

    updateUserInfo({name, about}) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                about: about
            })
        })
            .then((res) => this._checkResult(res))
            .catch(err => console.log(`Обновить информацию о пользователе: ${err}`));
    }

    addNewCard({name, link}) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: name,
                link: link
            })
        })
            .then((res) => this._checkResult(res))
            .catch(err => console.log(`Добавление новой карточки: ${err}`));
    }

    removeCard(cardId){
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._headers
        })
            .then((res) => this._checkResult(res))
            .catch(err => console.log(`Удаление карточки: ${err}`));
    }

    setCardLike(cardId, isLiked){
        return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
            method: isLiked ? 'DELETE' : 'PUT',
            headers: this._headers
        })
            .then((res) => this._checkResult(res))
            .catch(err => console.log(`Нажатие на лайк карточки: ${err}`));
    }

    updateUserAvatar(url){
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: url
            })
        })
            .then((res) => this._checkResult(res))
            .catch(err => console.log(`Обновление аватара пользователя: ${err}`));
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-18',
    headers: {
        authorization: 'e47080a8-ad11-43f8-864b-82573b975e89',
        'Content-Type': 'application/json'
}});

export default api;
