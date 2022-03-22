import React from "react"
import Conditions from "../Stats/Conditions.component"
import Hours from "../Stats/Hours.component"
import Days from "../Stats/Days.component"
import "../../SCSS/City.scss"

export default function City({ weather, stats, isLoading }) {


  return (<>
    <div className="city">
      <div style={{ margin: '2em' }} >
        {/* <input
          type="button"
          value={isLoading ? "loading..." : `Get Weather in ${cityName}`}
          disabled={isLoading}
        /> */}
        <div className="title">
          <h1>{weather?.location.name ?? 'City'}</h1>
          <h2>{weather?.location.localtime ?? 'Time'}</h2>
          <Hours isLoading={isLoading} hours={stats && stats.hours} />
        </div>
        {stats && <Conditions
          conditions={stats.conditions}
          isLoading={isLoading}
          layoutName="main-stats"
        />}
      </div>
      {stats && <Days days={stats.days} />}
    </div >

  </>
  )
}
