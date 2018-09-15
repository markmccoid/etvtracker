import React from 'react';
import { connect } from 'react-redux';

import { getAllShowData,
  getSidebarData,
  getTagFilterData,
  addTagToFilter,
  removeTagFromFilter } from '../../../store/tvShows';

class TVCoverViewContainer extends React.Component {
  render() {
    console.log('andflag', this.props.andFlag)
    return (
      this.props.children({
          showDataArray: this.props.sidebarData,
          tagFilterData: this.props.tagFilterData,
          addTagToFilter: this.props.addTagToFilter,
          removeTagFromFilter: this.props.removeTagFromFilter,
          andFlag: this.props.andFlag,
        })
    )
  }
}

const mapStateToProps = (state) => {
  return {
    showDataArray: getAllShowData(state.TV.showData),
    sidebarData: getSidebarData(state.TV.showData, 
      state.TV.searchData.searchTerm, 
      state.TV.tagData,
      state.TV.searchData.tagFilters,
      state.TV.searchData.andFlag,
      state.TV.searchData.excludeTagFilters
    ),
    tagFilterData: getTagFilterData(state.TV.tagData, state.TV.searchData.tagFilters),
    andFlag: state.TV.searchData.andFlag
  }
}
export default connect(mapStateToProps, {
  addTagToFilter,
  removeTagFromFilter
})(TVCoverViewContainer);

//! showDataArray layout
// backdropPath: "https://image.tmdb.org/t/p/w300/ilKE2RPD8tkynAOHefX9ZclG1yq.jpg"
// firstAirDate: 1317787200000
// genres: ["Drama", "Mystery", "Sci-Fi & Fantasy"]
// lastAirDate: 1510635600000
// lastRefresh: 1535841228050
// name: "American Horror Story"
// nextEpisodeDate: 1536724800000
// nextEpisodeName: "The End"
// nextEpisodeNumber: 1
// nextEpisodeSeason: 8
// nextEpisodeType: "Next"
// overview: "An anthology horror drama series centering on different characters and locations, including a house with a murderous past, an asylum, a witch coven, a freak show, a hotel, a farmhouse in Roanoke and a cult."
// posterPath: "https://image.tmdb.org/t/p/w300/7htwyZzjIUFIIkGQ6HhMgv2kVmM.jpg"
// showId: 1413
// status: "Returning Series"
// totalEpisodes: 87
// totalSeasons: 8


// import React from 'react';
// import { connect } from 'react-redux';

// import TVCoverItem from './TVCoverItem';

// import { getAllShowData } from '../../../store/tvShows';

// class TVCoverViewContainer extends React.Component {
//   render() {
//     console.log('CV', this.props.showDataArray)
//     return (
//       <div style={{ display: "flex"}}>
//       {this.props.showDataArray.map(show => {
//         return (
//           <TVCoverItem key={show.showId} show={show} />
//         )
//       })}
//     </div>)
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     showDataArray: getAllShowData(state.TV.showData)
//   }
// }
// export default connect(mapStateToProps)(TVCoverViewContainer);