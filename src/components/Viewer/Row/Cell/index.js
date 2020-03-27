import React, { Component } from "react"
import { connect } from "react-redux"
import cn from "classnames"
import {
  setSelected,
  mouseDown,
  mouseLeave,
  mouseUp,
  click
} from "../../../../actions"
import { randomASCII, randomHEX, countDecorator } from "../../../../util"
import "./index.css"

export const COUNTER = "counter"
export const HEX = "hex"
export const VALUE = "value"

class Cell extends Component {
  constructor(props) {
    super(props)
    const { type, value } = props
    let text = ""
    switch (type) {
      case COUNTER:
        text = countDecorator(value)
        break
      case HEX:
        text = randomHEX()
        break
      case VALUE:
        text = randomASCII()
        break
      default:
        break
    }

    this.state = {
      text,
      isSelect: false
    }
  }

  shouldComponentUpdate({ store: { selected }, position }, { isSelect }) {
    let needUpdate = false
    if (!isSelect && selected && position && selected.length) {
      needUpdate = selected.some(
        ({ x, y }) => x === position.x && y === position.y
      )
      if (!needUpdate) {
        needUpdate = selected[selected.length - 1].y === position.y
      }
    }

    return needUpdate || isSelect
  }

  componentDidUpdate() {
    const {
      store: { selected },
      position
    } = this.props
    const { isSelect } = this.state
    if (selected && position) {
      const removed = !selected.some(
        ({ x, y }) => x === position.x && y === position.y
      )
      if (isSelect && removed) {
        this.setState({ isSelect: false })
      }
      if (!isSelect && !removed) {
        this.setState({ isSelect: true })
      }
    }
  }

  onClick = event => {
    event.stopPropagation()
    if (this.props.type === COUNTER) return
    const { position, click } = this.props
    click(position)
  }

  onMouseDown = event => {
    event.stopPropagation()
    if (this.props.type === COUNTER) return
    const { setSelected, mouseDown, position, click } = this.props
    click(position)
    setSelected(position)
    mouseDown(true)
    this.setState({ isSelect: !this.state.isSelect })
  }

  onMouseUp = event => {
    event.stopPropagation()
    if (this.props.type === COUNTER) return
    const {
      position,
      store: { mouseLeave },
      mouseUp,
      setSelected
    } = this.props

    mouseUp(true)
    if (mouseLeave) {
      setSelected(position)
    }
  }

  onMouseLeave = event => {
    event.stopPropagation()
    if (this.props.type === COUNTER) return
    const { position, mouseLeave } = this.props
    mouseLeave({ leave: true, position })
  }

  render() {
    const {
      type,
      store: { selected },
      position
    } = this.props
    const { text } = this.state

    const added = selected.some(
      ({ x, y }) => x === position.x && y === position.y
    )

    const className = cn({ Cell }, `Cell-${type}`, {
      "Cell-select": added
    })

    return (
      <div
        className={className}
        onClick={this.onClick}
        onMouseDown={this.onMouseDown}
        onMouseLeave={this.onMouseLeave}
        onMouseUp={this.onMouseUp}
      >
        {text}
      </div>
    )
  }
}

const mapStateToProps = store => {
  return {
    store
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setSelected: position => dispatch(setSelected(position)),
    mouseDown: payload => dispatch(mouseDown(payload)),
    mouseLeave: payload => dispatch(mouseLeave(payload)),
    mouseUp: payload => dispatch(mouseUp(payload)),
    click: payload => dispatch(click(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cell)
