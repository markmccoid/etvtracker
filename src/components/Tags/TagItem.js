import React from 'react';
import _ from 'lodash';
import { Icon, Button } from 'antd';

import * as css from './styles';

const TagItem = (props) => {
  let { provided, snapshot, tagKey, tagName, onDeleteTagName } = props;
  return (
    <div className={css.tagItem}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <div className={css.deleteButton}>
        <Button icon="delete" type='danger' 
          onClick={() => onDeleteTagName(tagKey)}
        ></Button>
      </div>
      <div className={css.tagName}>
        {tagName}
      </div>
    </div>
  )
};

export default TagItem;