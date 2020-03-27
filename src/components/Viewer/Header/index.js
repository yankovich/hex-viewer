import React from "react"
import "./index.css"

function Header() {
  const base = []
  for (let i = 0; i < 16; i++) {
    base.push(i)
  }
  return (
    <div className="Header Wrapper">
      <div className="LeftColumn"></div>
      <div className="Wrapper">
        {base.map((item, index) => (
          <div key={"ITEM-" + index} className="Item">
            {item.toString(16)}
          </div>
        ))}
      </div>
      <div className="Wrapper">
        {base.map((item, index) => (
          <div key={"SMALL-" + index} className="Item Small">
            {item.toString(16)}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Header
