import { useLocation } from "react-router-dom";

function Header({ isLoggedIn, onLoginClick }) {
    const location = useLocation();
    console.log(location.pathname);

    return (
        <header className="header">
            <div className="header__logo"></div>
            <button
                type="button"
                onClick={onLoginClick}
                className="header__login">
                Выход
            </button>
        </header>
    );
}
export default Header;

// {isLoggedIn ? (
//     <NavLink to="/signin" className="register__link">
//         Выход
//     </NavLink>
// ) : (
//     <NavLink to="/signup" className="register__link">
//         Регистрация
//     </NavLink>
// )}