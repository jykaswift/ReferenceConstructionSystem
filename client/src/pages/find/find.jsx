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

  useEffect(() => {
    dispatch(fetchDocsBySearch());
    console.log(1);
  }, [dispatch, isClicked]);

  return (
    <div className="content">
      <div className="container">
        <div className="content__find">
          <h1 className="find-title">Поиск по запросу: {currentSearchValue}</h1>
          {status === "loading" ? (
            <div>Loading</div>
          ) : (
            items.map((obj) => {
              console.log(items);
              return <FindItem key={obj._id} name={obj._source.doc_name} />;
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default Find;
