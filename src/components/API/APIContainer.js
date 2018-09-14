import React from 'react';
import Toggle from './Toggle';
import ToggleC from './ToggleContext';
import ToggleRender from './ToggleRender';
import {Switch} from './Switch'
import TagCloud from '../Tags/TagCloud';

class APIContainer extends React.Component {
  state = {
    tag1: {key: 'a', name: 'tag1', isSelected: true},
    tag2: {key: 'b', name: 'tag2', isSelected: true}
  }
  render() {
    return (
      <div><h3>API Container</h3>
      <TagCloud>
        <TagCloud.TagItem 
          tagKey={this.state.tag1.key}
          tagName={this.state.tag1.name}
          isSelected={this.state.tag1.isSelected}
          ifTagSelected={() => {console.log('running'); this.setState({tag1: {key: 'a', name: 'tag1', isSelected: false}})}}
          ifTagNotSelected={() => this.setState((prevState) => ({tag1: {...prevState.tag1, isSelected: true}}))}
        />
        <TagCloud.TagItem 
          tagKey={this.state.tag2.key}
          tagName={this.state.tag2.name}
          isSelected={this.state.tag2.isSelected}
          ifTagSelected={() => this.setState((prevState) => ({tag2: {...prevState.tag2, isSelected: false}}))}
          ifTagNotSelected={() => this.setState((prevState) => ({tag2: {...prevState.tag2, isSelected: true}}))}
        />
      </TagCloud>
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