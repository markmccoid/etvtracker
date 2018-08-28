import React from 'react';
import { Icon, Button } from 'antd';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import _ from 'lodash';

import * as css from './styles';
import TagItem from './TagItem';
//==========================================
//--Tag View Component
//==========================================
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "",
  width: "100%"
});

const TagContainer = (props) => {
  return (
    <Droppable droppableId="tagItems">
    {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
      {props.tags.map((tag, index) => {
          let { tagKey, tagName, tagPosition } = tag;
          return <Draggable key={tagKey} draggableId={tagKey} index={index}>
            {(provided, snapshot) => (
              <TagItem 
                key={tagKey}
                provided={provided}
                snapshot={snapshot}
                tagKey={tagKey} 
                tagName={tagName} 
                onDeleteTagName={props.onDeleteTagName} 
              />
            )
            }
            </Draggable>
          }
          )  
        }
        {provided.placedholder}
        </div>
      )}
    </Droppable>
  )
};

//==========================================
//--Tag Member Component
//==========================================
const TagMembers = ({tagMemberData}) => {
  return (
    <div>
      {tagMemberData.map((member,idx) => <div key={member.showId || idx}>{member.showId}-{member.showName}</div>)}
    </div>
  )
}

export default TagContainer;


// {Object.keys(props.tags).map((tagKey, index) => {
//   return <Draggable key={tagKey} draggableId={tagKey} index={index}>
//     {(provided, snapshot) => (
//       <TagItem 
//         key={tagKey}
//         provided={provided}
//         snapshot={snapshot}
//         tagKey={tagKey} 
//         tags={props.tags} 
//         onDeleteTagName={props.onDeleteTagName} 
//       />
//     )
//     }
//     </Draggable>
//   }
//   )  
// }