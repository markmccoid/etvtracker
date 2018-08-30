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
        <div style={{ display: "flex"}}>
          <Select
            onChange={(val) => this._onFilterChange('andFlag', val==='and' ? true : false)}
            defaultValue="or"
          >
            <Option key="and">And</Option>
            <Option key="or">Or</Option>
          </Select>
          <Select
            mode="multiple"
            allowClear
            placeholder="Filter by Tags"
            style={{ width: '100%' }}
            onChange={(val) => this._onFilterChange('filterTags', val)}
          >
            {this.props.tagsArray.map(tagObj => <Option key={tagObj.tagKey}>{tagObj.tagName}</Option>)}
            
          </Select>
        </div>
        <div>
          <SidebarTagFilterCloud
            tagsArray={this.props.tagsArray}
            setAndTagFilters={this.props.setAndTagFilters}
            removeAdTagFilter={this.props.removeAdTagFilter}
            onClickIsMember={(key, tagKey) => console.log(tagKey)}
            onClickIsNotMember={(key, tagKey) => console.log(tagKey)}
          />
        </div>
      </div>
    )
  }
}

export default SidebarFilter;
