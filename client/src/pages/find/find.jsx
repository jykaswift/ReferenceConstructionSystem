import FindItem from "./components/findItem";
import { useSelector, useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import {
  fetchDocsBySearch,
  setSearchParamsByURL,
} from "../../redux/slices/searchSlice";
import styles from "../../styles/modules/find.module.scss";
import qs from "qs";
function Find() {
  const {
    currentSearchValue,
    items,
    isClicked,
    isLoading,
    totalPage,
    currentPage,
    status,
  } = useSelector((state) => state.search);

  const dispatch = useDispatch();
  const { ref, inView } = useInView({
    threshold: 0.1,
  });
  const isMounted = useRef(false);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      dispatch(setSearchParamsByURL(params.query));
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchDocsBySearch());
  }, [dispatch, isClicked]);

  useEffect(() => {
    if (isMounted.current) {
      if (inView === true && currentPage <= totalPage) {
        dispatch(fetchDocsBySearch());
      }
    } else {
      isMounted.current = true;
    }
  }, [dispatch, inView, totalPage]);

  const notFound = () => (
    <div className={styles.notFound}>
      По вашему запросу ничего не найдено, попробуйте изменить критерии поиска
    </div>
  );

  const findItems = () => (
    <>
      {items.map((obj) => {
        return <FindItem key={obj.id} name={obj.doc_name} id={obj.id} />;
      })}
      <div ref={ref}></div>
      {status === "loading" ? <div className={styles.loader}></div> : <></>}
    </>
  );

  return (
    <div className="content">
      <div className="container">
        <div className="content__find">
          <h1 className="find-title">Поиск по запросу: {currentSearchValue}</h1>
          {isLoading ? (
            <div className={styles.loader}></div>
          ) : (
            <>{items.length === 0 ? notFound() : findItems()}</>
          )}
        </div>
      </div>
    </div>
  );
}

export default Find;
