import React, { useEffect, useState } from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@reach/tabs"
import styled, { css } from 'react-emotion/macro';
import { getConfig, searchTVByTitle } from '../../api/TMDBApi'
import APITVMain from './APITVMain';

const MyTab = styled(Tab)`
  background: white;
  color: black;
`;

const callGetConfig = async () => {
  const results = await getConfig()
  console.log('API Results', results)
  return results
}
const APIContainer = (props) => {
  console.log('api props', props)
  let [config, setConfig] = useState()
  useEffect(async () => {
    const results = await callGetConfig()
    setConfig(results)
  }, [])
  console.log(config)
  return (
    <div>
      <h3> API Explorer</h3>
        <Tabs className={css`
          margin: 10px;
          padding: 5px;
          border: 1px solid gray;
        `}>
          <TabList style={{background: "gray"}}>
            <MyTab>TV API</MyTab>
            <MyTab>Movie API</MyTab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <APITVMain />
            </TabPanel>
            <TabPanel>
              Dos
            </TabPanel>
          </TabPanels>
        </Tabs>
      <button onClick={callGetConfig}>GetConfig</button>
      <p>{config && config.apiCall}</p>
    </div>
  )
}
// class APIContainer extends React.Component {


//   render() {
//     return (
//       <div>
//         <h3>API Container</h3>
     
//       </div>
//     );
//   }
// }

export default APIContainer;

{/* <ToggleRender>
{({on, toggle }) => (
  <React.Fragment>
    <Switch on={on} onClick={toggle}  />
    <button onClick={toggle}>{on ? 'off' : 'on'}</button>
  </React.Fragment>
)
}
</ToggleRender> */}