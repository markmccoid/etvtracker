import React from 'react';

import TVCoverItem from './TVCoverItem';
import TVCoverViewContainer from './TVCoverViewContainer';
import TagCloud from '../../Tags/TagCloud';

import * as myStyles from './Style';

const TVCover = (props) => {
  return(
    <TVCoverViewContainer>
    {
      ({showDataArray, tagFilterData, addTagToFilter, removeTagFromFilter, andFlag}) => (
        <React.Fragment>
          <TagCloud>
            <TagCloud.TagItem 
              key="Or"
              tagName="Or"
              isSelected={andFlag}
              onSelectTag={() => console.log('onSelect')}
              onDeSelectTag={() => console.log('onDeSelect')}
            />
          </TagCloud>
          <TagCloud tagStyle={{margin: "5px 2px"}}>
            {tagFilterData.map(tag => {
              return (
                <TagCloud.TagItem
                  key={tag.tagKey}
                  tagName={tag.tagName}
                  isSelected={tag.isSelected}
                  onSelectTag={() => addTagToFilter(tag.tagKey)}
                  onDeSelectTag={() => removeTagFromFilter(tag.tagKey)}
                />
              )
              })
              }
            </TagCloud>
          <myStyles.CoverWrapper>
            {showDataArray.map(show => {
              return (
                <TVCoverItem key={show.showId} show={show} />
              )
            })}
          </myStyles.CoverWrapper>
        </React.Fragment>
      )
    }
    </TVCoverViewContainer>
  )
}

export default TVCover;