import React from 'react';
import * as S from './Style';
import { Button, Tooltip } from 'antd';
import { withRouter, Route } from 'react-router-dom';

const Header = (props) => {
  const { history, location } = props;
  return (
    <S.Container>
      <div>TV Tracker-{location.pathname}</div>
      <div>
        <Button onClick={() => history.push("/tv")}
          //disabled={location.pathname.indexOf('/tv') >= 0}
        >
          TV Shows
        </Button>
        <Route path="/tv" render={()=> {
              return (
                <Tooltip title="Add A Show">
                  <Button className={S.addShowButton} type="primary" icon="plus" shape="circle"
                    onClick={() => history.push("/tv/add")}
                  />                
                </Tooltip>
              );
            }
          }
        />
      </div>
      <Button onClick={() => history.push("/tvtags")}>Tags</Button>
      <Button onClick={() => history.push("/api")}>API Explorer</Button>
      
      <div className={S.RightContainer}>
        <div>
          <Button 
            type="primary" 
            icon="logout" 
            onClick={() => {
              props.startLogout()
              history.push("/");
            }}
          >Logout
          </Button>
        </div>
      </div>
    </S.Container>
  )
}

export default withRouter(Header);

// <S.NavContainer>
// <S.Navli>
//   <S.NavItem activeClassName="selected" to="/tv">TV Shows</S.NavItem>
//   <Button type="primary" activeClassName="selected" onClick={() => props.history.push('/tv')}>TV Shows</Button>
// </S.Navli>
// <S.Navli>
//   <S.NavItem activeClassName="selected" to="/api">API Explorer</S.NavItem>
//   <Button type="primary" activeClassName="selected" onClick={() => props.history.push('/api')}>API Explorer</Button>
// </S.Navli>
// </S.NavContainer>