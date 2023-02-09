function Register() {
    return (
        <section className="register">
            <h2 className="register__title">Регистрация</h2>
            <form className="register__form">
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    required
                    className="register__input"
                />
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Пароль"
                    required
                    className="register__input"
                />
                <button type="submit" className="register__submit-button">
                    Зарегистрироваться
                </button>
                <p className="register__suggestion">Уже зарегистрированы? Войти</p>
            </form>
        </section>
    );
}
export default Register;
