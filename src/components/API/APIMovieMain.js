import React, { useState, useEffect } from 'react';
import styled, { css } from 'react-emotion/macro';
import { initTMDB, 
        getConfig, searchMovieByTitle, getMovieImages, 
        getMovieDetails, getPersonDetails_Movie } from '../../api'
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

const APIMovieMain = (props) => {
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
    searchMovieByTitle: {
      func: fuctionFactory(searchMovieByTitle),
      parms: ['title']
    }, 
    getMovieImages: {
      func: fuctionFactory(getMovieImages),
      parms: ['showId']
    }, 
    getMovieDetails: {
      func: fuctionFactory(getMovieDetails),
      parms: ['showId']
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
          <li><SidebarLink onClick={() => setLoc('searchMovieByTitle')}>Search Movie By Title</SidebarLink></li>
          <li><SidebarLink onClick={() => setLoc('getMovieDetails')}>Get Movie Details</SidebarLink></li>
          <li><SidebarLink onClick={() => setLoc('getMovieImages')}>Get Movie Images</SidebarLink></li>
          <li><SidebarLink onClick={() => setLoc('getPersonDetails_Movie')}>Get Person Details (Movies)</SidebarLink></li>
        </SidebarItems>
      </Sidebar>
      {loc && <APICall location={loc} apiCallFunction={API_ParmsObj[loc].func} parms={[...API_ParmsObj[loc].parms]}/>}
    </Wrapper>
  )
};

export default APIMovieMain;