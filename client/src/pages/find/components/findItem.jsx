import React from "react";

function FindItem({ name }) {
  return (
    <div>
      <div className="find-item">
        <div className="find-item__info">
          <a href="">{name}</a>
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
