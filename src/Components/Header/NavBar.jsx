import React from 'react'
import { Link, useLocation } from "react-router-dom";
import ArrowIcon from "../../Assets/Arrow.svg?component"
import MenuIcon from "../../Assets/Menu.svg?component"
import FilterIcon from "../../Assets/Filter.svg?component"

function NavBar(props) {

    const location = useLocation();

    return (
        <>

            <ul className="navbar">
                {(location.pathname !== '/') &&
                    <li className="nav-button">
                        <Link to="/">
                            <ArrowIcon />
                        </Link>
                    </li>
                }
                {(location.pathname === '/') &&
                    <li className="nav-button">
                        <Link to="./manage" >
                            <MenuIcon />
                        </Link>
                    </li>
                }
                {(location.pathname === '/manage') &&
                    <Link to='/manage/configuration' >
                        <li className="nav-button">
                            <FilterIcon />
                        </li>
                    </Link>
                }
            </ul>
        </>
    );
}

export default NavBar

