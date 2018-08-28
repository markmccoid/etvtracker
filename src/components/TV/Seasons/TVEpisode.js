import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { cx } from 'react-emotion';
import * as css from './TVSeasonStyle';

import TVEpisodeDetail from './TVEpisodeDetail';
class TVEpisode extends React.Component {
  state = {
    TVEpisodeDetailVisible: false
  }
  onShowEpisodeDetail = () => {
    this.setState((prevState) => ({ TVEpisodeDetailVisible: !prevState.TVEpisodeDetailVisible }))
  }
  render() {
    let { episode } = this.props;
    // Setup the object that will hold the parameters for updating the watch/download flags
    let updateObj = {
      showId: this.props.showId,
      seasonId: this.props.seasonId,
      episodeId: episode.id
    }
    
    return (
      <div className={css.episodeMainWrapper}>
        <div className={css.episodeWrapper}>
          <div className={css.episodeNumber}>
            {episode.number}
          </div>
          <div className={css.episodeDetailIcon} onClick={this.onShowEpisodeDetail}>
            {this.state.TVEpisodeDetailVisible ? <Icon type='down' /> : <Icon type='right' />}
          </div>
          <div className={css.episodeNameDateWrapper} onClick={this.onShowEpisodeDetail}>
            <div className={css.episodeName}>
              {episode.name}
            </div>
            <div>
              {episode.airDate}
            </div>
          </div>
          <div className={css.episodeWatchDownload}>
            <div 
              className={cx(css.circle, episode.watched ? css.selected : null)}
              onClick={(e) => {
                  this.props.updateUserEpisodeData({ ...updateObj, userField: 'WATCHED', checkboxState: !episode.watched });
                }
              }
            >
              <Icon type="eye-o" />
            </div>
            <div 
              className={cx(css.circle, episode.downloaded ? css.selected : null)}
              onClick={(e) => this.props.updateUserEpisodeData({ ...updateObj, userField: 'DOWNLOADED', checkboxState: !episode.downloaded })}
            >
              <Icon type="download" />
            </div>
          </div>
        </div>
          <TVEpisodeDetail
            visible={this.state.TVEpisodeDetailVisible}
            episode={episode}
          />
      </div>
    );
  }
}

TVEpisode.propTypes = {
  showId: PropTypes.number,
  seasonId: PropTypes.number,
  episode: PropTypes.object,
  updateUserEpisodeData: PropTypes.func,
};

export default TVEpisode;