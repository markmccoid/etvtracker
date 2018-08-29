import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';

const TagCloud = (props) => {
  
  return (
    <React.Fragment>
      {props.tagsArray.map(tagObj => {
        console.log('tag cloud', tagObj)
        return (
          <Tag.CheckableTag key={tagObj.tagKey} 
            style={{ margin: "5px 2px"}}
            checked={tagObj.isMember}
            onChange={() => {
                tagObj.isMember ?
                  props.onClickIsMember(tagObj.memberKey || null, tagObj.tagKey)
                :
                props.onClickIsNotMember(props.showId || null, tagObj.tagKey)
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

TagCloud.propTypes = {
  tagsArray: PropTypes.array,
  showId: PropTypes.number,
  onClickIsMember: PropTypes.func,
  onClickIsNotMember: PropTypes.func,
}

export default TagCloud;