import styled, { css } from 'react-emotion/macro';
 
 

export const MainGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 2fr) 7fr;
  grid-gap: 1em;
`;