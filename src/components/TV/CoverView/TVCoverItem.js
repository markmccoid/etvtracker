import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'antd';
import { Toggle } from 'react-powerplug';

import TVContainer from '../TVContainer';

const TVCoverItem = (props) => {
  const { show } = props;
  return (
    <div>
    <Toggle initial={false}>
        {({ on, toggle, set }) => {
          return (
            <div>
              {!on && 
                <Card
                  title={<Link to={`/tv/detail/${show.showId}`}>{show.name}</Link>}
                  extra={<a onClick={toggle}>Details</a>}
                  style={{ width: 300, background: "aliceblue" }}
                >
                  <div style={{ textAlign: "center"}}> <img src={show.posterPath} height="200" /></div>
                </Card>
              }
                <div>
                {on && 
                  <div style={{ background: "white", position: "absolute", top: "50%", left: "50%", zIndex: "100", transform: "translate(-50%, -30%)"}}>
                  <Card
                    title={<Link to={`/tv/detail/${show.showId}`}>{show.name}</Link>}
                    extra={<a onClick={toggle}>Close Details</a>}
                    style={{ background: "aliceblue" }}
                    bodyStyle={{display: "none"}}
                  >
                  </Card>
                    <TVContainer coverShowId={show.showId} />
                  </div>
                }

                </div>

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