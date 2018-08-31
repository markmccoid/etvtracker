import React from 'react';
import { Select } from 'antd';
import SidebarTagFilterCloud from './SidebarTagFilterCloud';

const Option = Select.Option;

class SidebarFilter extends React.Component {
  state = {
    filterTags: [],
    andFlag: false
  }
  componentDidMount() {
    this.props.onFilterChange({ tagFilter:this.state.filterTags, filterMode: this.state.andFlag})
  }
  _onFilterChange = (stateProp, val) => {
    this.setState({
      [stateProp]: val
    },
      () => this.props.onFilterChange({ tagFilter:this.state.filterTags, filterMode: this.state.andFlag})
    );
  }

  render()
  {
    return (
      <div>
        <Select
            onChange={(val) => this._onFilterChange('andFlag', val==='and' ? true : false)}
            defaultValue="or"
        >
            <Option key="and">And</Option>
            <Option key="or">Or</Option>
        </Select>
        <SidebarTagFilterCloud
          tagFilterData={this.props.tagFilterData}
          setAndTagFilter={this.props.setAndTagFilters}
          removeAndTagFilter={this.props.removeAndTagFilter}
          onClickIsMember={(key, tagKey) => console.log(tagKey)}
          onClickIsNotMember={(key, tagKey) => console.log(tagKey)}
        />
      </div>
    )
  }
}

export default SidebarFilter;
