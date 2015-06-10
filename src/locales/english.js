'use strict';

let Common = require('./common');

let English = Common.extend('English', {
  code: 'en',
  percentFormat: '0.[00]%',
  currencySymbolPosition: 'before',
  shortDateFormat: 'MM/DD/YY',
  mediumDateFormat: 'MM/DD/YYYY',
  flexibleDateFormatForParsing: 'M/D/YYYY',
  longDateFormat: 'MMMM D, YYYY',
  fullDateFormat: 'dddd, MMMM D, YYYY',
  shortTimeFormat: 'HH:mm A',
  mediumTimeFormat: 'HH:mm:ss A',
  longTimeFormat: 'HH:mm:ss A (Z)'
});

module.exports = English;
