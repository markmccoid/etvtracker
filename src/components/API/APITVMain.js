import React, { useState } from 'react';
import styled, { css } from 'react-emotion/macro';
import { getConfig, searchTVByTitle, getEpisodes } from '../../api/TMDBApi'
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

const callGetConfig = async () => {
  const results = await getConfig()
  console.log('API Results getConfig', results)
  return results
}

const callSearchTVByTitle = async (title) => {
  const results = await searchTVByTitle(title)
  console.log('API Results searchTVByTitle', results)
  return results
}
const callGetEpisodes = async (showId, seasonNum) => {
  const results = await getEpisodes(showId, seasonNum)
  console.log('API Results getEpisodes', results)
  return results
}

const APITVMain = (props) => {
  let [loc, setLoc] = useState('none')
  let APIObj = {
    getConfig: callGetConfig,
    searchTVByTitle: callSearchTVByTitle
  }
  let API_ParmsObj = {
    none: {
      func: null,
      parms: []
    },
    getConfig: {
      func: callGetConfig,
      parms: []
    },
    searchTVByTitle: {
      func: callSearchTVByTitle,
      parms: ['title']
    }, 
    getEpisodes: {
      func: callGetEpisodes,
      parms: ['showId', 'seasonNum']
    }
  }
  return (
    <Wrapper>
      <Sidebar>
        <SidebarItems>
          <li><SidebarLink onClick={() => setLoc('getConfig')}>Get Config</SidebarLink></li>
          <li><SidebarLink onClick={() => setLoc('searchTVByTitle')}>Get TV Info</SidebarLink></li>
          <li><SidebarLink onClick={() => setLoc('getEpisodes')}>Get Episode Info</SidebarLink></li>
        </SidebarItems>
      </Sidebar>
      <APICall location={loc} funcs={APIObj} API_ParmsObj={API_ParmsObj}/>
    </Wrapper>
  )
};

export default APITVMain;