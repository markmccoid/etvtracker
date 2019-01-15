import React from 'react';
import { Button, Input, Icon, Radio } from 'antd';

const SearchInput = Input.Search;

class SidebarSearch extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  _onSearchTermUpdate = (searchTerm) => {
    this.props.onSearchTermUpdate(searchTerm)
    this.inputRef.current.focus();
    //Call Search in SidebarContainer that filters redux store 
    // or should I store in redux store and always filter by that term.
  }
  render() {
    const { pathname } = this.props.history.location;

    return (
      <div>
        Date: 
        <Button size="small" shape="circle" type="primary"
          onClick={() => this.props.onSortByUpdate(this.props.sortBy === 'date-asc' ? 'date-desc' : 'date-asc')} 
        >
          <Icon type={this.props.sortBy === 'date-asc' ? "caret-up" : "caret-down"} />
        </Button>
        Name: 
        <Button size="small" shape="circle" type="primary"
          onClick={() => this.props.onSortByUpdate(this.props.sortBy === 'name-asc' ? 'name-desc' : 'name-asc')} 
        >
          <Icon type={this.props.sortBy === 'name-asc' ? "caret-up" : "caret-down"} />
        </Button>

        <SearchInput 
          ref={this.inputRef}
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