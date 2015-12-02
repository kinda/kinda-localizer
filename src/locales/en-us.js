'use strict';

let Common = require('./common');

let EnUS = Common.extend('EnUS', {
  percentFormat: '0.[00]%',
  currencyFormat: '$0,0.00',
  currencySymbol: '$',

  shortDateFormat: 'MM/DD/YY',
  mediumDateFormat: 'MM/DD/YYYY',
  flexibleDateFormatForParsing: 'M/D/YYYY',
  longDateFormat: 'MMMM D, YYYY',
  fullDateFormat: 'dddd, MMMM D, YYYY',

  onDate: 'on',
  fromDate: 'from',
  toDate: 'to',

  shortTimeFormat: 'HH:mm A',
  mediumTimeFormat: 'HH:mm:ss A',
  longTimeFormat: 'HH:mm:ss A (Z)'
});

EnUS.code = 'en-US';

module.exports = EnUS;
