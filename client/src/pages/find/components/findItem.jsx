import React from "react";
import { useDispatch } from "react-redux";
import { setDocId } from "../../../redux/slices/docSlice";
import { Link } from "react-router-dom";

function FindItem({ name, id }) {
  const dispatch = useDispatch();

  function onTitleClicked() {
    dispatch(setDocId(id));
  }

  return (
    <div>
      <div className="find-item">
        <div className="find-item__info">
          <Link to={`/doc?id=${id}`} onClick={() => onTitleClicked()}>
            {name}
          </Link>
        </div>
        <div className="find-item__buttons">
          <a href="">
            <img src="../images/find/share.png" alt="" />
          </a>
          <a href="">
            <img src="../images/find/project.png" alt="" />
          </a>
          <a href="">
            <img src="../images/find/save.png" alt="" />
          </a>
          <a href="">
            <img src="../images/find/favorite.png" alt="" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default FindItem;
