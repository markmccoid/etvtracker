import moment from 'moment';

/**
 * Returns a unix timestamp to be stored.
 * 
 * @param {string} strDate - String representing a date
 * @param {string} [format='MM-DD-YYYY'] - A format string complient with the momentJS library
 *                          representing the format of the strDate
 * @returns {number} Unix timestamp
 */
export const formatDateStringForStorage = (strDate, format='YYYY-MM-DD') => {
  return moment(strDate, format).valueOf() || null;
}

/**
 * Returns a formatted string date
 * 
 * @param {string} date - Unix timestamp that was created by moment
 * @param {string} [format='MM-DD-YYYY'] - An date output format string complient with the momentJS library
 * @returns {number} Unix timestamp
 */
export const formatDateFromStorage = (date, format='MM-DD-YYYY') => {
  const formattedDate = date ? moment(date).format(format) : null;
  return formattedDate;
}