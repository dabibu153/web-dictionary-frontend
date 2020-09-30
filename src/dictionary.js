import React, { useState, useEffect, Fragment } from "react";
import "./css/dictionary.css";
import OneWordBrief from "./oneWordBrief.js";
import { AiOutlineSearch, AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

function Dictionary() {
  const [search, setsearch] = useState("");
  const [wait, setwait] = useState("firstload");
  const [wait2, setwait2] = useState("firstload");

  const briefData = useSelector((state) => state.briefData);
  const wait1 = useSelector((state) => state.wait1);
  const dispatch = useDispatch();

  const handleSearch = async () => {
    if (search === "") {
      console.log("search box empty");
    } else {
      setsearch("");
      setwait("visible");
      const data = { searchKeyWord: search };
      axios
        .post(
          "https://dictionary-backend-dabibu.herokuapp.com/api/searchOxford",
          data
        )
        .then((res) => {
          if (res.data === "word not found") {
            setwait("invisible");
            setwait2("visible");
            setTimeout(() => {
              setwait2("invisible");
            }, 2000);
          } else {
            axios
              .get(
                "https://dictionary-backend-dabibu.herokuapp.com/api/getMongoData"
              )
              .then((res) => {
                console.log("mongoData is : ", res.data);
                dispatch({ type: "SET_BRIEF_DATA", data: res.data });
                setwait("invisible");
              })
              .catch((err) => {
                console.log(err);
              });
          }
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
          <Fragment>
            <div className="loaders">
              <div className={wait}>
                Searching New Word{" "}
                <AiOutlineLoading3Quarters className="rotation" />
              </div>
              <div className={wait2}>word not found</div>
              <div className={wait1}>
                Deleting word <AiOutlineLoading3Quarters className="rotation" />
              </div>
            </div>
            <div>
              {briefData.map((oneWordBrief) => (
                <OneWordBrief
                  name={oneWordBrief.name}
                  category={oneWordBrief.category}
                  style={{ cursor: "pointer" }}
                />
              ))}
            </div>
          </Fragment>
        ) : (
          <div className="loading">loading!</div>
        )}
      </div>
    </div>
  );
}

export default Dictionary;
