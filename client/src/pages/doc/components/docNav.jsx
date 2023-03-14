import React, { useCallback, useRef, useState } from "react";
import styles from "../../../styles/modules/doc.module.scss";
import debonce from "lodash.debounce";
import Highlighter from "./Highlighter";

const DocNav = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [coords, setCoords] = useState([]);
  const buttons = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const highlight = useCallback(
    debonce((word) => {
      let highlighter = new Highlighter("test");
      highlighter.apply(word);
      if (word) {
        let marksElements = document.getElementsByTagName("mark");
        let yOfMarks = [];
        for (let mark of marksElements) {
          yOfMarks.push(mark.getBoundingClientRect().y - 80);
        }

        setCoords(yOfMarks);

        window.scrollTo(0, marksElements[0].getBoundingClientRect().y - 80);

        buttons.current.style.display = "flex";
      } else buttons.current.style.display = "none";
    }, 1000),
    []
  );

  function scrollToMark(isDown) {
    window.scrollTo(0, coords[currentIndex]);

    if (currentIndex >= coords.length - 1) {
      setCurrentIndex(0);
      return;
    }

    if (isDown) {
      setCurrentIndex(currentIndex + 1);
    }

    if (!isDown && currentIndex != 0) {
    }
  }

  return (
    <div className={styles.nav}>
      <div className={styles.navigation}>
        <a href="" className={styles.icon}>
          <img src="../images/doc/favorite.png" alt="" />
        </a>
        <a href="" className={styles.icon}>
          <img src="../images/doc/bookmark.png" alt="" />
        </a>
        <div className={styles.input_bar}>
          <input
            type="text"
            placeholder="Поиск по документу"
            className={styles.search}
            onChange={(event) => highlight(event.target.value)}
          />
          <div ref={buttons} className={styles.search_buttons}>
            <img
              onClick={() => scrollToMark(true)}
              src="../images/doc/up.png"
              alt=""
            />
            <img
              onClick={() => scrollToMark(false)}
              src="../images/doc/up.png"
              alt=""
            />
          </div>
        </div>

        <a href="" className={styles.icon}>
          <img src="../images/doc/send.png" alt="" />
        </a>
        <a href="" className={styles.icon}>
          <img src="../images/doc/save.png" alt="" />
        </a>
        <a href="" className={styles.icon}>
          <img src="../images/doc/add.png" alt="" />
        </a>
      </div>
      <div className={styles.bottom}></div>
    </div>
  );
};

export default DocNav;
