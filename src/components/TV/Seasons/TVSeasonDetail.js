import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Icon, Tooltip, Popover  } from 'antd';
import { cx } from 'react-emotion';
import * as css from './TVSeasonStyle';
import TVEpisode from './TVEpisode';

const TVSeasonDetail = (props) => {
  const onSelectAll = (userField) => {
    // Build update object for firebase update
    // { showId: {
    //    seasonId: {
    //     episodeId: {
    //       watched: true;
    //     }
    //   }
    //  }
    // }
    let episodeObj = {}; //_.keyBy(props.episodes, 'id')
    
    props.episodes.forEach(episode => {
      episodeObj = { ...episodeObj, [episode.id]: { watched: true }};
    });

    let updateObj = {
      showId: [props.showId],
      seasonId: [props.seasonId], 
      episodes: props.episodes,
      userField,
      checkboxState: true
    }
    props.updateAllUserFlags(updateObj)
  }
  return (
    <React.Fragment>
    <div className={css.seasonHeaderIcons} style={{justifyContent: "flex-end"}}>
      <Popover placement="left" 
        title="Mark All"
        content={<div>
          <a onClick={() => onSelectAll('WATCHED')}>Watched</a><hr /> 
          <a onClick={() => onSelectAll('DOWNLOADED')}>Downloaded</a></div>}
      >
        <div className={cx(css.circle)}>
          <Icon type="global" />
        </div>
      </Popover>
    </div>
        {props.episodes.map(episode => {
          return (
              <TVEpisode
                key={episode.id} 
                showId={props.showId}
                seasonId={props.seasonId}
                episode={episode} 
                updateUserEpisodeData={props.updateUserEpisodeData}
              />
          );
        })
      }
    </React.Fragment>
  );
};


TVSeasonDetail.propTypes = {
  showId: PropTypes.number,
  seasonId: PropTypes.number,
  episodes:  PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    airDate: PropTypes.string,
    name: PropTypes.string,
    number: PropTypes.number,
    overview: PropTypes.string,
    stillPath: PropTypes.string,
    downloaded: PropTypes.bool,
    watched: PropTypes.bool
  })).isRequired,
  updateUserEpisodeData: PropTypes.func,
  updateAllUserFlags: PropTypes.func
};

export default TVSeasonDetail;