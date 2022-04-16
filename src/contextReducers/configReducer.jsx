import { notifyUser } from "../utils"


//TODO: refactor everything into one global state
const actions = {
  CITY: {
    ADD: 'add',
    DELETE: 'delete'
  },
  CONFIG: {
    STAT: {
      ADD: 'add',
      REMOVE: 'remove',
      TOGGLE: 'toggle',
    },
    SETTING: {
      DARK_MODE: 'dark-mode'
    }
  }
}




export function reducer(state, action) {
  switch (action.type) {
    case 'add-stat': {
      const updatedStats = { stats: [...state.stats, { statName: action.payload }] }
      return { ...state.settings, ...updatedStats }
    }
    case 'remove-stat': {
      return { stats: state.stats.filter(itm => itm.statName != action.payload) }
    }
    case 'toggle': {
      if (!action.payload.checked) {
        notifyUser(action.payload.statName + ' removed')
        return { ...state, stats: state.stats.filter(itm => itm.statName !== action.payload.statName) }
      } else if (action.payload.checked) {
        notifyUser(action.payload.statName + ' added')
        return { ...state, stats: [...state.stats, { statName: action.payload.statName }] }
      }
    }
    case 'darkMode': {
      const switched = !state.settings.darkMode
      return { ...state, settings: { darkMode: switched } }
    }
    default: {
      return state
    }
  }
}

