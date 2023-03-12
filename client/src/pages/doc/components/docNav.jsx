import React from "react";
import styles from "../../../styles/modules/doc.module.scss";

const DocNav = () => {
  return (
    <div className={styles.nav}>
      <a href="" className={styles.icon}>
        <img src="../images/doc/favorite.png" alt="" />
      </a>
      <a href="" className={styles.icon}>
        <img src="../images/doc/bookmark.png" alt="" />
      </a>
      <input
        type="text"
        placeholder="Поиск по документу"
        className={styles.search}
      />
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
  );
};

export default DocNav;
