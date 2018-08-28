import { injectGlobal } from 'emotion';

injectGlobal`
 * {
    box-sizing: border-box;
  }

  /* antd collapse(accordian) padding override */
  .ant-collapse-content > 
  .ant-collapse-content-box {
    padding: 0;
  } 
  /* body {
    margin: 0;
    padding: 0;
    font-family: 'Ubuntu', sans-serif;
    color: white;
    background: #25274D;
  }
  a {
    cursor: pointer;
    padding: 10px;
    border: 1px solid white;
    color: white;
    text-decoration: none;
    &:hover,:active {
      color: black;
      background: white;
    }
  } */
`;