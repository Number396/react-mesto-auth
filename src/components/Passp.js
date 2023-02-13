import { NavLink } from "react-router-dom";

function Passp(props) {

    return (
        <section className="passp">
            <h2 className="passp__title">{props.title}</h2>
            <form name={props.name}
                className="passp__form"
                onSubmit={props.onSubmit}
            >
                {props.children}
                <button type="submit" className="passp__submit-button">
                    {props.btnText}
                </button>
                {!props.loggedIn & props.isRegister ?
                    <p className="passp__suggestion">Уже зарегистрированы?
                        <NavLink
                            to="/sign-in"
                            className="register__link">Войти
                        </NavLink>
                    </p> : ""
                }
            </form>
        </section>
    );
}
export default Passp;
