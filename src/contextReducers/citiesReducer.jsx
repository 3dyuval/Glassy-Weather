
export const citiesActions = {
  ADD_CITY: "ADD_CITY",
  DELETE_CITY: "DELETE_CITY",
}

export function citiesReducer(state, action) {
  switch (action.type) {
    case citiesActions.ADD_CITY: {
      //(validation of city name is done within the component)
      return [...state, {
        id: new Date().valueOf(),
        name: action.payload
      }]
    } case citiesActions.DELETE_CITY: {
      const newState = state.filter(city => city.id !== action.payload)
      return newState
    }
  }
}