import React from 'react';
import * as css from './styles';

import TagCloud from './TagCloud';

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
            <TagCloud tagStyle={{margin: "5px 2px"}}>
              {tagShowData.map(tag => {
                return (
                  <TagCloud.TagItem
                    key={tag.tagKey}
                    tagName={tag.tagName}
                    isSelected={tag.isMember}
                    onSelectTag={() => props.actionCreators.addTagToShow(show.showId || null, tag.tagKey)}
                    onDeSelectTag={() => props.actionCreators.removeTagFromShow(tag.memberKey || null, tag.tagKey)}
                  />
                )
              })
              }
            </TagCloud>
          </div>
      </div>
      </div>
    )
  }

export default QuickTagItem;