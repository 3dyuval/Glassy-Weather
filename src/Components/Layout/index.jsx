import React, { useEffect, useState } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import NavBar from "./NavBar";
import { Components } from "./Components";
import AutoComplete from "../AddCity/AutoComplete";

export default function Layout({ children }) {

  const [showNavBar, setShowNavBar] = useState(true)
  let location = useLocation()
  let [searchParams, setSearchParams] = useSearchParams()
  let layout = searchParams.get('layout')
  let component = searchParams.get('component')
  let filter = searchParams.get('filter')

  useEffect(() => {
    setShowNavBar(location?.state?.shownavbar ?? true)
  })


  return (<>
    <div className="header">
      {showNavBar ?
        <NavBar>
          {(layout !== null) && <Components render={component} />}
        </NavBar>
        : null}
    </div>
    {(filter !== null && filter.length !== 0) ? <AutoComplete input={filter} /> : children}
  </>)

}