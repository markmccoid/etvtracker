import React from 'react';
import * as css from './styles';
import { Tag } from 'antd';


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
            {tagShowData.map(tagObj => {
              return (
                <Tag.CheckableTag key={tagObj.tagKey} 
                  style={{ margin: "5px 2px"}}
                  checked={tagObj.isMember}
                  onChange={() => {
                      tagObj.isMember ?
                        props.actionCreators.removeTagFromShow(tagObj.memberKey, tagObj.tagKey)
                      :
                      props.actionCreators.addTagToShow(show.showId, tagObj.tagKey)
                    }
                  }
                >
                  {tagObj.tagName}
                </Tag.CheckableTag>
              )
            })}       
          </div>
      </div>
      </div>
    )
  }

export default QuickTagItem;