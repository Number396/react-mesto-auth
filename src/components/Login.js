import Passp from "./Passp";

function Login(props) {
    return (
        <Passp
            title="Вход"
            name="login"
            btnText="Войти"
            loggedIn={props.loggedIn}
        >
            <input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                required
                className="passp__input"
            />
            <input
                type="password"
                name="password"
                id="password"
                placeholder="Пароль"
                required
                className="passp__input"
            />
        </Passp>
    );

}

export default Login;