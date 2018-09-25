import React from 'react';
import { connect } from 'react-redux';
import { Input, Button, Tooltip } from 'antd';
import { dmSearchTVByTitle } from '../../../dataModel';

import TVAddItem from './TVAddItem';

class TVAddResults extends React.Component {
  state = {
    searchResults: []
  }

  _prepareResults = (showData) => {
    let searchResults = showData.map(show => {
      let exists = this.props.showIds.find(id => id === show.id) ? true : false;
      return { ...show, exists }
    });
    this.setState({ searchResults });
  }
  componentDidMount() {
    if (this.props.match.params.searchTerm) {
      dmSearchTVByTitle(this.props.match.params.searchTerm)
        .then(data => this._prepareResults(data));
    }
  }
 
  componentDidUpdate(prevProps) {
    if(prevProps.match.params.searchTerm !== this.props.match.params.searchTerm) {
      dmSearchTVByTitle(this.props.match.params.searchTerm)
      .then(data => this._prepareResults(data));
    }
  }

  render() { 
    console.log(this.props)
    return (
      <div>
        {this.state.searchResults.map(show => <TVAddItem key={show.id} show={show} startAddTVShow={this.props.startAddTVShow}/>)}
      </div>
    );
  }
}

export default TVAddResults;