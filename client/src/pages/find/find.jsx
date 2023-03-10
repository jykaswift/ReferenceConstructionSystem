import FindItem from "./components/findItem";
import { useSelector, useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import { fetchDocsBySearch } from "../../redux/slices/searchSlice";

function Find() {
  const { currentSearchValue, items, status, isClicked } = useSelector(
    (state) => state.search
  );
  const dispatch = useDispatch();

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  const isMounted = useRef(false);

  useEffect(() => {
    dispatch(fetchDocsBySearch());
  }, [dispatch, isClicked]);

  console.log(inView);

  useEffect(() => {
    if (isMounted.current) {
      if (inView === true) {
        dispatch(fetchDocsBySearch());
        console.log("fetching");
      }
    } else {
      isMounted.current = true;
    }
  }, [inView]);

  return (
    <div className="content">
      <div className="container">
        <div className="content__find">
          <h1 className="find-title">Поиск по запросу: {currentSearchValue}</h1>
          {status === "loading" ? (
            <div>Loading</div>
          ) : (
            items.map((obj) => {
              return <FindItem key={obj._id} name={obj._source.doc_name} />;
            })
          )}
          {items.length === 0 ? <div></div> : <div ref={ref}></div>}
        </div>
      </div>
    </div>
  );
}

export default Find;
