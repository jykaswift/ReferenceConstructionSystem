import FindItem from "./components/findItem";
import { useSelector } from "react-redux";

function Find() {
  const { searchValue, items } = useSelector((state) => state.search);

  return (
    <div className="content">
      <div className="container">
        <div className="content__find">
          <h1 className="find-title">Поиск по запросу: {searchValue}</h1>
          {items.map((obj) => {
            return <FindItem key={obj._id} name={obj._source.doc_name} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Find;
