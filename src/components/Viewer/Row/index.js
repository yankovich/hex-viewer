import React from "react"
import Cell, { COUNTER, HEX, VALUE } from "./Cell"
import "./index.css"

function Row({ index }) {
  const base = []
  for (let i = 0; i < 16; i++) {
    base.push(i)
  }
  return (
    <div className="Row Wrapper">
      <Cell type={COUNTER} value={index} />
      <div className="Wrapper">
        {base.map(item => (
          <Cell
            type={HEX}
            key={HEX + "-" + item}
            position={{ x: item, y: index }}
          />
        ))}
      </div>
      <div className="Wrapper">
        {base.map(item => (
          <Cell
            type={VALUE}
            key={VALUE + "-" + item}
            position={{ x: item, y: index }}
          />
        ))}
      </div>
    </div>
  )
}

export default Row
