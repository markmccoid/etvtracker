import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { Toggle } from 'react-powerplug';

import TVContainer from '../TVContainer';

const TVCoverItem = (props) => {
  const { show } = props;
  return (
    <div>
      <Card
      title={<Link to={`/tv/detail/${show.showId}`}>{show.name}</Link>}
      extra={<a href="#">More</a>}
      style={{ width: 300 }}
      >
       <div style={{ textAlign: "center"}}> <img src={show.posterPath} height="200" /></div>
      </Card>
      <Toggle initial={false}>
        {({ on, toggle, set }) => {
            return (
              <div>
                <button onClick={toggle}>Details</button>
                {on && <TVContainer coverShowId={show.showId} />}
              </div>
            )
          }
        }
      </Toggle>
    </div>
  )
};

export default TVCoverItem;
    // <div key={show.showId} style={{ width: "200px"}}>
    //   <img src={show.posterPath} height="200"/>
    //   <Link to={`/tv/detail/${show.showId}`}>{show.name}</Link>
    // </div>