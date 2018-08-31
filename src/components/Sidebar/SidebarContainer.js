import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import SidebarList from './SidebarList';
import SidebarSearch from './SidebarSearch';
import SidebarFilter from './SidebarFilter';

import { getSidebarData,
  getTagDataArray,
  getTagFilterData, 
  setTvSearchterm, 
  setTvFilterArray, 
  startUpdateShowPositionInTag,
  setAndTagFilters,
  removeAndTagFilter } from '../../store/tvShows';

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

    // If no filters or more than 1 don't reorder
    if (this.props.tagFilters.length != 1) {
      return;
    }
    // Call action creator to update positions for tag
    // Currently just updating the first tagKey
    this.props.startUpdateShowPositionInTag(this.props.tagFilters[0], newPositionMap);
  }
  _onFilterChange = (filterArray) => this.props.setTvFilterArray(filterArray)
  _onSearchTermUpdate = (searchTerm) => this.props.setTvSearchterm(searchTerm);

  render() {
    console.log('SBD2', this.props.tagFilters);
    return (
      <div style={{display: "flex", flexDirection: "column"}}>
        <SidebarSearch history={this.props.history} onSearchTermUpdate={this._onSearchTermUpdate} searchTerm={this.props.searchTerm}/>
        <SidebarFilter 
          tagsArray={this.props.tagsArray} 
          tagFilterData={this.props.tagFilterData}
          onFilterChange={this._onFilterChange} 
          setAndTagFilters={this.props.setAndTagFilters}
          removeAndTagFilter={this.props.removeAndTagFilter}
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
      state.TV.searchData.andTagFilters,
      state.TV.searchData.filterMode,
    ),
    searchTerm: state.TV.searchData.searchTerm,
    tagsArray: getTagDataArray(null, state.TV.tagData),
    tagFilterData: getTagFilterData(state.TV.tagData, state.TV.searchData.andTagFilters),
    tagFilters: state.TV.searchData.andTagFilters
  }
}
export default connect(mapStateToProps, 
  { setTvSearchterm, 
    setTvFilterArray, 
    startUpdateShowPositionInTag,
    setAndTagFilters,
    removeAndTagFilter })(SidebarContainer);

// <React.Fragment>
// <SidebarList sidebarData={this.props.sidebarData} />
// </React.Fragment>