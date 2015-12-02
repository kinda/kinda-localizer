'use strict';

require('numeral').language('en-GB', require('numeral/languages/en-gb'));
let Common = require('./common');

let EnGB = Common.extend('EnGB', {
  percentFormat: '0.[00]%',
  currencyFormat: '$0,0.00',
  currencySymbol: '£',

  shortDateFormat: 'DD/MM/YY',
  mediumDateFormat: 'DD/MM/YYYY',
  flexibleDateFormatForParsing: 'D/M/YYYY',
  longDateFormat: 'D MMMM YYYY',
  fullDateFormat: 'dddd, D MMMM YYYY',

  onDate: 'on',
  fromDate: 'from',
  toDate: 'to',

  shortTimeFormat: 'HH:mm',
  mediumTimeFormat: 'HH:mm:ss',
  longTimeFormat: 'HH:mm:ss (Z)'
});

EnGB.code = 'en-GB';

module.exports = EnGB;
