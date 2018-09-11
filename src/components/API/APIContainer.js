import React from 'react';
import Toggle from './Toggle';
import ToggleC from './ToggleContext';
import ToggleRender from './ToggleRender';
import {Switch} from './Switch'

class APIContainer extends React.Component {
  render() {
    return (
      <div><h3>API Container</h3>
      <Toggle>
        <Toggle.On>Yup me is on</Toggle.On>
        <Toggle.Off>Yup me is off</Toggle.Off>
        <Toggle.Button />
      </Toggle>
      <ToggleC>
        <ToggleC.On>Yup me is on</ToggleC.On>
        <div><ToggleC.Off>Yup me is off</ToggleC.Off></div>
        <ToggleC.Button />
      </ToggleC>
      <ToggleRender renderUI={({on, toggle }) => (
        <React.Fragment>
          <Switch on={on} onClick={toggle}  />
          <button onClick={toggle}>{on ? 'off' : 'on'}</button>
        </React.Fragment>
      )
      } />
      <ToggleRender />
      </div>
    );
  }
}

export default APIContainer;

{/* <ToggleRender>
{({on, toggle }) => (
  <React.Fragment>
    <Switch on={on} onClick={toggle}  />
    <button onClick={toggle}>{on ? 'off' : 'on'}</button>
  </React.Fragment>
)
}
</ToggleRender> */}