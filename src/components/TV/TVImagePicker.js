import React from 'react';
import PropTypes from 'prop-types';
import * as css from './style';

import { getImagesForShow } from '../../dataModel';

import TVImageItem from './TVImageItem';

class TVImagePicker extends React.Component {
  state={
    imgArray: []
  }
  componentDidMount() {
    getImagesForShow(this.props.showId)
      .then((resp) => this.setState({imgArray: resp}))
  }
  componentDidUpdate(prevProps) {
    if (this.props.showId !== prevProps.showId) {
      getImagesForShow(this.props.showId)
      .then((resp) => this.setState({imgArray: resp}))
    }
  }
  _onImageSelected = (imageURL) => () => {
    this.props.updateTVImagePoster(this.props.showId, imageURL);
    this.props.toggleImagePicker();
  }
  render() {
    if (!this.props.visible) {
      return null;
    }
    return (
      <div className={css.imagePickerWrapper}>
        {this.state.imgArray.map((imgURL, idx) => <TVImageItem onSelectTVImagePoser={this._onImageSelected(imgURL)} key={idx} imageURL={imgURL} />)}
      </div>
    )
  }
  
};

TVImagePicker.propTypes = {
  visible: PropTypes.bool.isRequired,
  showId: PropTypes.number.isRequired,
  updateTVImagePoster: PropTypes.func,
  toggleImagePicker: PropTypes.func
}
export default TVImagePicker;