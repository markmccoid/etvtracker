import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';

const SidebarTagFilterCloud = (props) => {
  
  return (
    <React.Fragment>
      {props.tagsArray.map(tagObj => {
        console.log('tag cloud', tagObj)
        return (
          <Tag.CheckableTag key={tagObj.tagKey} 
            style={{ margin: "5px 2px"}}
            checked={tagObj.isMember}
            onChange={() => {
              console.log('onChange', tagObj.tagKey)
              // Create a single action creator that passes the tagKey
              // then in reducer look for key if it exists, remove it, else add it
                props.setAndTagFilters(tagObj.tagKey)
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
  tagsArray: PropTypes.shape({
    tagKey: PropTypes.string,
    tagName: PropTypes.string,
    tagPosition: PropTypes.number,
    tagSelected: PropTypes.bool,
  }),
  onSelectTag: PropTypes.func,
  onDeselectTag: PropTypes.func
}

export default SidebarTagFilterCloud;