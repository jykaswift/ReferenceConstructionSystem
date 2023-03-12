import React from "react";
import DocNav from "./components/docNav";
import styles from "../../styles/modules/doc.module.scss";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDocsById } from "../../redux/slices/docSlice";
const Doc = () => {
  const dispatch = useDispatch();
  const { content } = useSelector((state) => state.doc);
  useEffect(() => {
    dispatch(fetchDocsById());
  }, [dispatch]);

  return (
    <div className="content">
      <div className="container">
        <div className={styles.title}>Свод правил СП 251.1325800.2016</div>
        <DocNav />
        <div className={styles.content}>{content}</div>
      </div>
    </div>
  );
};

export default Doc;
