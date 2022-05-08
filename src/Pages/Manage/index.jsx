import React from "react"
import AddCityInput from "../../Components/AddCity/AddCityInput"
import { Outlet } from "react-router-dom";
import CityList from "../../Components/CityList";

export default function Manage(props) {


  return (<>
    <div className="content">
      <Outlet />
      <h1 className="text-xl">Manage Cities</h1>
      <AddCityInput />
      <CityList />
    </div>
    <div className="manage-bg"></div>
  </>
  )
}
