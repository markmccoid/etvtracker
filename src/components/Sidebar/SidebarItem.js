import React from 'react';
import PropTypes from 'prop-types';

import { listItemContainer, ListItemLink } from './Style';
import { formatDateFromStorage } from '../../utils/dates';
import { cx } from 'react-emotion';

import  * as ecss from './Style';

const SidebarItem = (props) => {
  let { provided, snapshot } = props;
  let { showId, name, 
    nextEpisodeDate, nextEpisodeName, 
    nextEpisodeNumber, nextEpisodeSeason, 
    nextEpisodeType, backdropPath } = props.showItemData;
   
  let nextCSS = nextEpisodeType && ecss[nextEpisodeType.toLowerCase()]
  return (
    <div className={listItemContainer}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <ListItemLink to={`/tv/detail/${showId}`}>
          <div className={ecss.showTextContainer}>
            <div className={ecss.showText}>
              {`${name} - (${showId})`}
            </div>
            <div className={cx(ecss.baseNext, nextCSS)}>
              {`${nextEpisodeType} Episode on ${formatDateFromStorage(nextEpisodeDate)}: #${nextEpisodeNumber}`}
            </div>
          </div>
      </ListItemLink>
    </div>
  );
};

SidebarItem.propTypes = {
  showItemData: PropTypes.shape({
    backdropPath: PropTypes.string,    
    episodeType: PropTypes.string,
    firstAirDate: PropTypes.number,
    genres: PropTypes.array,
    lastAirDate: PropTypes.number,
    lastRefresh: PropTypes.number,
    name: PropTypes.string,
    nextEpisodeType: PropTypes.string,
    nextEpisodeDate: PropTypes.number,
    nextEpisodeName: PropTypes.string,
    nextEpisodeNumber: PropTypes.number,
    nextEpisodeSeason: PropTypes.number,
    overview: PropTypes.string,
    posterPath: PropTypes.string,
    showId: PropTypes.number,
    status: PropTypes.string,
    totalEpisodes: PropTypes.number,
    totalSeasons: PropTypes.number,
  })
}
export default SidebarItem;

// const SidebarItem = (props) => {
//   return (
//     <ListItem>
//       <ListItemLink to={`/tv/${props.showId}`}>
//         {props.showId} <br/> {props.showName}
//       </ListItemLink>
//     </ListItem>
//   );
// };