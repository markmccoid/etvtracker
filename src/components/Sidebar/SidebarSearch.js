import React from 'react';
import { Button, Input } from 'antd';

const SearchInput = Input.Search;

class SidebarSearch extends React.Component {

  _onSearchTermUpdate = (searchTerm) => {
    this.props.onSearchTermUpdate(searchTerm)
    //Call Search in SidebarContainer that filters redux store 
    // or should I store in redux store and always filter by that term.
  }
  render() {
    const { pathname } = this.props.history.location;

    return (
      <div>
        <SearchInput 
          placeholder="Find show in library" 
          onSearch={() => this._onSearchTermUpdate('')}
          onChange={(e) => this._onSearchTermUpdate(e.target.value)}
          value={this.props.searchTerm}
          enterButton="X"
        />
      </div>
      
    );
  }
}

export default SidebarSearch;

// <div>
//         <SearchInput 
//           placeholder="Find show in library" 
//           onSearch={this._onSearchTermUpdate}
//           onChange={this._onSearchTermUpdate}
//           enterButton="Search"
//         />
//       </div>