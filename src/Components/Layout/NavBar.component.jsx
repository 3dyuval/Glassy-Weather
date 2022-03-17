import React from 'react'
import { Link, Route, useLocation, Routes } from "react-router-dom";
import Configuration from "./Configuration.component"
import ArrowIcon from "../../Assets/Arrow.svg?component"
import MenuIcon from "../../Assets/Menu.svg?component"
import FilterIcon from "../../Assets/Filter.svg?component"
import Modal from './Modal.layout';

function NavBar(props) {
    const { darkTheme, handleThemeToggle } = props;

    const location = useLocation();

    return (
        <>

            <ul className="navbar">

                {(location.pathname !== '/weather') &&
                    <li className="button">
                        <Link to="/weather">
                            <ArrowIcon />
                        </Link>
                    </li>
                }
                {(location.pathname === '/weather') &&
                    <li className="button">
                        <Link to="./manage" >
                            <MenuIcon />
                        </Link>
                    </li>
                }
                {(location.pathname === '/manage') &&
                    <Link to='/manage/configuration' >
                        <li className="button">
                            <FilterIcon />
                        </li>
                    </Link>
                }
            </ul>

            <Routes>
                <Route path="/manage/configuration" element={
                    <Modal>
                        <Configuration handleThemeToggle={handleThemeToggle} darkTheme={darkTheme} />
                    </Modal>
                }>

                </Route>
            </Routes>
        </>
    );
}

export default NavBar

