import React from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'react-emotion';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background: #FFFFFF;
  border-bottom: 3px solid #F0F0F0;
`;
export const NavContainer = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

export const Navli = styled.li`
  padding: 10px;
`;

export const NavItem = styled(NavLink)`
  border: 1px solid white;
  color: white;
  font-weight: bold;
  padding: 10px;
  text-decoration: none;
  &:hover, :active {
    color: black;
    background: white;
  }
  &.selected {
    color: black;
    background: white;
  }
`;

export const RightContainer = css`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

export const addShowButton = css`
  margin: 0 10px;
`