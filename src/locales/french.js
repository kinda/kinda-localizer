'use strict';

let Common = require('./common');

let French = Common.extend('French', {
  code: 'fr',
  percentFormat: '0.[00] %',
  currencySymbolPosition: 'after',
  shortDateFormat: 'DD/MM/YY',
  mediumDateFormat: 'DD/MM/YYYY',
  flexibleDateFormatForParsing: 'D/M/YYYY',
  longDateFormat: 'D MMMM YYYY',
  fullDateFormat: 'dddd D MMMM YYYY',
  shortTimeFormat: 'HH:mm',
  mediumTimeFormat: 'HH:mm:ss',
  longTimeFormat: 'HH:mm:ss (Z)'
});

module.exports = French;
