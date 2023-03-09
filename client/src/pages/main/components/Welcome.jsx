function Welcome() {
  return (
    <div className="content__welcome welcome">
      <div className="container">
        <div className="welcome__grid">
          <div className="welcome__info">
            <div className="welcome__title">
              Справочная система строительных ГОСТ-ов
            </div>
            <div className="welcome__subtitle">
              Электронная база актуальных <span>строительных ГОСТ-ов</span> с
              возможностью поиска и подбора правил
              <br /> при помощи <span>фильтров</span>
            </div>
            <a href="src/Components#" className="welcome_button">
              Перейти к фильтрам
            </a>
          </div>
          <div className="welcome__dino">
            <img src="../images/main/welcome/dino.png" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Welcome;
