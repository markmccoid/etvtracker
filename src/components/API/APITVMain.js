import React, { useState } from 'react';
import styled, { css } from 'react-emotion/macro';
import { getConfig, searchTVByTitle, getEpisodes, getShowDetails,
         getShowImages } from '../../api/TMDBApi'
import APICall from './APICall';

const Wrapper = styled.div`
  display: flex;

`;

const Sidebar = styled.div`
  width: 150px;
`;

const SidebarItems = styled.div`
  list-style: none;
`;
const SidebarLink = styled.a`
  display: inline-block;
  width: 150px;
  padding: 5px;
  background: lightgray;
  color: black;
  border: 1px solid black;
  border-top: none;
  &:hover {
    background: gray;
    color: white;
  }
`;

// returns a function that will accept 0 to n arguments
const fuctionFactory = (fn) => {
  let callFunction = async (...rest) => {
    console.log('ARGS',  rest)
    const results = await fn(...rest);
    return results;
  }
  return callFunction;
}

const APITVMain = (props) => {
  let [loc, setLoc] = useState()

  let API_ParmsObj = {
    getConfig: {
      func: fuctionFactory(getConfig),
      parms: []
    },
    searchTVByTitle: {
      func: fuctionFactory(searchTVByTitle),
      parms: ['title']
    }, 
    getEpisodes: {
      func: fuctionFactory(getEpisodes),
      parms: ['showId', 'seasonNum']
    }, 
    getShowDetails: {
      func: fuctionFactory(getShowDetails),
      parms: ['showId']
    }, 
    getShowImages: {
      func: fuctionFactory(getShowImages),
      parms: ['showId']
    }
  }
  return (
    <Wrapper>
      <Sidebar>
        <SidebarItems>
          <li><SidebarLink onClick={() => setLoc('getConfig')}>Get Config</SidebarLink></li>
          <li><SidebarLink onClick={() => setLoc('searchTVByTitle')}>Get TV Info</SidebarLink></li>
          <li><SidebarLink onClick={() => setLoc('getEpisodes')}>Get Episode Info</SidebarLink></li>
          <li><SidebarLink onClick={() => setLoc('getShowDetails')}>Get Show Details</SidebarLink></li>
          <li><SidebarLink onClick={() => setLoc('getShowImages')}>Get Show Images</SidebarLink></li>
        </SidebarItems>
      </Sidebar>
      {loc && <APICall location={loc} apiCallFunction={API_ParmsObj[loc].func} parms={[...API_ParmsObj[loc].parms]}/>}
    </Wrapper>
  )
};

export default APITVMain;