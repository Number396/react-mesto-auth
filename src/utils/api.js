import { apiConfig } from "./constants.js";

class Api {
    constructor({ url, headers }) {
        this._baseUrl = url;
        this._headers = headers;
        this._userUrl = `${this._baseUrl}/users/me`;
        this._cardUrl = `${this._baseUrl}/cards`;
    }

    _checkResponse(response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(
                `Ошибка HTTP: ${response.status} ${response.statusText}`
            );
        }
    }

    _request(url, options) {
        return fetch(url, options).then(this._checkResponse)
    }

    getUserInfo() {
        return this._request(this._userUrl, {
            headers: this._headers,
        })
    };

    getCards() {
        return this._request(this._cardUrl, {
            headers: this._headers,
        })
    };

    setUserInfo({ name, about }) {
        return this._request(this._userUrl, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                name,
                about,
            }),
        })
    };

    addCard({ name, link }) {
        return this._request(this._cardUrl, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name,
                link,
            }),
        })
    };

    deleteCard(cardID) {
        return this._request(`${this._cardUrl}/${cardID}`, {
            method: "DELETE",
            headers: this._headers,
        })
    };

    changeLikeCardStatus(cardID, isLiked) {
        if (isLiked) {
            return this.setLike(cardID);
        }
        else {
            return this.deleteLike(cardID);
        }
    }

    setLike(cardID) {
        return this._request(`${this._cardUrl}/${cardID}/likes`, {
            method: "PUT",
            headers: this._headers,
        })
    };

    deleteLike(cardID) {
        return this._request(`${this._cardUrl}/${cardID}/likes`, {
            method: "DELETE",
            headers: this._headers,
        })
    };

    setUserAvatar(avatar) {
        return this._request(`${this._userUrl}/avatar`, {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar,
            }),
        })
    };
};

export const api = new Api(apiConfig);