import FindItem from "./components/findItem";
import { useSelector, useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import { fetchDocsBySearch } from "../../redux/slices/searchSlice";
import styles from "../../styles/modules/find.module.scss";
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
    dispatch(fetchDocsBySearch());
  }, [dispatch, isClicked]);

  useEffect(() => {
    if (isMounted.current) {
      if (inView === true && currentPage <= totalPage) {
        console.log("fetching");
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
