import React from 'react'
import { Link, Route, useLocation, Routes } from "react-router-dom";
import Manage from "../Manage/Manage.component"
import ArrowIcon from "../../Assets/Arrow.svg?component"
import MenuIcon from "../../Assets/Menu.svg?component"
import FilterIcon from "../../Assets/Filter.svg?component"
import Modal from '../Modal/Modal.wrapper';
import Configuration from '../Manage/Configuration.component';

function NavBar(props) {

    const location = useLocation();

    return (
        <>

            <ul className="navbar">
                {(location.pathname !== '/') &&
                    <li className="button">
                        <Link to="/">
                            <ArrowIcon />
                        </Link>
                    </li>
                }
                {(location.pathname === '/') &&
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
        </>
    );
}

export default NavBar

