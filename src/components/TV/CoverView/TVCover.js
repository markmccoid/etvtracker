import React from 'react';
import PropTypes from 'prop-types';

import TVCoverItem from './TVCoverItem';
import TVCoverViewContainer from './TVCoverViewContainer';
import TagCloud from '../../Tags/TagCloud';

import * as myStyles from './Style';

const TVCover = (props) => {
  return(
    <TVCoverViewContainer>
    {
      ({showDataArray, tagFilterData, addTagToFilter, removeTagFromFilter, setTvFilterAndFlag, andFlag}) => (
        <React.Fragment>
          <div style={{display: "flex"}}>
            <div style={{display: "flex", flexDirection: "column", border: "1px solid black"}}>
              <TagCloud>
                <TagCloud.TagItem 
                  key="Or"
                  tagName="Or"
                  isSelected={!andFlag}
                  onSelectTag={() => setTvFilterAndFlag(false)}
                  onDeSelectTag={() => setTvFilterAndFlag(true)}
                />
                <TagCloud.TagItem 
                  key="And"
                  tagName="And"
                  isSelected={andFlag}
                  onSelectTag={() => setTvFilterAndFlag(true)}
                  onDeSelectTag={() => setTvFilterAndFlag(false)}
                />
              </TagCloud>
            </div>
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
          </div>
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