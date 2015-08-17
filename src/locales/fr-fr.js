'use strict';

require('numeral').language('fr-FR', require('numeral/languages/fr'));
let Common = require('./common');

let frFR = Common.extend('frFR', {
  code: 'fr-FR',

  percentFormat: '0.[00] %',
  currencyFormat: '0,0.00 $',
  currencySymbol: '€',

  shortDateFormat: 'DD/MM/YY',
  mediumDateFormat: 'DD/MM/YYYY',
  flexibleDateFormatForParsing: 'D/M/YYYY',
  longDateFormat: 'D MMMM YYYY',
  fullDateFormat: 'dddd D MMMM YYYY',

  onDate: 'le',
  fromDate: 'du',
  toDate: 'au',

  shortTimeFormat: 'HH:mm',
  mediumTimeFormat: 'HH:mm:ss',
  longTimeFormat: 'HH:mm:ss (Z)'
});

module.exports = frFR;
