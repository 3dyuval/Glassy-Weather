import React from 'react'
import { Link, useLocation } from "react-router-dom";
import BackIcon from "../../assets/ui-icons/Arrow - Left.svg?component"
import HamburgerIcon from "../../assets/ui-icons/Category.svg?component"
import FilterIcon from "../../assets/ui-icons/Filter.svg?component"
import SearchIcon from "../../assets/ui-icons/Search.svg?component"

function NavBar({ children }) {

    let location = useLocation();
    let currentLocation = location.pathname
    const isHomepage = (location.pathname === '/')
    const navLinks = [
        {
            title: 'Back',
            show: !isHomepage,
            to: '/',
            icon: <BackIcon />,
            position: 'left',
        },
        {
            title: 'Manage',
            show: isHomepage,
            to: '/manage',
            icon: <HamburgerIcon />,
            position: 'left',

        },
        {
            title: 'Add City',
            show: true,
            to: { currentLocation, search: "?layout=Header&component=AddCity" },
            state: { navbar: true },
            icon: <SearchIcon />,
            position: 'right',
        },
        {
            title: 'Configuration',
            show: true,
            to: { currentLocation, search: "?modal=UserConfiguration" },
            icon: <FilterIcon />,
            position: 'right',
        },
    ]

    //map through the links and render them
    return (<div className="navbar">
        <ul className='left'>
            {navLinks.map((link, id) => (link.position === 'left') &&
                <NavLink key={id} {...link} />
            )
            }
        </ul>
        {children}
        <ul className='right'>
            {navLinks.map((link, id) => (link.position === 'right') &&
                <NavLink key={id} {...link} />
            )
            }
        </ul>
    </div>
    )
}


export default NavBar


const NavLink = ({ title, to, icon, show, ...rest }) => {

    if (!show) return null
    return (<li
        className="nav-button"
        alt={title}>
        <Link to={to} {...rest}>
            {icon || title}
        </Link>
    </li >)
}
