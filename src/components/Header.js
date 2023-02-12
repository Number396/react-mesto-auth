import { NavLink } from "react-router-dom";

function Header({ isLoggedIn }) {

    return (
        <header className="header">
            <div className="header__logo"></div>
            <p className="header__login">
                {isLoggedIn ? (
                    <NavLink to="/signin" className="register__link">
                        Выход
                    </NavLink>
                ) : (
                    <NavLink to="/signup" className="register__link">
                        Регистрация
                    </NavLink>
                )}
            </p>
        </header>
    );
}
export default Header;
