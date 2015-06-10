'use strict';

let _ = require('lodash');
let _numeral = require('numeral');
_numeral.language('fr', require('numeral/languages/fr'));
let _moment = require('moment');
let Locale = require('./');

let Common = Locale.extend('Common', {
  numeral(...args) {
    _numeral.language(this.code);
    return _numeral(...args);
  },

  formatNumeral(val, format) {
    val = this.numeral(val).format(format);
    val = this.makeSpacesUnbreakable(val);
    return val;
  },

  number(val) {
    return this.formatNumeral(val, '0,0.[000]');
  },

  percent(val) {
    return this.formatNumeral(val, '0.[00]%');
  },

  currency(val, symbol) {
    val = this.formatNumeral(val, '0,0.00');
    if (_.startsWith(val, '-')) {
      val = '-' + symbol + val.substr(1);
    } else {
      val = symbol + val;
    }
    val = this.makeSpacesUnbreakable(val);
    return val;
  },

  euro(val) {
    return this.currency(val, '€');
  },

  moment(...args) {
    return _moment(...args).locale(this.code);
  },

  formatMoment(val, format) {
    val = this.moment(val).format(format);
    val = this.makeSpacesUnbreakable(val);
    return val;
  },

  shortDate(val) {
    return this.formatMoment(val, 'MM/DD/YY');
  },

  mediumDate(val) {
    return this.formatMoment(val, 'MM/DD/YYYY');
  },

  date(val) {
    return this.mediumDate(val);
  },

  longDate(val) {
    return this.formatMoment(val, 'MMMM D, YYYY');
  },

  fullDate(val) {
    return this.formatMoment(val, 'dddd, MMMM D, YYYY');
  },

  shortTime(val) {
    return this.formatMoment(val, 'HH:mm A');
  },

  mediumTime(val) {
    return this.formatMoment(val, 'HH:mm:ss A');
  },

  longTime(val) {
    return this.formatMoment(val, 'HH:mm:ss A (Z)');
  },

  fullTime(val) {
    return this.longTime(val);
  },

  makeSpacesUnbreakable(str) {
    return str.replace(/ /g, '\xa0');
  }
});

module.exports = Common;
