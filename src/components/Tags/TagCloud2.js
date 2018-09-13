import React from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'antd';

class TagCloud2 extends React.Component {
  static TagItem = ({ tagKey, tagName, isSelected, ifTagSelected, ifTagNotSelected, ...props}) => {
    console.log('style prop', props)
    return <Tag.CheckableTag key={tagKey} 
      style={props.tagStyle ? props.tagStyle : { margin: "5px 2px"}}
      checked={isSelected}
      onChange={() => {
        isSelected ?
          ifTagSelected()
          :
          ifTagNotSelected()
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

TagCloud2.propTypes = {
}

export default TagCloud2;