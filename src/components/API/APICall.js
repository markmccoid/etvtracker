import React, { useState, useEffect, useRef } from 'react';
//import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs"
import styled, { css, keyframes } from 'react-emotion/macro';
import ReactJson from 'react-json-view';


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 25px;
`;
const Input = styled.input`
  margin-top: 5px;
`;

let getInitialState = (parms) => {
  console.log("in INITIAL STATE")
  let parmsState = [];
  parms.forEach(parm => {
    parmsState.push({
      value: ''
    }) 
  })
  return parmsState;
}

const APICall = ({ location, apiCallFunction, parms }) => {
  let [config, setConfig] = useState(null);
  let [fields, setFields] = useState();

  useEffect(() => {
    // Set the intitial state to an array of objects with one object for each
    // argument.  Need this so that setFields call will have something to set.
    setFields(getInitialState(parms))
    setConfig(null)
  }, [parms])
  
  // update the proper argument entry with what the input field that was updated
  function handleChange(idx, event) {
    const values = [...fields];
    values[idx].value = event.target.value;
    setFields(values);
  }
// need to make sure that getInitialState has updated our state field before rendering/building input fields
  let doRender = fields ? fields.length === parms.length : false;
  return (
    <Wrapper>
      <div>
        {location} API Call
      </div>
      {// Render input fields based on parms passed
      }
      {doRender  && parms.map((field, idx) => {
          return (
            <React.Fragment key={idx}>
              <label>{field}</label>
              <Input
                value={fields[idx].value}
                onChange={e => handleChange(idx, e)}
              />
            </React.Fragment>
          )
        })
      }
      <button 
        onClick={async () => setConfig(await apiCallFunction(...fields.map(field => field.value)))}
      >
        Call API
      </button>
      <div style={{display: "block"}}>Results</div>
      {config ? config.apiCall : null}
      {config && 
        <ReactJson 
          src={config.data} 
          theme="monokai" 
          collapseStringsAfterLength={50} 
          indentWidth={2}
        />
      }
      {/* {config && Object.keys(config.data).map((dataKey) => {
        console.log('dataKey', dataKey)
        
        if (typeof config.data[dataKey] === 'object') {
          return Object.keys(config.data[dataKey]).map(subKey => {
            console.log(`${subKey} : ${JSON.stringify(config.data[dataKey][subKey], null, 4)}`)
            return <div>{subKey} : {JSON.stringify(config.data[dataKey][subKey], null, 4)}</div>
          })
        } else {
          console.log(JSON.stringify(config.data[dataKey], null, 4))
          return (<p>{dataKey}: {config.data[dataKey]}</p>)
        }
        
      })} */}
    </Wrapper>
  )
};

export default APICall;


// let [config, setConfig] = useState();
//   let [input, setInput] = useState({showId: '', seasonNum: ''});
//   let CallJSX = null;
//   let parms = API_ParmsObj[location].parms;
//   let funcCall = API_ParmsObj[location].func;
// console.log('API Call input', input)
  
// let functionButton2 = (parmObject) => {
//     let parmArray = []
//     console.log('FB2 - parmobject', parmObject)
//     Object.keys(parmObject).forEach(parm => {
//       parmArray.push(parmObject[parm])
//     })
//     console.log('FB2 - parm array', ...parmArray)
//     return location ? 
//     <React.Fragment>
//       <button onClick={async () => setConfig(await funcCall(...parmArray))}>Call API</button>
//     </React.Fragment>
//   : null;
//   }

//   let createInputs = (parms) => {
//     let inputArray = []
//     if(parms.length) {
//       inputArray = parms.map((parm, idx) => {
//         console.log('INARRAY - inputArray', inputArray)
//         return (
//           <input value={input[parm]} onChange={(e) => setInput(inputs => {
//             return {...inputs, [parm]: e.target.value}
//           })} />
//         )
//       })
//     }
//     return inputArray;
//   }

//   switch (location) {
//     case 'getConfig': 
//       CallJSX = <div>Config Call
//         {functionButton2()}
//       </div>;
//       break;
//     case 'searchTVByTitle': 
//       CallJSX = <div>Search by TV Title Call
//         {functionButton2(input)}
//       </div>;
//       break;
//     case 'getEpisodes': 
      
//       CallJSX = <div>Get Episodes
//         {createInputs(API_ParmsObj[location].parms)}
//         {functionButton2(input)}
//       </div>;
//       break;
//     default:
//   }