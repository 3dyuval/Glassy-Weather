import React, { useState } from 'react'
import { NavLink, Route, useLocation, Switch } from "react-router-dom";
import Configuration from "./Configuration"
import ArrowIcon from "../../Assets/Arrow.svg?component"
import MenuIcon from "../../Assets/Menu.svg?component"
import FilterIcon from "../../Assets/Filter.svg?component"
import Modal from './Modal';

function NavBar(props) {
    const { darkTheme, handleThemeToggle } = props;



    const location = useLocation();

    return (
        <>

            <ul className="navbar">

                {(location.pathname !== '/weather') &&
                    <li className="button">
                        <NavLink to="/weather">
                            <ArrowIcon />
                        </NavLink>
                    </li>
                }
                {(location.pathname === '/weather') &&
                    <li className="button">
                        <NavLink to="./manage" >
                            <MenuIcon />
                        </NavLink>
                    </li>
                }
                {(location.pathname === '/manage') &&
                    <NavLink to='/manage/configuration' >
                        <li className="button">
                            <FilterIcon />
                        </li>
                    </NavLink>
                }
            </ul>

            <Switch>
                <Route path="/manage/configuration">
                    <Modal>
                        <Configuration handleThemeToggle={handleThemeToggle} darkTheme={darkTheme} />
                    </Modal>
                </Route>
            </Switch>
        </>
    );
}

export default NavBar

