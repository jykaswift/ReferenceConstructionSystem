import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "../../../styles/modules/doc.module.scss";
import debonce from "lodash.debounce";
import Highlighter from "./Highlighter";

const DocNav = () => {
  const marks = useRef({});
  const buttons = useRef(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const highlight = useCallback(
    debonce((word) => {
      window.scrollTo(0, 0);
      let highlighter = new Highlighter("test");
      let isFound = highlighter.apply(word);
      if (word && isFound) {
        marks.current.marks = document.getElementsByTagName("mark");

        let coordsOfMarks = [];
        for (let mark of marks.current.marks) {
          coordsOfMarks.push(mark.getBoundingClientRect().y - 100);
        }

        marks.current.coords = coordsOfMarks;
        marks.current.i = 0;

        window.scrollTo(0, marks.current.coords[0]);
        marks.current.marks[0].style.backgroundColor = "orange";

        buttons.current.style.display = "flex";
      } else buttons.current.style.display = "none";
    }, 1000),
    []
  );

  function scrollToMark(isDown) {
    if (marks.current.marks.length === 1) {
      return;
    }

    marks.current.marks[marks.current.i].style.backgroundColor = "#ff6";

    if (isDown) {
      marks.current.i += 1;
    } else {
      marks.current.i -= 1;
    }

    if (marks.current.i >= marks.current.marks.length) {
      marks.current.i = 0;
    }

    if (marks.current.i < 0) {
      marks.current.i = marks.current.marks.length - 1;
    }

    marks.current.marks[marks.current.i].style.backgroundColor = "orange";

    window.scrollTo(50, marks.current.coords[marks.current.i]);
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
