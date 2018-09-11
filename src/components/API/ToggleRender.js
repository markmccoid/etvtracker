import React from 'react'
import {Switch} from './Switch'

class ToggleRender extends React.Component {
  state = {on: false}
  static defaultProps = {renderUI: ({on, toggle}) => <Switch on={on} onClick={toggle}  />}
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on})
    )

  render() {
    const {on} = this.state
    return (
      this.props.renderUI({on, toggle: this.toggle})
    )
  }
}

export default ToggleRender;