import React from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';

import SidebarItem from './SidebarItem';

import { ListContainer, listItemContainer } from './Style';

const NullSearch = () => (<div className={listItemContainer} style={{padding: "5px"}}>No Shows Found</div>)

const SidebarList = (props) => {
  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "",
    width: "100%"
  });

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: "5px",
    margin: `0 0 10px 0`,
  
    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",
  
    // styles we need to apply on draggables
    ...draggableStyle
  });


  return (
    <Droppable droppableId="sidebarItems">
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          style={getListStyle(snapshot.isDraggingOver)}
        >
          {props.sidebarData.length ? 
            props.sidebarData.map((show, index) => {
              return <Draggable key={show.showId} draggableId={show.showId} index={index}>
                {(provided, snapshot) => (

                    <SidebarItem 
                      key={show.showId} 
                      showItemData={show}
                      provided={provided} 
                      snapshot={snapshot} />
                  )
                }
              </Draggable>
              }
            )
            :
            <NullSearch />
          }
          {provided.placedholder}
        </div>
      )}
        
    </Droppable>
  );
};

export default SidebarList;

// const SidebarList = (props) => {
//   return (
//     <ListContainer>
//       {props.sidebarData.map(show => <SidebarItem key={show.id} showId={show.id} showName={show.name} />)}
//     </ListContainer>
//   );
// };

//<SidebarItem key={show.id} showId={show.id} showName={show.name} provided={provided} snapshot={snapshot} />