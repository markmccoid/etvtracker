import React from 'react';
import { connect } from 'react-redux';
import TVSeasonContainer from './Seasons/TVSeasonContainer';
import TVImagePicker from './TVImagePicker';

import { 
  getCurrentShow, 
  getCurrentSeasons, // This will merge userData (downloaded/watched) into episode array
  getExtraDataForShow,
  getTagDataArray,
  startDeleteTVShow,
  startUpdateUserEpisodeData,
  startUpdateAllUserFlags,
  startUpdateTVImagePoster,
  startRefreshTvShow, 
  startAddTagToShow,
  startRemoveTagFromShow,
  startAddLinkToShow,
  startRemoveLinkFromShow,
  helperTest, } from '../../store/tvShows'

import TVDetail from './TVDetail';

class TVContainer extends React.Component {
  state = {
    imagePickerVisible: false,
  }
  componentDidUpdate(prevProps) {
    if (this.props.showData.showId !== prevProps.showData.showId) {
      this.setState({imagePickerVisible: false});
      this.props.startRefreshTvShow(this.props.showData.showId, this.props.showData.status)
    }
  }
  _onToggleImagePicker = () => {
    this.setState((prevState) => ({ imagePickerVisible: !prevState.imagePickerVisible}));
  }

  render() {
    return (<div>
      <TVDetail 
        showData={this.props.showData} 
        seasonData={this.props.seasonData}
        extraData={this.props.extraData}
        userLinks={this.props.userLinks}
        startDeleteTVShow={this.props.startDeleteTVShow}
        startRefreshTvShow={this.props.startRefreshTvShow}
        routeToTV={() => this.props.history.push("/tv")}
        tagsArray={this.props.tagsArray}
        toggleImagePicker={this._onToggleImagePicker}
        addTagToShow={this.props.startAddTagToShow}
        removeTagFromShow={this.props.startRemoveTagFromShow}
        addLinkToShow={this.props.startAddLinkToShow}
        removeLinkFromShow={this.props.startRemoveLinkFromShow}
      />
      <TVImagePicker 
        visible={this.state.imagePickerVisible} 
        showId={this.props.showData.showId}  
        updateTVImagePoster={this.props.startUpdateTVImagePoster}
        toggleImagePicker={this._onToggleImagePicker}
      />
      <TVSeasonContainer 
        seasonData={this.props.seasonData}
        showId={this.props.showData.showId}
        updateUserEpisodeData={this.props.startUpdateUserEpisodeData}
        updateAllUserFlags={this.props.startUpdateAllUserFlags}
      />
    </div>);
  }
}

const mapStateToProps = (state, props) => {
  // is the showId being used for routing
  let showId = props.match ? props.match.params.id : props.coverShowId;
  return {
    showData: getCurrentShow(showId, state.TV.showData, state.TV.userData),
    seasonData: getCurrentSeasons(showId, state.TV.seasonData, state.TV.userData),
    //seasonsSummaryData : getSeasonsSummaryData(showId, state.TV.seasonData, state.TV.userData),
    extraData: getExtraDataForShow(showId, state.TV.extraData),
    tagsArray: getTagDataArray(showId, state.TV.tagData),
    userLinks: state.TV.userData[showId] ? state.TV.userData[showId].links : undefined,
  }
}
export default connect(mapStateToProps, { startDeleteTVShow, 
  startUpdateUserEpisodeData, 
  startUpdateAllUserFlags,
  startUpdateTVImagePoster,
  startRefreshTvShow,
  startAddTagToShow,
  startRemoveTagFromShow,
  startAddLinkToShow,
  startRemoveLinkFromShow })(TVContainer);