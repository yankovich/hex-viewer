import {
  SET_SELECTED,
  CLEAR_SELECTED,
  MOUSE_DOWN,
  MOUSE_LEAVE,
  MOUSE_UP,
  CLICK
} from "../constants"

export const setSelected = position => {
  return {
    type: SET_SELECTED,
    payload: position
  }
}

export const clearSelected = () => {
  return {
    type: CLEAR_SELECTED
  }
}

export const mouseDown = payload => {
  return {
    type: MOUSE_DOWN,
    payload
  }
}

export const mouseLeave = payload => {
  return {
    type: MOUSE_LEAVE,
    payload
  }
}

export const mouseUp = payload => {
  return {
    type: MOUSE_UP,
    payload
  }
}
export const click = payload => {
  return {
    type: CLICK,
    payload
  }
}
