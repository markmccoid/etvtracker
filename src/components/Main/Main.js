import React from 'react';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';

import { startLogout } from '../../store/auth';
import { startAddTVShow } from '../../store/tvShows';

import Header from '../Header/Header';
import TVContainer from '../TV/TVContainer';
import TVAdd from '../TV/Add/TVAdd';
import APIContainer from '../API/APIContainer';
import SidebarContainer from '../Sidebar/SidebarContainer';
import TVTagEditor from '../Tags/TVTagEditor';
import { MainGrid } from './Style';

class Main extends React.Component {
  render() {
    return (
      <div>
        <Header startLogout={this.props.startLogout}/>      
        <div style={{height: "15px"}}></div>
        <MainGrid>
          <Route path="/tv" component={SidebarContainer} />
          <Route path="/tv/detail/:id" component={TVContainer} />
          <Route path="/tv/add" render={(props) => <TVAdd {...props} startAddTVShow={this.props.startAddTVShow} />} />
        </MainGrid>
          <Route path="/tvtags" component={TVTagEditor} />
          <Route path="/api" component={APIContainer} />
      </div>
    )
  }
}

export default connect(null, { startLogout, startAddTVShow })(Main);
