import React from 'react';
import { Input, Button, Tooltip } from 'antd';
import { dmSearchTVByTitle } from '../../../dataModel';

import TVAddItem from './TVAddItem';

class TVAddResults extends React.Component {
  state = {
    searchResults: []
  }

  componentDidMount() {
    if (this.props.match.params.searchTerm) {
      dmSearchTVByTitle(this.props.match.params.searchTerm)
        .then(data => this.setState({searchResults: data}));
    }
  }
 
  componentDidUpdate(prevProps) {
    if(prevProps.match.params.searchTerm !== this.props.match.params.searchTerm) {
      dmSearchTVByTitle(this.props.match.params.searchTerm)
        .then(data => this.setState({searchResults: data}));
    }
  }

  render() { 
    
    return (
      <div>
        {this.state.searchResults.map(show => <TVAddItem key={show.id} show={show} startAddTVShow={this.props.startAddTVShow}/>)}
      </div>
    );
  }
}

export default TVAddResults;