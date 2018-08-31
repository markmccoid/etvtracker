import React from 'react';
import PropTypes from 'prop-types';
import { Select, Button, Icon, Tooltip } from 'antd';
import { Toggle } from 'react-powerplug';
import posed from 'react-pose';
import * as css from './Style';

import SidebarTagFilterCloud from './SidebarTagFilterCloud';

const Option = Select.Option;

class SidebarFilter extends React.Component {
  state = {
    filterTags: [],
    andFlag: false,
    linkToggle: false,
  }
  componentDidMount() {
    this.props.onFilterChange({ tagFilter:this.state.filterTags, andFlag: this.state.andFlag})
  }
  _onFilterChange = (stateProp, val) => {
    this.setState({
      [stateProp]: val
    },
      () => this.props.onFilterChange({ tagFilter:this.state.filterTags, andFlag: this.state.andFlag})
    );
  }

  render() {
    let { tagsSelected, filterMode } = this.props.tagFilterSummary;

    let filterSummary = tagsSelected.length ? `${filterMode.toUpperCase()} -> ` : 'No Filters Selected'
    tagsSelected.forEach((tag, idx) => {
      filterSummary += `${idx !== 0 ? ',' : '' }${tag} `}
    );
    const config = {
      visible: { opacity: 1, height: '100%', transition: { duration: 1000 } },
      hidden: { opacity: 0, height: 0, transition: { duration: 500 } }
    }
    const Box = posed.div(config);
    return (
        <Toggle initial={false}>
          {({ on, toggle, set }) => {

            return (
              <React.Fragment>
                <div className={css.filterWrapper} style={{display: "flex"}}>
                  <Tooltip title="Clear filters">
                    <Button 
                      style={{ marginRight: "5px"}}
                      onClick={() => this.props.removeTagFromFilter()} 
                      icon="close-circle" 
                      type="danger"
                    />
                  </Tooltip>
                    <Button 
                      style={{ marginRight: "5px"}}
                      onClick={toggle}
                      icon="filter"
                      type="primary"
                    />
                    { !on && <div>{filterSummary}</div>}



                  <Box 
                  pose={on ? 'visible' : 'hidden'}
                  className={css.filterTagContainer}
                  >
                  <div style={on ? {} : {display: "none"}}>
                  <Select
                      onChange={(val) => this._onFilterChange('andFlag', val==='and' ? true : false)}
                      defaultValue="or"
                      value={this.state.andFlag ? 'and' : 'or'}
                  >
                      <Option key="and">And</Option>
                      <Option key="or">Or</Option>
                  </Select>
                </div>
                <div className={css.filterTagCloud} style={on ? {} : {display: "none"}}>
                  <SidebarTagFilterCloud
                    tagFilterData={this.props.tagFilterData}
                    setAndTagFilter={this.props.addTagToFilter}
                    removeTagFromFilter={this.props.removeTagFromFilter}
                  />
                </div>
                </Box>
                </div>

                
                
              </React.Fragment>
          )
          }}
        </Toggle>
    )
  }
}

SidebarFilter.propTypes = {
  tagsArray: PropTypes.arrayOf(
    PropTypes.shape({
      tagKey: PropTypes.string,
      tagName: PropTypes.string,
      tagPosition: PropTypes.number,
      isMember: PropTypes.bool,
      memberKey: PropTypes.string,
    })
  ),
  tagFilterData: PropTypes.arrayOf(
    PropTypes.shape({
      tagKey: PropTypes.string,
      tagPosition: PropTypes.number,
      isSelected: PropTypes.bool
    })
  ),
  onFilterChange: PropTypes.func,
  addTagToFilter: PropTypes.func,
  removeTagFromFilter: PropTypes.func,
}

export default SidebarFilter;