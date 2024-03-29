import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-beautiful-dnd';

import SidebarList from './SidebarList';
import SidebarSearch from './SidebarSearch';
import SidebarFilter from './SidebarFilter';
import LoadingPage from '../common/LoadingPage';

import { getSidebarData,
  getTagDataArray,
  getTagFilterData, 
  getTagFilterSummary,
  setTvSearchterm, 
  setTvSort,
  setTvFilterAndFlag, 
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
  _onSetTVAndFlag = (andFlag) => this.props.setTvFilterAndFlag(andFlag)
  _onSearchTermUpdate = (searchTerm) => this.props.setTvSearchterm(searchTerm);
  _onSortByUpdate = (sortBy) => this.props.setTvSort(sortBy);
  render() {
    return (
      <div style={{display: "flex", flexDirection: "column"}}>
      {!this.props.sidebarData.length && !this.props.searchTerm ? <LoadingPage /> : null }
        <SidebarSearch 
          history={this.props.history} 
          onSearchTermUpdate={this._onSearchTermUpdate} 
          searchTerm={this.props.searchTerm}
          sortBy={this.props.sortBy}
          onSortByUpdate={this._onSortByUpdate}
        />
        <SidebarFilter 
          tagsArray={this.props.tagsArray} 
          tagFilterData={this.props.tagFilterData}
          excludeTagFilterData={this.props.excludeTagFilterData}
          setTVAndFlag={this._onSetTVAndFlag}
          andFlag={this.props.andFlag} 
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
      state.TV.searchData.excludeTagFilters,
      state.TV.searchData.sortBy,
    ),
    searchTerm: state.TV.searchData.searchTerm,
    sortBy: state.TV.searchData.sortBy,
    tagsArray: getTagDataArray(null, state.TV.tagData),
    tagFilterData: getTagFilterData(state.TV.tagData, state.TV.searchData.tagFilters),
    excludeTagFilterData: getTagFilterData(state.TV.tagData, state.TV.searchData.excludeTagFilters),
    tagFilters: state.TV.searchData.tagFilters,
    andFlag: state.TV.searchData.andFlag,
    tagFilterSummary: getTagFilterSummary(state.TV.tagData, 
      state.TV.searchData.tagFilters, 
      state.TV.searchData.andFlag,
      state.TV.searchData.excludeTagFilters
    )
  }
}
export default connect(mapStateToProps, 
  { setTvSearchterm,
    setTvSort, 
    setTvFilterAndFlag, 
    startUpdateShowPositionInTag,
    addTagToFilter,
    removeTagFromFilter,
    addExcludeTagToFilter,
    removeExcludeTagFromFilter })(SidebarContainer);

// <React.Fragment>
// <SidebarList sidebarData={this.props.sidebarData} />
// </React.Fragment>