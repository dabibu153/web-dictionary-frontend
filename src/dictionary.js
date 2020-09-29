import React, { useState, useEffect } from "react";
import "./css/dictionary.css";
import OneWordBrief from "./oneWordBrief.js";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

function Dictionary() {
  const [search, setsearch] = useState("");
  const [wait, setwait] = useState(false);

  const briefData = useSelector((state) => state.briefData);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    if (search === "") {
      console.log("search box empty");
    } else {
      setsearch("");
      setwait(true);
      const data = { searchKeyWord: search };
      axios
        .post("http://localhost:5000/api/searchOxford", data)
        .then((res) => {
          axios
            .get("http://localhost:5000/api/getMongoData")
            .then((res) => {
              console.log("mongoData is : ", res.data);
              dispatch({ type: "SET_BRIEF_DATA", data: res.data });
              setwait(false);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="dictionaryBlock">
      <div className="headers">
        <div className="vocab">VOCAB</div>
        <div className="searchBar">
          <AiOutlineSearch size={30} style={{ color: "#5d1049" }} />
          <input
            style={{
              border: "none",
              height: "70%",
              width: "70%",
              fontSize: "17px",
              color: "#5d1049",
            }}
            type="text"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
          <button onClick={handleSearch}>Search!</button>
        </div>
      </div>
      <div className="wordList">
        {briefData ? (
          <div>
            {briefData.map((oneWordBrief) => (
              <OneWordBrief
                name={oneWordBrief.name}
                category={oneWordBrief.category}
                style={{ cursor: "pointer" }}
              />
            ))}
            {wait ? <div className="wait">Please Wait</div> : <div></div>}
          </div>
        ) : (
          <div className="loading">loading!</div>
        )}
      </div>
    </div>
  );
}

export default Dictionary;
