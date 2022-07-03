import React from "react"
import CityList from "../../Components/CityList";

export default function Manage() {

  return (<>
    <div className="manage">
      //TODO add welcome component
      <h1 className="text-xl">Manage Cities</h1>
      <CityList />
    </div>
    <div className="manage-bg"></div>
  </>
  )
}
