import React from "react";
import DocNav from "./components/docNav";
import styles from "../../styles/modules/doc.module.scss";

const Doc = () => {
  return (
    <div className="content">
      <div className="container">
        <div className={styles.title}>Свод правил СП 251.1325800.2016</div>
        <DocNav />
        <div className={styles.content}></div>
      </div>
    </div>
  );
};

export default Doc;
