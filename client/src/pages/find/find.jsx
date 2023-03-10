import FindItem from "./components/findItem";
import { useSelector, useDispatch } from "react-redux";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef } from "react";
import { fetchDocsBySearch } from "../../redux/slices/searchSlice";

function Find() {
  const { currentSearchValue, items } = useSelector((state) => state.search);
  const isMounted = useRef(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isMounted.current) {
      console.log(1);
    } else {
      isMounted.current = true;
    }
  }, []);

  return (
    <div className="content">
      <div className="container">
        <div className="content__find">
          <h1 className="find-title">Поиск по запросу: {currentSearchValue}</h1>
          {items.map((obj) => {
            return <FindItem key={obj._id} name={obj._source.doc_name} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Find;
