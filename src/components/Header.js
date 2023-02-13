import { NavLink, useLocation } from "react-router-dom";

function Header({ isLoggedIn, onLoginClick, userData }) {
    const location = useLocation();

    return (
        <header className="header">
            <div className="header__logo"></div>
            <div className="header__login">
                {isLoggedIn && <p
                    className="header__login_type_email">{userData.email}</p>
                }

                {(location.pathname === '/signin' && !isLoggedIn) && (
                    <NavLink to="/signup" className="register__link">
                        Регистрация
                    </NavLink>
                )}
                {(location.pathname === '/signup' && !isLoggedIn) && (
                    <NavLink to="/signin" className="register__link">
                        Войти
                    </NavLink>
                )}
                {isLoggedIn && <button
                    type="button"
                    onClick={onLoginClick}
                    className="header__login_type_entry">
                    Выход
                </button>
                }
            </div>
        </header >
    );
}
export default Header;
