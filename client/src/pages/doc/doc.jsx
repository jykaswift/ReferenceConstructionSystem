import React from "react";
import DocNav from "./components/docNav";
import styles from "../../styles/modules/doc.module.scss";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDocsById, setDocId } from "../../redux/slices/docSlice";
import qs from "qs";

const Doc = () => {
  const dispatch = useDispatch();
  const { content } = useSelector((state) => state.doc);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setDocId(params.id));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDocsById());
  }, [dispatch]);

  return (
    <div className="content">
      <div className="container">
        <div className={styles.title}>Свод правил СП 251.1325800.2016</div>
        <DocNav />

        <div id="test" className={styles.content}>
          <div dangerouslySetInnerHTML={{ __html: content }} />;
        </div>
      </div>
    </div>
  );
};

export default Doc;
