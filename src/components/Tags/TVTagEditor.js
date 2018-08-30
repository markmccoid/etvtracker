import React from 'react';
import { connect } from 'react-redux';
import { Input, Button } from 'antd';
import { DragDropContext } from 'react-beautiful-dnd';
import _ from 'lodash';

import { getAllShowData, startAddTagName, 
  startDeleteTagName, startUpdateTagPosition, 
  getTagDataWithMembers,
  startAddTagToShow,
  startRemoveTagFromShow } from '../../store/tvShows';
import * as css from './styles';
import TagContainer from './TagContainer';
import QuickTagShows from './QuickTagShows';

class TVTagEditor extends React.Component {
  state = {
    tags: []
  }
  _onSaveTagName = () => {
    const tagName = this.nameInput.input.value.trim();
    if (tagName.length > 0) {
      this.props.startAddTagName(tagName);
    }
    // this.setState((prevState) => { 
    //   let newState = [...prevState.tags, tagName ];
    //   return {tags: newState}
    //   }
    // );
    this.nameInput.input.value = '';
    this.nameInput.focus();
  }
  
  _onDragEnd = (result) => {
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
    
    let tagPositionData = this.props.tagData;
    const tagToMove = {...this.props.tagData[source.index]}
    // Remove the moved show from the array
    tagPositionData.splice(source.index, 1);
    // put show back in the new spot
    tagPositionData.splice(destination.index, 0, tagToMove);
    let tagPosArray = tagPositionData.map((tag, idx) => {
      return {
        tagKey: tag.tagKey,
        tagPosition: idx + 1
      }
    });
    this.props.startUpdateTagPosition(tagPosArray)
  }

  render() {
    return (
      <div className={css.tagContainer}>
        <div className={css.tagWrapper}>
          <h2>Add Tag</h2>
          <Input
            style={{width: "300px"}}
            type="text"
            placeholder="Enter Tag Name"
            ref={(input) => { this.nameInput = input; }} 
            autoFocus
          />
          <div style={{marginTop: "10px"}}>
            <Button onClick={this._onSaveTagName}>Save</Button>
          </div>
          <hr />
          <DragDropContext onDragEnd={this._onDragEnd}>
            <TagContainer tags={this.props.tagData} onDeleteTagName={this.props.startDeleteTagName} />
          </DragDropContext>
        </div>
        <div className={css.showWrapper}>
          <h2>Quick Tag Shows</h2>
          <QuickTagShows 
            showData={this.props.showData}
            tagData={this.props.reduxTagData}  
            actionCreators={{addTagToShow: this.props.startAddTagToShow, removeTagFromShow: this.props.startRemoveTagFromShow}}
            addTagToShow={this.props.startAddTagToShow}
            removeTagFromShow={this.props.startRemoveTagFromShow}
            />
        </div>
      </div>
    );
  }
} 




// tagData: { fbKey: { tagName }}
const mapStateToProps = (state) => {
  return {
    tagData: getTagDataWithMembers(state.TV.tagData),
    showData: getAllShowData(state.TV.showData),
    reduxTagData: state.TV.tagData,
  }
}
export default connect(mapStateToProps, {
  startAddTagName, startDeleteTagName, startUpdateTagPosition,
  startRemoveTagFromShow, startAddTagToShow
})(TVTagEditor);