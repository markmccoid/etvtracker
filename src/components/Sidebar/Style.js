import styled, { css } from 'react-emotion/macro';
 
 

import { NavLink } from 'react-router-dom';

export const listContainer = css`
  margin-right: 1em;
`;

export const ListItemLink = styled(NavLink)`
  cursor: pointer;
  display: block;
  padding: 10px;
  border: 0;

  text-decoration: none;
  &:hover {
    background: rgba(234,234,234, .7);
  }
  &:active {
    background: rgba(234,234,234, .7);
  }
`;

export const listItemContainer = css`
  border-bottom: 1px solid #8c8c8c;
  border-right: 1px solid #8c8c8c;
  background: linear-gradient(to right, rgba(102,184,255,1) 0%, rgba(24,144,255,1) 100%);
  &:first-child {
    border-top: 1px solid #8c8c8c;
  }
`
export const showTextContainer = css`
  border: 1px solid rgba(0,0,0,0.7);
  background: rgba(255,255,255,0.9);
`;
export const showText = css`
  padding: 0 5px;
  font-weight: bold;
  color: black;
`;

//! ---------------------------------------
//! Items
//! ---------------------------------------
export const baseNext = css`
  border-top: 1px dashed gray;
  padding: 0 5px;
`;
export const next = css`
  color: darkred;
`;

//! ---------------------------------------
//! Sidebar FILTER
//! ---------------------------------------
export const filterWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 2px;
  border: 1px solid #BDBDBD;
  border-radius: 5px;
`;
export const filterTagContainer = css`
  display: flex;
  background: white;
  border-radius: 5px;
  padding: 0 5px;
  z-index: 100;
`;
export const filterTagCloud = css`
  display: flex;
  background: white;
  border: 1px solid #BDBDBD;
  border-radius: 5px;
`;
export const excludeTitle = css`
  display: flex;
  justify-content:center;
  align-items: center;
  height: 100%;
  border: 1px solid #BDBDBD;
  border-radius: 5px;
  font-weight: bold;
`;