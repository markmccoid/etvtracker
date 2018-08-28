import React from 'react';
import { Input, Button, Tooltip } from 'antd';
import { Route } from 'react-router-dom';
import * as css from './TVAddStyles';
import { dmSearchTVByTitle } from '../../../dataModel';

import TVAddResults from './TVAddResults';

class TVAdd extends React.Component {

  _onAddSearch = (value) => {
    this.props.history.push(`/tv/add/${value}`);
  }
  
  render() { 
    const Add = Input.Search;
    // console.log('TVAdd Props', this.props);
    
    return (
      <div className={css.TVAddWrapper}>
        <Add 
          placeholder="Type Show to Add" 
          onSearch={this._onAddSearch}
          enterButton
          autoFocus
        />
        <Route 
          path="/tv/add/:searchTerm" 
          render={(props) => <TVAddResults {...props} startAddTVShow={this.props.startAddTVShow} />}
          />
        
      </div>
    );
  }
}

export default TVAdd;

// render={() => <TVAddResults addTVShow={this.props.startAddTVShow} searchTerm={this.props.match.params.searchTerm} />} 