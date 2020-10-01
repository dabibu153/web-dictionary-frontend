import React, { useState } from "react";
import "./css/oneWordBrief.css";
import { Redirect } from "react-router-dom";
import { AiFillDelete } from "react-icons/ai";
import Axios from "axios";
import { useDispatch } from "react-redux";

function OneWordBrief({ name, category }) {
  const [redirect, setredirect] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch({ type: "SET_WAIT1", data: "visible" });
    const data = { word: name };
    Axios.post(
      "https://dictionary-backend-dabibu.herokuapp.com/api/deleteMongoData",
      data
    ).then((res) => {
      console.log("fresh list", res.data);
      dispatch({ type: "SET_BRIEF_DATA", data: res.data });
      dispatch({ type: "SET_WAIT1", data: "invisible" });
    });
  };
  const handleDetailView = () => {
    const data = { word: name };
    Axios.post(
      "https://dictionary-backend-dabibu.herokuapp.com/api/getDetails",
      data
    ).then((res) => {
      dispatch({ type: "SET_DETAILED_DATA", data: res.data });
      setredirect(true);
    });
  };
  return (
    <div>
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
            <div key={x.type} className="categories" onClick={handleDetailView}>
              ({x.type}) {x.defAndEg[0].def}
            </div>
          ))}
        </div>

        {redirect ? <Redirect to={`/${name}`} /> : <div></div>}
      </div>
      <hr />
    </div>
  );
}

export default OneWordBrief;
