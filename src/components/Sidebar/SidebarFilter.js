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
    let { tagsSelected, filterMode, excludeTagsSelected } = this.props.tagFilterSummary;

    let filterSummary = tagsSelected.length ? `${filterMode.toUpperCase()} ->` : 'No Filters Selected'
    tagsSelected.forEach((tag, idx) => {
      filterSummary += `${idx !== 0 ? ',' : '' }${tag} `
    });
    let excludedfilterSummary = excludeTagsSelected.length ? 'Excluded -> ' : 'Nothing Excluded' ;
    excludeTagsSelected.forEach((tag, idx) => {
      excludedfilterSummary += `${idx !== 0 ? ',' : '' }${tag} `;
    })
    
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
                <div className={css.filterWrapper} >
                  { on && 
                    <div style={{ display: "flex", flexDirection: "column"}}>
                      <Button 
                        style={{ marginRight: "5px"}}
                        onClick={() => this.props.removeTagFromFilter()} 
                        icon="close-circle" 
                        type="danger"
                      />
                    
                      <Button 
                        style={{ marginRight: "5px"}}
                        onClick={() => this.props.removeExcludeTagFromFilter()} 
                        icon="close-circle" 
                        type="danger"
                      />
                    </div>
                  }
                  <Button 
                    style={{ marginRight: "5px"}}
                    onClick={toggle}
                    icon="filter"
                    type="primary"
                  />
                  { !on && 
                    <div>
                      <div>{filterSummary}</div>
                      <div>{excludedfilterSummary}</div>
                    </div>
                  }
                  <Box 
                  pose={on ? 'visible' : 'hidden'}
                  className={css.filterTagContainer}
                    >
                    <div style={on ? { display: "flex", flexDirection: "column"} : {display: "none"}}>
                      <Select
                          onChange={(val) => this._onFilterChange('andFlag', val==='and' ? true : false)}
                          defaultValue="or"
                          value={this.state.andFlag ? 'and' : 'or'}
                          style={{fontWeight: "bold"}}
                      >
                          <Option key="and">And</Option>
                          <Option key="or">Or</Option>
                      </Select>
                      <div className={css.excludeTitle}>Exclude</div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column"}}>
                      <div className={css.filterTagCloud} style={on ? {} : {display: "none"}}>
                        <SidebarTagFilterCloud
                          tagFilterData={this.props.tagFilterData}
                          addTagToFilter={this.props.addTagToFilter}
                          removeTagFromFilter={this.props.removeTagFromFilter}
                        />
                      </div>
                      <div className={css.filterTagCloud} style={on ? {} : {display: "none"}}>
                        <SidebarTagFilterCloud
                          tagFilterData={this.props.excludeTagFilterData}
                          addTagToFilter={this.props.addExcludeTagToFilter}
                          removeTagFromFilter={this.props.removeExcludeTagFromFilter}
                        />
                      </div>
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