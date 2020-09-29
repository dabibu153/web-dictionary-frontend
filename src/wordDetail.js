import React from "react";
import "./css/wordDetails.css";
import { useSelector, useDispatch } from "react-redux";

function WordDetail() {
  const detailedData = useSelector((state) => state.detailedData);
  console.log("detailedData about", detailedData);
  return (
    <div className="DetailsBlock">
      {detailedData ? (
        <div>
          <div className="header2">{detailedData.name}</div>
          <hr />
          <div className="originInfo">Origin: {detailedData.origin}</div>
          <div className="categotyWTeg">
            {detailedData.category.map((oneCategory) => (
              <div className="oneDetailedCategory">
                <div className="catType">{oneCategory.type}</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>loading....</div>
      )}
    </div>
  );
}

export default WordDetail;
