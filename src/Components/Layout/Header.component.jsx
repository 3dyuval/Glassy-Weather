import React, { useLayoutEffect } from "react";
import '../../SCSS/Header.scss'
import condition from '../../Assets/WeatherConditions/11.mostly-cloudy-light.svg'



function Header({ children }) {


  return (
    <div className="header">
      {children}
    </div>
  );
}

export default Header;
