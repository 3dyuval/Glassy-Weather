import React from "react";
import AddCity from "./AddCity.component";
import '../../SCSS/Welcome.scss'


export default function Welcome(props) {
  const { cityList, setCityList, handleAddCity } = props;

  const suggestions = ["Tel Aviv", "Budapest", "Rome"]

  // return null

  return (<div className="welcome">
    <h1>What is your city?</h1>
    <AddCity setCityList={setCityList}>
    </AddCity>

    {suggestions.map(itm => <div key={itm} className="city-suggestion button" onClick={() => handleAddCity(itm)}>{itm}</div>)}
  </div>
  );
}
