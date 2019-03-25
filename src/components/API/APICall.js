import React, { useState } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs"
import styled, { css, keyframes } from 'react-emotion/macro';


const Wrapper = styled.div`
  display: flex;
  flex-direction: columns;

`;

const APICall = ({ location, funcs, API_ParmsObj }) => {
  let [config, setConfig] = useState()
  let [input, setInput] = useState()
  let CallJSX = null;
  let parms = API_ParmsObj[location].parms;
  let funcCall = API_ParmsObj[location].func;

  let functionButton2 = (parmObject) => {
    let parmArray = []
    console.log('parmobject', parmObject)
    Object.keys(parmObject).forEach(parm => {
      
      parmArray.push(parmObject[parm])
    })
    console.log('parm array', ...parmArray)
    return location ? 
    <React.Fragment>
      <button onClick={async () => setConfig(await funcCall(...parmArray))}>Call API</button>
    </React.Fragment>
  : null;
  }

  let inputArray = []
  if(parms.length) {
    inputArray = parms.map((parm, idx) => {
      return (
        <input value={input[parm]} onChange={(e) => setInput(inputs => {
          console.log ('inputs', inputs)
          return {[parm]: e.target.value}
        })} />
      )
    })
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
        {functionButton2(input)}
      </div>;
      break;
    default:

  }
  return (
    <Wrapper>
      {CallJSX}
      
      {inputArray || null}
      <div style={{display: "block"}}>Results</div>
      {config ? config.apiCall : null}
    </Wrapper>
  )
};

export default APICall;