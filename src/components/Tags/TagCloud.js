import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';

class TagCloud extends React.Component {
  static TagItem = ({ tagName, isSelected, onDeSelectTag, onSelectTag, ...props}) => {
    return <Tag.CheckableTag
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

TagCloud.TagItem.propTypes = {
  tagName: PropTypes.string.isRequired,
  isSelected: PropTypes.bool.isRequired,
  onDeSelectTag: PropTypes.func.isRequired,
  onSelectTag: PropTypes.func.isRequired,
}

export default TagCloud;