import { NavLink } from "react-router-dom";

function Passp(props) {
    console.log(props.loggedIn);

    return (
        <section className="passp">
            <h2 className="passp__title">{props.title}</h2>
            <form name={props.name} className="passp__form">
                {/* <input
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
                /> */}
                {props.children}
                <button type="submit" className="passp__submit-button">
                    {props.btnText}
                </button>
                {!props.loggedIn & props.isRegister ?
                    <p className="passp__suggestion">Уже зарегистрированы?
                        <NavLink to="/sign-in" className="register__link">Войти</NavLink></p> : ""}
            </form>
        </section>
    );
}
export default Passp;
