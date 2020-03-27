import React from "react"
import Row from "./Row"
import Header from "./Header"
import { useSelector, useDispatch } from "react-redux"
import { clearSelected } from "../../actions"
import "./index.css"

const Viewer = () => {
  const rows = []
  const rowCounter = useSelector(state => state.rowCounter)
  const dispatch = useDispatch()

  for (let i = 0; i < rowCounter; i++) {
    rows.push(i)
  }

  const onClick = event => {
    dispatch(clearSelected())
  }
  return (
    <div className="Viewer" onClick={onClick}>
      <Header />
      {rows.map((row, index) => (
        <Row key={"ROW-" + index} index={index} />
      ))}
    </div>
  )
}

export default Viewer
