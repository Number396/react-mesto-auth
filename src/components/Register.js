import { Link, NavLink } from "react-router-dom";
import Passp from "./Passp";


function Register(props) {
    return (
        <Passp
            title="Регистрация"
            name="registration"
            btnText="Зарегистрироваться"
            loggedIn={props.loggedIn}
            isRegister={true}
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
            {/* <p className="passp__suggestion">Уже зарегистрированы? <NavLink to="/sign-in" className="register__link">Войти</NavLink></p> */}
        </Passp>

    );
}
export default Register;
