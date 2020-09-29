import React, { useEffect } from "react";
import "./css/app.css";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import Dictionary from "./dictionary.js";
import WordDetail from "./wordDetail.js";

import axios from "axios";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("https://dictionary-backend-dabibu.herokuapp.com/api/getMongoData")
      .then((res) => {
        console.log("mongoData is : ", res.data);
        dispatch({ type: "SET_BRIEF_DATA", data: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Router>
      <div className="App">
        <div className="appBody">
          <Switch>
            <Route path="/" exact component={Dictionary} />
            <Route path="/:word_id" exact component={WordDetail} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
