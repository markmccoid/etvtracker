import { css } from 'react-emotion/macro';

export const wrapper = css`
  display: flex;
  flex-direction: column;
`;
export const titleContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 55px;
`;


export const showContainer = css`
  display: flex;
  flex-direction: row;
`;

export const imageContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 10px;
`;

export const buttonContainer = css`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 5px;
`;

export const title = css`
  font-size: 1.3rem;
  font-weight: bold;
  padding: 1rem;
`;

export const poster = css`
  box-shadow: 1px 1px 20px 4px;
`;

// --- Summary info -- Start/End, status, overview
export const summaryContainer = css`
  padding: 10px;
`;

export const showDetsContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  border: 1px solid #BDBDBD;
  padding: 5px;
  max-width: 500px;
  margin-bottom: 10px;
  @media (max-width: 900px) {
    flex-direction: column;
    padding: 0;
  }
`;

export const showDetsDetail = css`
  text-align: center;
  @media (max-width: 900px) {
    border-bottom: 2px solid black;
  }
`;
export const showDetsTitle = css`
  border-bottom: 1px solid #BDBDBD;
  font-weight: bold;
  margin: 0 5px;
  @media (max-width: 900px) {
    text-align: center;
  }
`;

export const overview = css`
  border: 1px solid #BDBDBD;
  padding: 5px;
  max-width: 500px;
  margin: 10px 0;
`;

export const summaryTitle = css`
  border-bottom: 1px solid #BDBDBD;
  font-weight: bold;
  margin: 0 5px;
`;

export const summaryDetail = css`
  margin: 0 5px;
`;
// ------------------------------------------

// ===============================
// - Image Picker
// ===============================
export const imagePickerWrapper = css`
  display: flex;
  flex-flow: wrap;
  justify-content: space-around;
  border: 1px solid #BDBDBD;
  margin-right: 10%;
`;

export const imageItem = css`
  box-shadow: 1px 1px 20px 4px;
  margin: 10px;
  &:hover {
    box-shadow: 1px 1px 20px 4px lightblue;
  }
`;

// ===============================
// - Links - TVLinks.js
// ===============================

export const linksContainer = css`
  border: 1px solid #BDBDBD;
  min-height: 35px;
  max-width: 500px;
  margin: 10px 0;
`;

export const linkWrapper = css`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  min-height: 35px;
  position: relative;
`;

export const linkAddWrapper = css`
  display: flex;
  justify-content: space-around;
  margin-left: 35px;
  width: 100%;
`;

export const displayNone = css`
  display: none;
`;

export const linkAddButton = css`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
`;

export const linkGroup = css`
  margin-left: 35px;
  padding: 5px;
  width: 40%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
