import { Link, NavLink } from "react-router-dom";
import Passp from "./Passp";


function Register() {
    return (
        <Passp
            title="Регистрация"
            name="registration"
            btnText="Зарегистрироваться"
        >
            <p className="passp__suggestion">Уже зарегистрированы?
                <NavLink to="/sign-in" className="register__link">Войти</NavLink></p>
        </Passp>

    );
}
export default Register;
