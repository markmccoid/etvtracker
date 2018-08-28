import React from 'react';
import PropTypes from 'prop-types';
import * as css from './style';

const TVImageItem = (props) => {
  return (
    <div className={css.imageItem} onClick={props.onSelectTVImagePoser}>
      <img src={props.imageURL} />
    </div>
  );
};

TVImageItem.propTypes = {
  imageURL: PropTypes.string.isRequired,
  onSelectTVImagePoser: PropTypes.func.isRequired
}
export default TVImageItem;

