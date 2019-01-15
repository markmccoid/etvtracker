export * from './dates';
// Format the apicall.  Currently just adding a '<API_KEY>'
// identifier wherever 'api_key=' is found.
export const formatAPICall = (apicall) => {
  return apicall.replace(/api_key=/, '$&<API_KEY>');
};
