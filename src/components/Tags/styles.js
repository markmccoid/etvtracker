import styled, { css } from 'react-emotion';

export const tagContainer = css`
  display: flex;
  flex-direction: row;
  margin: 0 25px;
`;

export const tagWrapper = css`
  display: flex;
  flex-direction: column;

`;

export const tagview = css`
  display: flex;
  flex-direction: row;
  border: 1px solid gray;
  margin-top: 10px;
`;

export const tagItem = css`
  display: flex;
  flex-direction: row;
  border: 1px solid #BDBDBD;
  align-items: center;
  width: 300px;
  padding: 5px;
  background: white;
  &:hover {
    background: gray;
  }
`;

export const deleteButton = css`
  width: 50px;
`;

export const tagName = css`
  width: 300px;
`;

//! ---------------------------------
//! Quick Tag CSS
//! ---------------------------------
export const showWrapper = css`
  display: flex;
  flex-direction: column;
  margin: 0 25px;
`;

export const QTShowWrapper = css`
  display: flex;
  flex-direction: row;
  border: 1px solid #BDBDBD;
  margin-bottom: 15px;
  border-radius: 5px 5px;
  box-shadow: 1px 1px 10px 1px;
`;

export const QTSLeft = css`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-right: 5px;
  border-right: 1px solid #BDBDBD;
  box-shadow: 1px 1px 10px 1px;
`;

export const QTSTitle = css`
  background: lightgray;
  border-bottom: 1px solid #BDBDBD;
  height: 100%;
  font-weight: bold;
  font-size: 1.2em;
  padding: 2px 5px;
`;

export const QTSRight = css`
  display: flex;
  flex-direction: column;
`;

export const QTSRightTitle = css`
  background: lightgray;
  border-bottom: 1px solid #BDBDBD;
  font-weight: bold;
  font-size: 1.2em;
  padding: 2px 5px;
`;