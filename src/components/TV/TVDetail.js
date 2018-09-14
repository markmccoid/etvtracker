import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import * as css from './style';
import swal from 'sweetalert2';
import _ from 'lodash';

import TVLinks from './TVLinks';
import TagCloud from '../Tags/TagCloud';

const TVDetail = (props) => {
  const onDeleteShow = () => {
    //Delete alert
    swal({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      //html: `<img height="200" src=${props.showData.posterPath} />`,
      imageUrl: props.showData.posterPath,
      imageHeight: 200,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        props.routeToTV();
        props.startDeleteTVShow(props.showData.showId)
          .then(() => {
            swal(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
          });
      }
    });
  }
  if (!props.showData.showId) {
    return null;
  }
  
  let links  = props.userLinks;
  // links could be empty, so need to check if any exist
  const linksArray = !links ? [] : Object.keys(links).map(linkKey => (
    { 
      linkKey, 
      linkDescription: links[linkKey].linkDescription, 
      link: links[linkKey].link 
    }));
        
  return (
    <div className={css.wrapper}>
      <div className={css.titleContainer}>
        <div className={css.title}>
          {props.showData.name}
        </div>
      </div>
      <div className={css.showContainer}>
        <div className={css.imageContainer}>
          <img className={css.poster} height="300" src={props.showData.posterPath} />
          <div className={css.buttonContainer}>
            <Button icon="delete" type="danger" onClick={onDeleteShow}>Delete</Button>
          </div>
          <div className={css.buttonContainer}>
            <Button icon="appstore" type="primary" onClick={props.toggleImagePicker}>Pick Image</Button>
          </div>
        </div>
        <div className={css.summaryContainer}>
          <div className={css.showDetsContainer}>
            <div>
              <div className={css.showDetsTitle}>Status</div>
              <div className={css.showDetsDetail}>{props.showData.status}</div>
            </div>
            <div style={{borderRight: "1px solid #BDBDBD"}}></div>
            <div>
              <div className={css.showDetsTitle}>First Air Date</div>
              <div className={css.showDetsDetail}>{props.showData.firstAirDate}</div>
            </div>
            <div style={{borderRight: "1px solid #BDBDBD"}}></div>
            <div>
              <div className={css.showDetsTitle}>Last Air Date</div>
              <div className={css.showDetsDetail}>{props.showData.lastAirDate}</div>
            </div>
            <div style={{borderRight: "1px solid #BDBDBD"}}></div>
            <div>
              <div className={css.showDetsTitle}>Seasons</div>
              <div className={css.showDetsDetail}>{props.showData.totalSeasons}</div>
            </div>
            <div style={{borderRight: "1px solid #BDBDBD"}}></div>
            <div>
              <div className={css.showDetsTitle}>Episodes</div>
              <div className={css.showDetsDetail}>{props.showData.totalEpisodes}</div>
            </div>
          </div>
          <div className={css.overview}>
            <div className={css.summaryTitle}>Summary</div>
            <div className={css.summaryDetail}>{props.showData.overview}</div>
          </div>
          <div className={css.linksContainer}>
            <TVLinks 
              linksArray={linksArray} 
              showId={props.showData.showId} 
              addLinkToShow={props.addLinkToShow}
              removeLinkFromShow={props.removeLinkFromShow}
              linkToggle={false}
            />
          </div>
          <div className={css.overview}>
            <TagCloud tagStyle={{margin: "5px 2px"}}>
              {props.tagsArray.map(tag => {
                return (
                  <TagCloud.TagItem
                    key={tag.tagKey}
                    tagKey={tag.tagKey}
                    tagName={tag.tagName}
                    isSelected={tag.isMember}
                    onSelectTag={() => props.addTagToShow(props.showData.showId || null, tag.tagKey)}
                    onDeSelectTag={() => props.removeTagFromShow(tag.memberKey || null, tag.tagKey)}
                  />
                )
              })
              }
            </TagCloud>        
          </div>
        </div>
      </div>
    </div>
  );
};

TVDetail.propTypes = {
  showData: PropTypes.object,
  seasonData: PropTypes.array,
  extraData: PropTypes.object,
  userLinks: PropTypes.object,
  tagsArray: PropTypes.array,
  startDeleteTVShow: PropTypes.func,
  routeToTV: PropTypes.func,
  toggleImagePicker: PropTypes.func,
  addTagToShow: PropTypes.func,
  removeTagFromShow: PropTypes.func,
  addLinkToShow: PropTypes.func,
  removeLinkFromShow: PropTypes.func,
}
export default TVDetail;