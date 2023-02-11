import { apiAuthConfig } from "./constants";

class Api {
    constructor({ url, headers }) {
        this._baseUrl = url;
        this._headers = headers;
        this._signupUrl = `${this._baseUrl}signup`;
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
        return fetch(url, options).then(this._checkResponse);
    };

    register(email, password) {
        console.log(email, password);
        return this._request(this._signupUrl, {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({ password, email }),
        })
    };
}

export const apiAuth = new Api(apiAuthConfig);