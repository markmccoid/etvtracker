import { css } from 'react-emotion/macro';

export const seasonWrapper = css`
  max-width: 800px;
  margin-right: 10px;
  margin-bottom: 10px;
`;

// Episode CSS
export const seasonHeaderIcons = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 10px 25px 10px 0;
  border-bottom: 1px solid #aaa;
`;

export const episodeMainWrapper = css`
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid #ccc;
  &:hover {
    background: #eee;
  }
  &:last-child {
    border-bottom: 0;
  }
`
export const episodeWrapper = css`
  display: flex;
  flex-direction: row;
  align-items: center;

`;

export const episodeNumber = css`
  font-size: 1.3em;
  width: 25px;
  margin: 5px;

`;

export const episodeDetailIcon = css`
  width: 10px;
  margin-right: 10px;
  cursor: pointer;

`;

export const episodeNameDateWrapper = css`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin: 5px;
  cursor: pointer;
`;

export const episodeName = css`
  font-weight: bold;
`;

export const circle = css`
  height: 25px;
  width: 25px;
  border: 1px solid #ccc;
  border-radius: 50%;
  margin-right: 10px;
  text-align: center;
  &:hover {
    background: rgba(127, 191, 63, 0.19);
    cursor: pointer;
  }
`;
export const episodeWatchDownload = css`
  display: flex;
  margin-right: 25px;
`;

export const selected = css`
  background: #7FBF3F;
`;

export const EpDetailWrapper = css`
  display: flex;
  padding: 5px;
  background: lightslategrey;
  color: white;
  margin-left: 15px;
`;

export const epDetailImage = css`
  border: 1px solid #ccc;
  margin: 5px;
`;

export const epDetailOverview = css`
  border: 1px solid #ccc;
  margin: 5px;
  padding: 5px;
`;

// ===============================
// - Collapse Header panels
// ===============================
export const collapseHeaderWrapper = css`
  display: flex;
  justify-content: space-between;
`;

export const collapseHeaderSummary = css`
  display: flex;
  margin: 0 25px;
  justify-content: space-evenly;
`;

export const collapseHeaderSummaryDetail = css`
  padding: 0 15px;
`;

export const collapseCountWrapper = css`
  border-radius: 50%;
  border: 1px solid #aaa;
  margin: 0 15px;
  width: 50px;
  text-align: center;
`;
export const greenBackground = css`
  background: #7FBF3F;
`;
export const redBackground = css`
  background: #f5222d;
`;
// ------------------------------------
export const header = css`
  font-weight: bold;
`;

export const numWidth = css`
  width: 50px;
`;
export const nameWidth = css`
  width: 200px;
`;
export const dateWidth = css`
  width: 75px;
`;
export const checkboxWidth = css`
  width: 50px;
`;