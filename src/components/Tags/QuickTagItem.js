import React from 'react';
import * as css from './styles';

import TagCloud from '../Tags/TagCloud';
import TagCloud2 from '../Tags/TagCloud2';


const QuickTagItem = (props) => {
  let { show, tagShowData } = props;
    return (
      <div className={css.QTShowWrapper}>
        <div className={css.QTSLeft}>
          <div className={css.QTSTitle}>
            {show.name}
          </div>
          <img src={show.backdropPath} />
        </div>
        <div className={css.QTSRight}>
          <div className={css.QTSRightTitle}>
            Tags
          </div>
          <div>
            {/* <TagCloud
              tagsArray={tagShowData}
              onClickIsMember={props.actionCreators.removeTagFromShow}
              onClickIsNotMember={props.actionCreators.addTagToShow}
              showId={show.showId}
            /> */}
            <TagCloud2 tagStyle={{margin: "5px 2px"}}>
              {tagShowData.map(tag => {
                return (
                  <TagCloud2.TagItem
                    key={tag.tagKey}
                    tagKey={tag.tagKey}
                    tagName={tag.tagName}
                    isSelected={tag.isMember}
                    ifTagSelected={() => props.actionCreators.removeTagFromShow(tag.memberKey || null, tag.tagKey)}
                    ifTagNotSelected={() => props.actionCreators.addTagToShow(show.showId || null, tag.tagKey)}
                  />
                )
              })
              }
            </TagCloud2>
          </div>
      </div>
      </div>
    )
  }

export default QuickTagItem;