import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  fetchDocsBySearch,
  setSearchParams,
} from "../redux/slices/searchSlice";

import { useState } from "react";

function SearchInput() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
      navigate("/search");
    }
  };

  function onSubmit() {
    dispatch(setSearchParams(searchValue));
  }

  return (
    <div className="header__search search">
      <input
        onKeyDown={onKeyDown}
        value={searchValue}
        onChange={(event) => setSearchValue(event.target.value)}
        type="text"
        className="search_input"
        placeholder="Название или номер ГОСТ-а"
      />
      <Link to="/search" onClick={() => onSubmit()} className="search_button">
        <img
          src="../images/main/header/searchicon.png"
          alt=""
          className="search__icon"
        />
      </Link>
    </div>
  );
}

export default SearchInput;
