import React from 'react';

import TVCoverItem from './TVCoverItem';
import TVCoverViewContainer from './TVCoverViewContainer';


import * as myStyles from './Style';

const TVCover = (props) => {
  return(
    <TVCoverViewContainer>
    {
      (showDataArray) => (
        <myStyles.CoverWrapper>
          {showDataArray.map(show => {
            return (
              <TVCoverItem key={show.showId} show={show} />
            )
          })}
        </myStyles.CoverWrapper>
      )
    }
    </TVCoverViewContainer>
  )
}

export default TVCover;