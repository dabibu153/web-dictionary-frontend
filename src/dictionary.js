import React, { useState, useEffect } from "react";
import "./css/dictionary.css";
import OneWordBrief from "./oneWordBrief.js";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";

function Dictionary() {
  const [search, setsearch] = useState("");

  const handleSearch = async () => {
    if (search === "") {
      console.log("search box empty");
    } else {
      const data = { searchKeyWord: search };
      axios
        .post("http://localhost:5000/api/searchOxford", data)
        .then((res) => {
          console.log(res);
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
        <OneWordBrief />
        <OneWordBrief />
        <OneWordBrief />
        <OneWordBrief />
        <OneWordBrief />
        <OneWordBrief />
        <OneWordBrief />
        <OneWordBrief />
      </div>
    </div>
  );
}

export default Dictionary;
