'use strict';

let Common = require('./common');

let EnUS = Common.extend('EnUS', {
  code: 'en-US',
  percentFormat: '0.[00]%',
  currencyFormat: '$0,0.00',
  currencySymbol: '$',
  shortDateFormat: 'MM/DD/YY',
  mediumDateFormat: 'MM/DD/YYYY',
  flexibleDateFormatForParsing: 'M/D/YYYY',
  longDateFormat: 'MMMM D, YYYY',
  fullDateFormat: 'dddd, MMMM D, YYYY',
  shortTimeFormat: 'HH:mm A',
  mediumTimeFormat: 'HH:mm:ss A',
  longTimeFormat: 'HH:mm:ss A (Z)'
});

module.exports = EnUS;
