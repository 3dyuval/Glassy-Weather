import React, { useState, useLayoutEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ManageCities from "./ManageCities.component";
import Header from "./Header.component";
import Welcome from "./Welcome.component";
import { Cities } from "./Cities.component";
import "./App.scss";

export default function App() {
  const [currentCity, setCurrentCity] = useState();
  const [theme, setTheme] = useState("light");
  const [cityList, setCityList] = useState(() => {
    const saved = localStorage.getItem("cityList");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });

  useLayoutEffect(() => {
    document.title = `Weather in ${currentCity}`;
  }, [currentCity]);

  const showWelcome = () => {
    if (!cityList || cityList.length === 0)
      return <Welcome cityList={cityList} setCityList={setCityList} />;
  };

  return (
    <Router>
      <div className="app">
        <Header theme={theme} setTheme={setTheme} />
        <Switch>
          <Route exact path="/weather">
            {showWelcome()}
            <Cities
              cityList={cityList}
              setCityList={setCityList}
              currentCity={currentCity}
              setCurrentCity={setCurrentCity}
            />
          </Route>
          <Route path="/manage">
            <ManageCities cityList={cityList} setCityList={setCityList} />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
