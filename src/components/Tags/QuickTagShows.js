import React from 'react';
import * as css from './styles';

import QuickTagItem from './QuickTagItem';
import { getTagDataArray } from '../../store/tvShows';

// -------------------------------------------------
// Component that builds list of shows to allow
// users to quickly tag them
// -------------------------------------------------
class QuickTagShows extends React.Component {
  _buildTagArray = (showId, tagData) => {
    return getTagDataArray(showId, tagData);
  }
  render() {
    return (
      <div>
        {this.props.showData.map(show => {
          let tagShowData = this._buildTagArray(show.showId, this.props.tagData);
            return (
              <QuickTagItem 
                key={show.showId}
                show={show}
                tagShowData={tagShowData}
                actionCreators={this.props.actionCreators}
              />
            )
          })
        }
      </div>
    )
  }
}

export default QuickTagShows;

