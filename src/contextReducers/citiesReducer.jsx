

export function citiesReducer(state, action) {
  switch (action.type) {
    case actionTypes.ADD_CITY: {
      //validation of city name is done within useAddCity hook
      return [...state, {
        id: new Date().valueOf(),
        name: action.payload
      }]
    } case actionTypes.DELETE_CITY: {
      const newState = state.filter(city => city.id !== action.payload)
      return newState
    }
    case actionTypes.SET_SELECTED_BY_ID: {
      return state.map(i => {
        return { ...i, selected: i.id === action.payload ? true : false }
      })
    }
    case actionTypes.SET_SELECTED_NEXT: {
      if (state.length === 1) return state
      const newState = state
      if (newState.findIndex(idx => idx.selected) < state.length) {
        newState[i].selected = false
        newState[i + 1].selected = true
      } else {
        newState[0].selected = true
      }
      return newState
    }
    default:
      return state
  }
}

export const actionTypes = {
  ADD_CITY: "add_city",
  DELETE_CITY: "delete_city",
  SET_SELECTED_BY_ID: "set_selected_by_id",
  SET_SELECTED_NEXT: "set_selected_next",
  SET_SELECTED_BACK: "set_selected_back",
}