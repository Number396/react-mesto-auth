import React, { useState } from "react";
import AuthPage from "./AuthPage";


function Login({ loggedIn, handleLogin }) {
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        handleLogin(userData);
    }

    return (
        <AuthPage
            title="Вход"
            name="login"
            btnText="Войти"
            loggedIn={loggedIn}
            onSubmit={handleSubmit}
        >
            <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="authpage__input"
                required
                minLength="2"
                maxLength="40"
                onChange={handleChange}
                value={userData.email || ''}
            />
            <input
                type="password"
                name="password"
                id="password"
                placeholder="Пароль"
                className="authpage__input"
                required
                minLength="2"
                maxLength="40"
                onChange={handleChange}
                value={userData.password || ''}
            />
        </AuthPage>
    );

}

export default Login;