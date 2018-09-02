import React from 'react';
import PropTypes from 'prop-types';
import { cx } from 'react-emotion';
import { Collapse, Icon, Badge, Popover } from 'antd';
import _ from 'lodash';
import  * as css from './TVSeasonStyle';

import TVSeasonDetail from './TVSeasonDetail';

class TVSeasonContainer extends React.Component {
  constructor(props) {
    super(props);
    let lastSeasonId = this._getLatestSeason(props.seasonData);
    this.state = {
      prevActivePanelId: null,
      activePanelId: lastSeasonId,
    }
  }
  componentDidUpdate(prevProps) {

    if (prevProps.showId !== this.props.showId) {
      let lastSeasonId = this._getLatestSeason(this.props.seasonData);
      this.setState({ activePanelId: lastSeasonId })
    }
  }
  _getLatestSeason = (seasonData) => {
  // Accepts the seasonData array of objects 
  // and returns the latest season, i.e. season with greatest .number
  // converts to string as it will be used in activeKey property on Collapse component
  // and it seems to require a string to work
    let lastSeason = 0;
    let holdSeason;
    let lastSeasonId;
    for(const seasonKey in seasonData) {
      holdSeason = lastSeason;
      lastSeason = seasonData[seasonKey].number
      lastSeason = lastSeason > holdSeason ? lastSeason: holdSeason;
      // We really want the last season id.  Since we are initializing the lastSeason to zero,
      // I expect that lastSeasonId will always be initialized with the first pass.
      lastSeasonId = lastSeason > holdSeason ? seasonData[seasonKey].id: lastSeasonId;
    }
    return lastSeasonId.toString()
  }
  onSelectAll = (userField, seasonId) => {
        // Build update object for firebase update
    // { showId: {
    //    seasonId: {
    //     episodeId: {
    //       watched: true;
    //     }
    //   }
    //  }
    // }
    let seasonObj = _.find(this.props.seasonData, ['id', seasonId]);
    
    let updateObj = {
      showId: [this.props.showId],
      seasonId: [seasonId], 
      episodes: seasonObj.episodes,
      userField,
      checkboxState: true
    };

    this.props.updateAllUserFlags(updateObj)
      .then(() => this.setState(prevState => {
      //   console.log(`in then prevState ${prevState.activePanelId}, seasonId ${seasonId}`)
      //  return  { activePanelId: prevState.activePanelId !== null || prevState.activePanelId !== seasonId
      //   ? null : seasonId.toString() }
      return { activePanelId: prevState.prevActivePanelId }
      }))
  }
  render() {
    const Panel = Collapse.Panel;
    if (!this.props.seasonData) {
      return null;
    }

    return (
      <Collapse accordion
        activeKey={this.state.activePanelId} 
        className={css.seasonWrapper}
        onChange={(activePanelId) => {
            // if (activePanelId) {
              this.setState(prevState => ({ prevActivePanelId: prevState.activePanelId,
                activePanelId: activePanelId ? activePanelId.toString() : null}))
            // }
          }
        }
      >
        {this.props.seasonData.map(season => {
            {/* let watchedBG = season.totalEpisodes - season.watchedEpisodes === 0 ? css.greenBackground : css.redBackground;
            let downloadedBG = season.totalEpisodes - season.downloadedEpisodes === 0 ? css.greenBackground : css.redBackground; */}
            let watchedStyle = season.totalEpisodes - season.watchedEpisodes === 0 ? {background: "#52C41A"} : null;
            let downloadedStyle = season.totalEpisodes - season.downloadedEpisodes === 0 ? {background: "#52C41A"} : null;
            let headerJSX = (
              <div className={css.collapseHeaderWrapper}>
                <div>{season.name}</div>
                <div className={css.collapseHeaderSummary}>
                <div>
                  <Popover placement="left" 
                    title="Mark All"
                    content={<div>
                      <a onClick={() => this.onSelectAll('WATCHED', season.id)}>Watched</a><hr /> 
                      <a onClick={() => this.onSelectAll('DOWNLOADED', season.id)}>Downloaded</a></div>}
                  >
                    <div className={cx(css.circle)}>
                      <Icon type="global" />
                    </div>
                  </Popover>
                </div>
                <div style={{margin: "0 15px"}}>
                  <Badge 
                    count={season.watchedEpisodes} 
                    style={watchedStyle} 
                    offset={[5,0]} showZero={true}
                    title={`${season.watchedEpisodes} Watched Episodes`}
                  >
                      <img src="./images/watched.png" width="30" height="30"/>
                  </Badge>
                </div>
                <div style={{margin: "0 15px"}}>
                  <Badge 
                    count={season.downloadedEpisodes} 
                    style={downloadedStyle} 
                    offset={[5,0]} showZero={true}
                    title={`${season.downloadedEpisodes} Downloaded Episodes`}
                  >
                      <img src="./images/download.png" width="30" height="30"/>
                  </Badge>
                </div>
                <div style={{margin: "0 15px"}}>
                  <Badge 
                    count={season.totalEpisodes} 
                    style={{background: "#52C41A"}} 
                    offset={[5,0]} showZero={true}
                    title={`${season.totalEpisodes} Total Episodes`}
                  >
                      <img src="./images/tvtracker.png" width="30" height="30"/>
                  </Badge>
                </div>
                  {/* <div className={cx(css.collapseCountWrapper, watchedBG)}><Icon type="eye-o" /> {season.watchedEpisodes}</div> 
                  <div className={cx(css.collapseCountWrapper, downloadedBG)}><Icon type="download" /> {season.downloadedEpisodes}</div>
                  <div className={cx(css.collapseCountWrapper)}><Icon type="dashboard" /> {season.totalEpisodes}</div>*/}
                </div>
              </div>
            );
            return (
              <Panel header={headerJSX} key={season.id.toString()}>
                <TVSeasonDetail 
                  showId={this.props.showId}
                  seasonId={season.id}
                  episodes={season.episodes} 
                  updateUserEpisodeData={this.props.updateUserEpisodeData}
                  updateAllUserFlags={this.props.updateAllUserFlags}
                />
              </Panel>
            );
          })}
      </Collapse>
    );
  }
}

TVSeasonContainer.propTypes = {
  seasonData: PropTypes.array,
  showId: PropTypes.number,
  updateUserEpisodeData: PropTypes.func,
  updateAllUserFlags: PropTypes.func
};

export default TVSeasonContainer;


// antd Table
{/* <Collapse accordion className={css.seasonWrapper}>
{props.seasonData.map(season => {
  let dataSource = season.episodes.map(episode => ({
      key: `${season.id};${episode.id}`,
      num: episode.number,
      name: episode.name,
      airDate: episode.airDate,
      downloaded: '',

      watched: ''
    }));
    return (
        <Panel header={season.name} key={season.id} style={{ padding: "0px"}}>
          <Table 
            columns={columns} 
            dataSource={dataSource} 
            pagination={false}
            indentSize={0}
          />
        </Panel>
    );
  })}
</Collapse> */}