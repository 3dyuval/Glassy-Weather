import { useState } from 'react'
import { useNavigate } from "react-router-dom";
import clsx from 'clsx'
import { useContext } from 'react';
import { CitiesContext, citiesReducer } from '../../contextReducers';

export default function CityList() {

    const { cities } = useContext(CitiesContext)

    const [editMode, setEditMode] = useState(false);

    return (<>
        <button
            className='btn-primary2'
            onClick={() => {
                setEditMode(!editMode);
            }}>Edit</button>
        <ul className="manage-cities">
            {
                cities.map(itm => (<CityListItem
                    key={itm.id}
                    id={itm.id}
                    name={itm.name}
                    editMode={editMode}
                />))
            }
        </ul>
    </>)

}

const CityListItem = (props) => {
    const { name, id, editMode } = props

    const { dispatchCities, actionTypes } = useContext(CitiesContext)

    const navigate = useNavigate()

    const classNames = clsx({
        'btn-secondary': true,
        'hidden': !editMode
    })

    return (
        <li className="list-item city-list-item" onClick={() => navigate(`/weather/${name}`)} >
            <span className="city-name">{name}</span>
            <input
                type="button"
                value="DELETE"
                className={classNames}
                disabled={!editMode}
                onClick={() => dispatchCities({ type: actionTypes.DELETE_CITY, payload: id })}
            ></input>
        </li >

    )
}