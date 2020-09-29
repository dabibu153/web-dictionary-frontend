import React from "react";
import "./css/oneWordBrief.css";

function OneWordBrief({ name, category }) {
  return (
    <div className="briefBlock">
      <div className="briefHeader">{name}</div>
      <div>
        {category.map((x) => (
          <div className="categories">
            ({x.type}) {x.defAndEg[0].def}
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
}

export default OneWordBrief;
