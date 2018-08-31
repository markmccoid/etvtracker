import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';

const SidebarTagFilterCloud = (props) => {
  
  return (
    <React.Fragment>
      {props.tagFilterData.map(tagObj => {
        return (
          <Tag.CheckableTag key={tagObj.tagKey} 
            style={{ margin: "5px 2px"}}
            checked={tagObj.isSelected}
            onChange={() => {
              tagObj.isSelected ?
                props.removeTagFromFilter(tagObj.tagKey)
                :
                props.setAndTagFilter(tagObj.tagKey)
              }
            }
          >
            {tagObj.tagName}
          </Tag.CheckableTag>
        )
      })}
    </React.Fragment>
  );
}

SidebarTagFilterCloud.propTypes = {
  tagFilterData: PropTypes.arrayOf(PropTypes.shape({
    tagKey: PropTypes.string,
    tagName: PropTypes.string,
    tagPosition: PropTypes.number,
    isSelected: PropTypes.bool,
  })),
  removeTagFromFilter: PropTypes.func,
  setAndTagFilter: PropTypes.func
}

export default SidebarTagFilterCloud;