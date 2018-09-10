import React from 'react'
import {Switch} from './Switch'

class Toggle extends React.Component {
  state = {on: false}
  static On = ({on, children}) => on ? children : null;
  static Off = (props) => props.on ? null : props.children;
  static Button = ({on, toggle, ...props}) => (
    <Switch on={on} onClick={toggle} {...props} />
  )
  toggle = () =>
    this.setState(
      ({on}) => ({on: !on})
    )
  render() {
    const {on} = this.state
    return React.Children.map(this.props.children, child =>
      React.cloneElement(child, {
        on: this.state.on,
        toggle: this.toggle,
      }),
    )
  }
}

export default Toggle;