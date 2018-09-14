import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';

class TagCloud extends React.Component {
  static TagItem = ({ tagKey, tagName, isSelected, onDeSelectTag, onSelectTag, ...props}) => {

    return <Tag.CheckableTag key={tagKey} 
      style={props.tagStyle ? props.tagStyle : { margin: "5px 2px"}}
      checked={isSelected}
      onChange={() => {
        isSelected ?
          onDeSelectTag()
          :
          onSelectTag()
        }
      }
    >
      {tagName}
    </Tag.CheckableTag>
  }
  render() {
    return (
      React.Children.map(this.props.children, child =>
        React.cloneElement(child, {
          ...this.props
        })
      )
    );
  }
}

TagCloud.propTypes = {
}

export default TagCloud;