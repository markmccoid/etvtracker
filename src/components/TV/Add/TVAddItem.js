import React from 'react';
import { Button } from 'antd';
import { withRouter } from 'react-router-dom';
import * as css from './TVAddStyles';


const TVAddItem = (props) => {
  const addTVShow = () => {
    const showId = props.show.id;
    props.startAddTVShow(showId)
      .then(() => props.history.push(`/tv/detail/${showId}`));
  }

  return (
    <div className={css.AddItemWrapper}>
      <div className={css.AddItemRow1}>
        <img className={css.TVImage} alt={props.show.name} src={props.show.backdropURL} />
         <div className={css.TVDetailWrapper}>
          <div className={css.TVTitle}>
            {!props.show.exists ? 
              props.show.name
            :
              <a onClick={() => props.history.push(`/tv/detail/${props.show.id}`)}>{props.show.name}</a>
            }
          </div>
          <div className={css.TVOverview}>{props.show.overview}</div>
        </div>
      </div>
      <div className={css.TVAddButton}>
        {!props.show.exists ? 
          <Button 
            type="primary" 
            icon="plus"
            onClick={addTVShow}
          >Add</Button>
          :
          <div>Show Already in Your Library - 
          <a onClick={() => props.history.push(`/tv/detail/${props.show.id}`)}>{props.show.name}</a>
          </div>
        }
      </div>
    </div>
  )
}

export default withRouter(TVAddItem);