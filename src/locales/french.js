'use strict';

let Common = require('./common');

let French = Common.extend('French', {
  code: 'fr',

  percent(val) {
    return this.formatNumeral(val, '0.[00] %');
  },

  currency(val, symbol) {
    val = this.formatNumeral(val, '0,0.00');
    val = val + ' ' + symbol;
    val = this.makeSpacesUnbreakable(val);
    return val;
  },

  shortDate(val) {
    return this.formatMoment(val, 'DD/MM/YY');
  },

  mediumDate(val) {
    return this.formatMoment(val, 'DD/MM/YYYY');
  },

  longDate(val) {
    return this.formatMoment(val, 'D MMMM YYYY');
  },

  fullDate(val) {
    return this.formatMoment(val, 'dddd D MMMM YYYY');
  },

  shortTime(val) {
    return this.formatMoment(val, 'HH:mm');
  },

  mediumTime(val) {
    return this.formatMoment(val, 'HH:mm:ss');
  },

  longTime(val) {
    return this.formatMoment(val, 'HH:mm:ss (Z)');
  }
});

module.exports = French;
