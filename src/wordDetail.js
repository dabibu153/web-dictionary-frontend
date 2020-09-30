import React, { useEffect } from "react";
import "./css/wordDetails.css";
import { useSelector, useDispatch } from "react-redux";
import Axios from "axios";
import { BsBackspace } from "react-icons/bs";
import { Link } from "react-router-dom";

function WordDetail(props) {
  const detailedData = useSelector((state) => state.detailedData);
  const dispatch = useDispatch();

  useEffect(() => {
    const data = { word: props.match.params.word_id };
    Axios.post(
      "https://dictionary-backend-dabibu.herokuapp.com/api/getDetails",
      data
    ).then((res) => {
      dispatch({ type: "SET_DETAILED_DATA", data: res.data });
    });
  }, []);

  const handleStateClear = () => {
    dispatch({ type: "SET_DETAILED_DATA", data: {} });
  };
  return (
    <div className="DetailsBlock">
      {detailedData === {} ? (
        <div>loading!!!</div>
      ) : (
        <div>
          <div className="headerAndBack">
            <div className="header2">{detailedData.name}</div>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                marginRight: "10px",
                color: "black",
              }}
            >
              <BsBackspace size={30} onClick={handleStateClear} />
            </Link>
          </div>
          <hr />
          <div className="originInfo">Origin: {detailedData.origin}</div>
          <hr />
          <div className="categotyWTeg">
            {detailedData.category?.map((oneCategory) => (
              <div className="oneDetailedCategory">
                <div className="catType">{oneCategory.type}</div>
                <div className="defAndExamples">
                  {oneCategory.defAndEg.map((defEg, index) => (
                    <div>
                      {index < 3 ? (
                        <div>
                          <div className="definitionOne">{defEg.def}</div>
                          <div className="exampleOne">Example: {defEg.eg}</div>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  ))}
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default WordDetail;
