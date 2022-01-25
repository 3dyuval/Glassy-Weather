import React from "react";
import AddCity from "./AddCity.component";

export default function Welcome(props) {
  const { setCityList } = props;

  return (
    <div className="welcome">
      <AddCity setCityList={setCityList}>
        <h1>What is your city?</h1>
      </AddCity>
    </div>
  );
}
