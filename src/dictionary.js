import React, { useState, Fragment } from "react";
import "./css/dictionary.css";
import OneWordBrief from "./oneWordBrief.js";
import { AiOutlineSearch, AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { IoIosAddCircle } from "react-icons/io";

function Dictionary() {
  const [search, setsearch] = useState("");
  const [wait, setwait] = useState("firstload");
  const [wait2, setwait2] = useState("firstload");
  const [redirect, setredirect] = useState(false);
  const [redirectWord, setredirectWord] = useState("");
  const [addTextState, setaddTextState] = useState("showNone");
  const [addWordWin, setaddWordWin] = useState("winHide");
  const [newWordSearch, setnewWordSearch] = useState("");
  const briefData = useSelector((state) => state.briefData);
  const wait1 = useSelector((state) => state.wait1);
  const dispatch = useDispatch();

  const handleMongoSearch = () => {
    if (search === "") {
      console.log("search box empty");
    } else {
      const data = { searchKeyWord: search };
      setsearch("");
      setwait("visible");

      axios
        .post(
          "https://dictionary-backend-dabibu.herokuapp.com/api/searchMongo",
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
            setredirectWord(res.data.name);
            dispatch({ type: "SET_DETAILED_DATA", data: res.data });
            setwait("invisible");
            setredirect(true);
          }
        });
    }
  };

  const handleAddButton = () => {
    setaddTextState("showNone");
    if (addWordWin === "winHide") {
      setaddWordWin("winShow");
    } else {
      setaddWordWin("winHide");
    }
  };

  const handleSearch = async () => {
    if (newWordSearch === "") {
      setaddWordWin("winHide");
      setnewWordSearch("");
    } else {
      setwait("visible");
      setaddWordWin("winHide");
      const data = {
        word: newWordSearch,
      };
      setnewWordSearch("");
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

  // if (search === "") {
  //   console.log("search box empty");
  // } else {
  //   setsearch("");
  //   setwait("visible");
  //   const data = { searchKeyWord: search };
  //   axios
  //     .post("http://localhost:5000/api/searchOxford", data)
  //     .then((res) => {
  //       if (res.data === "word not found") {
  //         setwait("invisible");
  //         setwait2("visible");
  //         setTimeout(() => {
  //           setwait2("invisible");
  //         }, 2000);
  //       } else {
  //         axios
  //           .get("http://localhost:5000/api/getMongoData")
  //           .then((res) => {
  //             console.log("mongoData is : ", res.data);
  //             dispatch({ type: "SET_BRIEF_DATA", data: res.data });
  //             setwait("invisible");
  //           })
  //           .catch((err) => {
  //             console.log(err);
  //           });
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  const handleAddButtonMEnter = () => {
    if (addWordWin === "winHide") {
      setaddTextState("addTextV");
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
              color: "black",
              backgroundColor: "white",
            }}
            placeholder="access personal DB"
            type="text"
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
          <button onClick={handleMongoSearch}>Search!</button>
        </div>
      </div>
      <div className="wordList">
        {briefData ? (
          <div className="relativeBlock">
            <div className="loaders">
              <div className={wait}>
                Searching for Word{" "}
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
                  key={oneWordBrief.name}
                  name={oneWordBrief.name}
                  category={oneWordBrief.category}
                  style={{ cursor: "pointer" }}
                />
              ))}
              <div className="addNewWord">
                <div className={addWordWin}>
                  <AiOutlineSearch size={30} style={{ color: "white" }} />
                  <input
                    style={{
                      border: "none",
                      height: "70%",
                      width: "70%",
                      fontSize: "17px",
                      color: "black",
                      backgroundColor: "white",
                    }}
                    placeholder="access Oxford API"
                    type="text"
                    value={newWordSearch}
                    onChange={(e) => setnewWordSearch(e.target.value)}
                  />
                  <button onClick={handleSearch}>Search!</button>
                </div>
                <div className={addTextState}>add new word</div>
                <div className="addButton">
                  <IoIosAddCircle
                    size={70}
                    onMouseEnter={handleAddButtonMEnter}
                    onMouseLeave={() => setaddTextState("showNone")}
                    onClick={handleAddButton}
                  />
                </div>
              </div>
            </div>

            {redirect ? <Redirect to={`/${redirectWord}`} /> : <div></div>}
          </div>
        ) : (
          <div className="loading">loading!</div>
        )}
      </div>
    </div>
  );
}

export default Dictionary;
