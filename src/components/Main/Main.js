import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import { startLogout } from '../../store/auth';
import { getAllShowData, startAddTVShow } from '../../store/tvShows';

import Header from '../Header/Header';
import TVContainer from '../TV/TVContainer';
import TVAdd from '../TV/Add/TVAdd';
import APIContainer from '../API/APIContainer';
import SidebarContainer from '../Sidebar/SidebarContainer';
import TVTagEditor from '../Tags/TVTagEditor';
import TVCover from '../TV/CoverView/TVCover';
import { MainGrid } from './Style';

class Main extends React.Component {
  render() {
    return (
      <div>
        <Header startLogout={this.props.startLogout} userEmail={this.props.userEmail} />      
        <div style={{height: "15px"}}></div>
        <MainGrid>
          <Route exact path="/" render={() => <Redirect to="/tv" />} />
          <Route path="/tv" component={SidebarContainer} />
          <Route path="/tv/detail/:id" component={TVContainer} />
          <Route path="/tv/add" render={(props) => <TVAdd {...props} showIds={this.props.showIds} startAddTVShow={this.props.startAddTVShow} />} />
        </MainGrid>
          <Route path="/tvtags" component={TVTagEditor} />
          <Route path="/tvcoverview" component={TVCover} />
          <Route path="/api" component={APIContainer} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    userEmail: state.auth.email,
    showIds: getAllShowData(state.TV.showData).map(show => (show.showId)),
  })
}
export default connect(mapStateToProps, { startLogout, startAddTVShow })(Main);
