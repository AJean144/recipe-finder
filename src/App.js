import React, { useState, useMemo } from "react";
import Header from "./components/header";
import Body from "./components/body";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Meal from "./components/meals/Meal";
import { SearchContext } from "./context/SearchContext";
import axios from "axios";

function App() {
  const [searchResults, setSearchResults] = useState([]);
  const [validationError, setValidationError] = useState("");
  const handleOnChange = (event) => {
    // Only alphabetical characters allowed
    if (/^[a-zA-Z]+$/.test(event.target.value)) {
      axios
        .get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${event.target.value}`
        )
        .then((res) => {
          setSearchResults(res.data.meals);
          setValidationError("");
        })
        .catch((err) => console.error(err));
    } else {
      setValidationError(
        !!event.target.value ? "Only alphabetical characters are allowed" : ""
      );
    }
  };

  const providerValue = useMemo(
    () => ({
      searchResults,
      setSearchResults,
      validationError,
      setValidationError,
      handleOnChange,
    }),
    [
      searchResults,
      setSearchResults,
      validationError,
      setValidationError,
      handleOnChange,
    ]
  );

  return (
    <Router>
      <SearchContext.Provider value={providerValue}>
        <Header />
        <Switch>
          <Route exact path="/">
            <Body />
          </Route>
          <Route path="/meal/:idMeal">
            <Meal />
          </Route>
        </Switch>
      </SearchContext.Provider>
    </Router>
  );
}

export default App;
