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

  parseNumber(str) {
    if (!str) return undefined;
    if (!_.isString(str)) throw new Error('invalid input');
    return this.numeral().unformat(str);
  },

  percent(val) {
    return this.formatNumeral(val, this.percentFormat);
  },

  currency(val, symbol) {
    val = this.formatNumeral(val, '0,0.00');
    if (this.currencySymbolPosition === 'before') {
      if (_.startsWith(val, '-')) {
        val = '-' + symbol + val.substr(1);
      } else {
        val = symbol + val;
      }
    } else if (this.currencySymbolPosition === 'after') {
      val = val + ' ' + symbol;
    } else {
      throw new Error('\'currencySymbolPosition\' is missing or invalid');
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
    return this.formatMoment(val, this.shortDateFormat);
  },

  mediumDate(val) {
    return this.formatMoment(val, this.mediumDateFormat);
  },

  date(val) {
    return this.mediumDate(val);
  },

  parseDate(str) {
    if (!str) return undefined;
    if (!_.isString(str)) throw new Error('invalid input');
    let date = this.moment(str, this.mediumDateFormat, true);
    if (date.isValid()) return date.toDate();
    date = this.moment(str, this.flexibleDateFormatForParsing, true);
    if (date.isValid()) return date.toDate();
    return undefined;
  },

  longDate(val) {
    return this.formatMoment(val, this.longDateFormat);
  },

  fullDate(val) {
    return this.formatMoment(val, this.fullDateFormat);
  },

  shortTime(val) {
    return this.formatMoment(val, this.shortTimeFormat);
  },

  mediumTime(val) {
    return this.formatMoment(val, this.mediumTimeFormat);
  },

  time(val) {
    return this.mediumTime(val);
  },

  longTime(val) {
    return this.formatMoment(val, this.longTimeFormat);
  },

  fullTime(val) {
    return this.longTime(val);
  },

  makeSpacesUnbreakable(str) {
    return str.replace(/ /g, '\xa0');
  }
});

module.exports = Common;
