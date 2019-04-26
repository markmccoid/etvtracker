import React, { useState, useEffect } from 'react';
import styled, { css } from 'react-emotion/macro';
import { initTMDB, 
        getConfig, searchTVByTitle, getEpisodes, getShowDetails, getExternalIds,
        getCredits, getCreditDetails, 
        getPersonDetails, getShowImages, 
        getPersonDetails_Movie } from '../../api'
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
  // async function to initialize TMDBApi config variables
  let callInitTMDB = async () => {
    initTMDB()
      .then(_ => console.log('success'))
  }
  useEffect(() => {
    callInitTMDB()
      .then(_ => console.log('success in useeffect'))
  }, [])

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
    }, 
    getExternalIds: {
      func: fuctionFactory(getExternalIds),
      parms: ['showId']
    },
    getCredits: {
      func: fuctionFactory(getCredits),
      parms: ['showId']
    },
    getCreditDetails: {
      func: fuctionFactory(getCreditDetails),
      parms: ['creditId']
    },
    getPersonDetails: {
      func: fuctionFactory(getPersonDetails),
      parms: ['personId']
    },
    getPersonDetails_Movie: {
      func: fuctionFactory(getPersonDetails_Movie),
      parms: ['personId']
    }
  }
  return (
    <Wrapper>
      <Sidebar>
        <SidebarItems>
          <li><SidebarLink onClick={() => setLoc('getConfig')}>Get Config</SidebarLink></li>
          <li><SidebarLink onClick={() => setLoc('searchTVByTitle')}>Search TV By Title</SidebarLink></li>
          <li><SidebarLink onClick={() => setLoc('getEpisodes')}>Get Episode Info</SidebarLink></li>
          <li><SidebarLink onClick={() => setLoc('getShowDetails')}>Get Show Details</SidebarLink></li>
          <li><SidebarLink onClick={() => setLoc('getShowImages')}>Get Show Images</SidebarLink></li>
          <li><SidebarLink onClick={() => setLoc('getExternalIds')}>Get External Ids</SidebarLink></li>
          <li><SidebarLink onClick={() => setLoc('getCredits')}>Get Credits</SidebarLink></li>
          <li><SidebarLink onClick={() => setLoc('getCreditDetails')}>Get Credits Details</SidebarLink></li>
          <li><SidebarLink onClick={() => setLoc('getPersonDetails')}>Get Person Details</SidebarLink></li>
          <li><SidebarLink onClick={() => setLoc('getPersonDetails_Movie')}>Get Person Details (Movies)</SidebarLink></li>
        </SidebarItems>
      </Sidebar>
      {loc && <APICall location={loc} apiCallFunction={API_ParmsObj[loc].func} parms={[...API_ParmsObj[loc].parms]}/>}
    </Wrapper>
  )
};

export default APITVMain;