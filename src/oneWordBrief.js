import React, { useState } from "react";
import "./css/oneWordBrief.css";
import { Redirect } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";

function OneWordBrief({ name, category }) {
  const [redirect, setredirect] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    const data = { word: name };
    Axios.post("http://localhost:5000/api/deleteMongoData", data).then(
      (res) => {
        console.log("fresh list", res.data);
        dispatch({ type: "SET_BRIEF_DATA", data: res.data });
      }
    );
  };
  const handleDetailView = () => {
    const data = { word: name };
    Axios.post("http://localhost:5000/api/getDetails", data).then((res) => {
      dispatch({ type: "SET_DETAILED_DATA", data: res.data });
      setredirect(true);
    });
  };
  return (
    <div className="briefBlock">
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <div
          className="briefHeader"
          onClick={handleDetailView}
          style={{ cursor: "pointer" }}
        >
          {name}
        </div>
        <div className="delete">
          <AiFillDelete
            size={25}
            onClick={handleDelete}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      <div style={{ cursor: "pointer" }}>
        {category.map((x) => (
          <div className="categories" onClick={handleDetailView}>
            ({x.type}) {x.defAndEg[0].def}
          </div>
        ))}
      </div>

      <hr />
      {redirect ? <Redirect to={`/${name}`} /> : <div></div>}
    </div>
  );
}

export default OneWordBrief;
