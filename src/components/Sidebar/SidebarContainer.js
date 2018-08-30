import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import SidebarList from './SidebarList';
import SidebarSearch from './SidebarSearch';
import SidebarFilter from './SidebarFilter';

import { getSidebarData, 
  setTvSearchterm, 
  setTvFilterArray, 
  getTagDataArray, 
  startUpdateShowPositionInTag,
  setAndTagFilters,
  removeAdTagFilter } from '../../store/tvShows';

class SidebarContainer extends React.Component {

  onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    // make sure they moved it, if not return
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newShowObects = Array.from(this.props.sidebarData);
    const showToMove = {...this.props.sidebarData[source.index]}
    // Remove the moved show from the array
    newShowObects.splice(source.index, 1);
    // put show back in the new spot
    newShowObects.splice(destination.index, 0, showToMove);
    
    // get new list of showId(s) and positions
    let newPositionMap = newShowObects.map((show,idx) => ({ showId: show.showId, position: idx+1}));

    // If not filters, then don't do anything
    if (this.props.tagFilter.length === 0) {
      return;
    }
    // Call action creator to update positions for tag
    // Currently just updating the first tagKey
    this.props.startUpdateShowPositionInTag(this.props.tagFilter[0], newPositionMap);
  }
  _onFilterChange = (filterArray) => this.props.setTvFilterArray(filterArray)
  _onSearchTermUpdate = (searchTerm) => this.props.setTvSearchterm(searchTerm);

  render() {
    return (
      <div style={{display: "flex", flexDirection: "column"}}>
        <SidebarSearch history={this.props.history} onSearchTermUpdate={this._onSearchTermUpdate} searchTerm={this.props.searchTerm}/>
        <SidebarFilter 
          tagsArray={this.props.tagsArray} 
          onFilterChange={this._onFilterChange} 
          setAndTagFilters={this.props.setAndTagFilters}
          removeAdTagFilter={this.props.removeAdTagFilter}
        />
        <DragDropContext onDragEnd={this.onDragEnd}>
          <SidebarList sidebarData={this.props.sidebarData} />
        </DragDropContext>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    sidebarData: getSidebarData(state.TV.showData, 
      state.TV.searchData.searchTerm, 
      state.TV.tagData, 
      state.TV.searchData.tagFilter,
      state.TV.searchData.filterMode,
    ),
    searchTerm: state.TV.searchData.searchTerm,
    tagsArray: getTagDataArray(null, state.TV.tagData),
    tagFilter: state.TV.searchData.tagFilter,
  }
}
export default connect(mapStateToProps, 
  { setTvSearchterm, 
    setTvFilterArray, 
    startUpdateShowPositionInTag,
    setAndTagFilters,
    removeAdTagFilter })(SidebarContainer);

// <React.Fragment>
// <SidebarList sidebarData={this.props.sidebarData} />
// </React.Fragment>