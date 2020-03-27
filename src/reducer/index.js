import {
  SET_SELECTED,
  //CLEAR_SELECTED,
  MOUSE_DOWN,
  MOUSE_LEAVE,
  MOUSE_UP,
  CLICK
} from "../constants"

const INITIAL_STATE = {
  selected: [],
  rowCounter: 16, //for example
  mouseDown: false,
  mouseLeave: false,
  mouseUp: false
}

const reducer = (state = INITIAL_STATE, action) => {
  //console.warn("Reducer action=", action)
  //console.warn("Reducer state=", state)
  const { type, payload } = action
  switch (type) {
    case SET_SELECTED: {
      let { selected } = state
      let removeIndex = -1
      const added = selected.some(({ x, y }, index) => {
        removeIndex = index
        return x === payload.x && y === payload.y
      })

      if (!added) {
        selected.push(payload)
      } else {
        selected.splice(removeIndex, 1)
      }
      return {
        ...state,
        selected
      }
    }
    /*case CLEAR_SELECTED: {
      const { mouseDown, selected } = state
      return {
        ...INITIAL_STATE,
        selected: mouseDown ? selected : []
      }
    }*/
    case MOUSE_DOWN: {
      return {
        ...state,
        mouseDown: payload
      }
    }
    case MOUSE_LEAVE: {
      const { mouseDown, selected } = state
      const { leave, position } = payload
      if (mouseDown) {
        const isNew = !selected.some(
          ({ x, y }) => x === position.x && y === position.y
        )
        if (isNew) {
          selected.push(position)
        }
      }
      return {
        ...state,
        selected,
        mouseLeave: leave
      }
    }
    case MOUSE_UP: {
      return {
        ...state,
        mouseDown: false,
        //mouseLeave: false,
        mouseUp: payload
      }
    }
    case CLICK: {
      return {
        ...state,
        selected: [payload],
        mouseDown: false,
        mouseLeave: false,
        mouseUp: false
      }
    }
    default:
      return state
  }
}

export default reducer
