import SearchInput from "./searchInput";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="header">
      <div className="container">
        <div className="header__row">
          <div className="header__burger">
            <span></span>
          </div>
          <SearchInput />
          <div className="header__buttons">
            <a href="#" className="header__register">
              Регистрация
            </a>
            <a href="#" className="header__auth">
              Войти
            </a>
          </div>
          <div className="header__authed authed">
            <div className="authed__profile">
              <Link to={"/"} href="#" className="authed__image">
                <img src="../images/main/header/authed-profile.png" alt="" />
              </Link>
              <div className="authed__info">
                <div className="authed__name">Мохирева Арина Олеговна</div>
                <div className="authed__mail">mohireva.ao@edu.spbstu.ru</div>
              </div>
            </div>

            <a href="#" className="authed__exit">
              <img src="../images/main/header/exit.png" alt="" />
            </a>
          </div>
          <a href="#" className="header__profile">
            <img
              src="../images/main/header/profile.png"
              alt=""
              className="profile__icon"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Header;
