import { NavLink, Route, Routes, useLocation } from "react-router-dom";

function Header({ onLoginClick, userData }) {
    // const location = useLocation();

    return (
        <header className="header">
            <div className="header__logo"></div>
            <Routes>
                <Route path="/" element={
                    <div className="header__login">
                        <p className="header__login_type_email">{userData.email}</p><button
                            type="button"
                            onClick={onLoginClick}
                            className="header__login_type_entry">
                            Выход
                        </button>
                    </div>

                } />

                <Route path="/signin" element={
                    <NavLink to="/signup" className="register__link">
                        Регистрация
                    </NavLink>
                } />

                <Route path={"/signup"} element={
                    <NavLink to="/signin" className="register__link">
                        Войти
                    </NavLink>
                } />

            </Routes>
        </header >
    );
}
export default Header;

//так было у меня до ревью
{/* <div className="header__login">
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
                </div> */}