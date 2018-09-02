import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import SidebarList from './SidebarList';
import SidebarSearch from './SidebarSearch';
import SidebarFilter from './SidebarFilter';

import { getSidebarData,
  getTagDataArray,
  getTagFilterData, 
  getTagFilterSummary,
  setTvSearchterm, 
  setTvFilterArray, 
  startUpdateShowPositionInTag,
  addTagToFilter,
  removeTagFromFilter,
  addExcludeTagToFilter,
  removeExcludeTagFromFilter } from '../../store/tvShows';

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
    return (
      <div style={{display: "flex", flexDirection: "column"}}>
        <SidebarSearch history={this.props.history} onSearchTermUpdate={this._onSearchTermUpdate} searchTerm={this.props.searchTerm}/>
        <SidebarFilter 
          tagsArray={this.props.tagsArray} 
          tagFilterData={this.props.tagFilterData}
          excludeTagFilterData={this.props.excludeTagFilterData}
          onFilterChange={this._onFilterChange} 
          tagFilterSummary={this.props.tagFilterSummary}
          addTagToFilter={this.props.addTagToFilter}
          removeTagFromFilter={this.props.removeTagFromFilter}
          addExcludeTagToFilter={this.props.addExcludeTagToFilter}
          removeExcludeTagFromFilter={this.props.removeExcludeTagFromFilter}
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
      state.TV.searchData.tagFilters,
      state.TV.searchData.andFlag,
      state.TV.searchData.excludeTagFilters
    ),
    searchTerm: state.TV.searchData.searchTerm,
    tagsArray: getTagDataArray(null, state.TV.tagData),
    tagFilterData: getTagFilterData(state.TV.tagData, state.TV.searchData.tagFilters),
    excludeTagFilterData: getTagFilterData(state.TV.tagData, state.TV.searchData.excludeTagFilters),
    tagFilters: state.TV.searchData.tagFilters,
    tagFilterSummary: getTagFilterSummary(state.TV.tagData, 
      state.TV.searchData.tagFilters, 
      state.TV.searchData.andFlag,
      state.TV.searchData.excludeTagFilters
    )
  }
}
export default connect(mapStateToProps, 
  { setTvSearchterm, 
    setTvFilterArray, 
    startUpdateShowPositionInTag,
    addTagToFilter,
    removeTagFromFilter,
    addExcludeTagToFilter,
    removeExcludeTagFromFilter })(SidebarContainer);

// <React.Fragment>
// <SidebarList sidebarData={this.props.sidebarData} />
// </React.Fragment>