import React, { useLayoutEffect } from "react";
import { NavLink } from "react-router-dom";
import '../../SCSS/Header.scss'

function Logo() {
  return <em>Weather Glass</em>;
}

function Header(props) {
  const { theme, setTheme } = props;
  return (
    <div className="header">
      <Navbar theme={theme} setTheme={setTheme} />
    </div>
  );
}

function Navbar(props) {
  const { theme, setTheme } = props;

  function handleToggleTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    }
  }

  useLayoutEffect(() => {
    if (theme === "light") {
      document.body.className = "light";
    } else if (theme === "dark") {
      document.body.className = "dark";
    }
  }, [theme]);

  return (
    <ul className="navbar">
      <li>
        <NavLink to="/weather" activeClassName="nav-active">
          Weather
        </NavLink>
      </li>
      <li>
        <NavLink to="/manage" activeClassName="nav-active">
          Manage Cities
        </NavLink>
      </li>
      <li>
        <button onClick={handleToggleTheme}>{theme}</button>
      </li>
    </ul>
  );
}

export default Header;
