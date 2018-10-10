import React from 'react';
import PropTypes from 'prop-types';
import { Icon } from 'antd';
import { cx } from 'react-emotion/macro';
import * as css from './TVSeasonStyle';

const TVEpisodeDetail = (props) => {
  if (!props.visible) {
    return null;
  }
  return (
    <div className={css.EpDetailWrapper}>

      <img className={css.epDetailImage} src={props.episode.stillPath} />
      <div className={css.epDetailOverview} >{props.episode.overview}</div>
    </div>
  );
}
  


TVEpisodeDetail.propTypes = {
  showId: PropTypes.number,
  seasonId: PropTypes.number,
  episode: PropTypes.shape({
    id: PropTypes.number,
    airDate: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.number,
    overview: PropTypes.string,
    stillPath: PropTypes.string,
    downloaded: PropTypes.bool,
    watched: PropTypes.bool
  }).isRequired,
  updateUserEpisodeData: PropTypes.func,
};

export default TVEpisodeDetail;