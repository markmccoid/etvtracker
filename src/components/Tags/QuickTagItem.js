import React from 'react';
import * as css from './styles';

import TagCloud from '../Tags/TagCloud';


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
            <TagCloud
              tagsArray={tagShowData}
              onClickIsMember={props.actionCreators.removeTagFromShow}
              onClickIsNotMember={props.actionCreators.addTagToShow}
              showId={show.showId}
            />
          </div>
      </div>
      </div>
    )
  }

export default QuickTagItem;