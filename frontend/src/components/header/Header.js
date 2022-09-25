import { Route, Link, Switch } from "react-router-dom";
import Logo from "../../images/logo.svg";

function Header({ isLoggedIn, onLogout, user }) {
  return (
    <Switch>
      isLoggedIn ? (
      <Route exact path="/">
        <header className="header">
          <img src={Logo} alt="Лого" className="header__logo" />
          <p className="header__user-email">{user}</p>
          <Link
            to="/sign-in"
            onClick={onLogout}
            className="header__button header__button_logout"
          >
            Выйти
          </Link>
        </header>
      </Route>
      ) : (
      <Route path="/sign-up">
        <header className="header">
          <img src={Logo} alt="Лого" className="header__logo" />
          <Link to="/sign-in" className="header__button">
            Войти
          </Link>
        </header>
      </Route>
      <Route path="/sign-in">
        <header className="header">
          <img src={Logo} alt="Лого" className="header__logo" />
          <Link to="/sign-up" className="header__button">
            Регистрация
          </Link>
        </header>
      </Route>
      )
    </Switch>
  );
}

export default Header;
