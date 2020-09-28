import React, { useState, useEffect } from "react";
import "./css/dictionary.css";
import OneWordBrief from "./oneWordBrief.js";
import { AiOutlineSearch } from "react-icons/ai";

function Dictionary() {
  const [search, setsearch] = useState("");
  return (
    <div className="dictionaryBlock">
      <div className="headers">
        <div className="vocab">VOCAB</div>
        <div className="searchBar">
          <AiOutlineSearch size={30} style={{ color: "#5d1049" }} />
          <input
            style={{
              border: "none",
              height: "100%",
              width: "100%",
              fontSize: "23px",
              color: "#5d1049",
            }}
            placeholder="search"
            type="text"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
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
