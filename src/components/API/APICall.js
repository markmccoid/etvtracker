import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs"
import styled, { css, keyframes } from 'react-emotion/macro';


const Wrapper = styled.div`
  display: flex;
  flex-direction: columns;

`;


let getInitialState = (API_ParmsObj, location) => {
  let parms = API_ParmsObj[location].parms;
  let parmsState = {};
  parms.forEach(parm => {
    parmsState = {
      ...parmsState,
      [parm]: ''
    }
  })
  console.log('GIS - parmsState', parmsState)
  return parmsState;
}


const APICall = ({ location, funcs, API_ParmsObj }) => {
  let [config, setConfig] = useState();
  let [input, setInput] = useState({showId: '', seasonNum: ''});
  let CallJSX = null;
  let parms = API_ParmsObj[location].parms;
  let funcCall = API_ParmsObj[location].func;
console.log('API Call input', input)
  
let functionButton2 = (parmObject) => {
    let parmArray = []
    console.log('FB2 - parmobject', parmObject)
    Object.keys(parmObject).forEach(parm => {
      parmArray.push(parmObject[parm])
    })
    console.log('FB2 - parm array', ...parmArray)
    return location ? 
    <React.Fragment>
      <button onClick={async () => setConfig(await funcCall(...parmArray))}>Call API</button>
    </React.Fragment>
  : null;
  }

  let createInputs = (parms) => {
    let inputArray = []
    if(parms.length) {
      inputArray = parms.map((parm, idx) => {
        console.log('INARRAY - inputArray', inputArray)
        return (
          <input value={input[parm]} onChange={(e) => setInput(inputs => {
            return {...inputs, [parm]: e.target.value}
          })} />
        )
      })
    }
    return inputArray;
  }

  switch (location) {
    case 'getConfig': 
      CallJSX = <div>Config Call
        {functionButton2()}
      </div>;
      break;
    case 'searchTVByTitle': 
      CallJSX = <div>Search by TV Title Call
        {functionButton2(input)}
      </div>;
      break;
    case 'getEpisodes': 
      
      CallJSX = <div>Get Episodes
        {createInputs(API_ParmsObj[location].parms)}
        {functionButton2(input)}
      </div>;
      break;
    default:

  }
  return (
    <Wrapper>
      {CallJSX}
      
      <div style={{display: "block"}}>Results</div>
      {config ? config.apiCall : null}
    </Wrapper>
  )
};

export default APICall;