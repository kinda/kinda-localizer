'use strict';

let _ = require('lodash');
let _numeral = require('numeral');
let _moment = require('moment');
let Locale = require('./');

let Common = Locale.extend('Common', {
  get numeral() {
    let code = this.code;
    if (code === 'en-US') code = 'en';
    _numeral.language(code);
    return _numeral;
  },

  formatNumeral(val, format) {
    if (val == null) return undefined;
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

  currency(val, symbol = this.currencySymbol) {
    val = this.formatNumeral(val, this.currencyFormat);
    if (val == null) return undefined;
    let numeralSymbol = this.numeral.languageData().currency.symbol;
    val = val.replace(numeralSymbol, symbol);
    return val;
  },

  // currency(val, symbol) {
  //   val = this.formatNumeral(val, '0,0.00');
  //   if (val == null) return undefined;
  //   if (this.currencySymbolPosition === 'before') {
  //     if (_.startsWith(val, '-')) {
  //       val = '-' + symbol + val.substr(1);
  //     } else {
  //       val = symbol + val;
  //     }
  //   } else if (this.currencySymbolPosition === 'after') {
  //     val = val + ' ' + symbol;
  //   } else {
  //     throw new Error('\'currencySymbolPosition\' is missing or invalid');
  //   }
  //   val = this.makeSpacesUnbreakable(val);
  //   return val;
  // },

  euro(val) {
    return this.currency(val, '€');
  },

  moment(...args) {
    return _moment(...args).locale(this.code);
  },

  formatMoment(val, format) {
    if (val == null) return undefined;
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

  dateRange(start, end) {
    let result;

    let startDay = this.moment(start).format('D');
    let startMonth = this.moment(start).format('MMMM');
    let startYear = this.moment(start).format('YYYY');
    let endDay = this.moment(end).format('D');
    let endMonth = this.moment(end).format('MMMM');
    let endYear = this.moment(end).format('YYYY');

    let format = (date) => this.formatMoment(date, 'D MMMM YYYY');

    if (startDay === endDay && startMonth === endMonth && startYear === endYear) {
      result = this.onDate + ' ' + format(start);
    } else if (startMonth === endMonth && startYear === endYear) {
      result = this.fromDate + ' ' + startDay + ' ';
      result += this.toDate + ' ' + endDay + ' ';
      result += this.makeSpacesUnbreakable(startMonth + ' ' + startYear);
    } else if (startYear === endYear) {
      result = this.fromDate + ' ';
      result += this.makeSpacesUnbreakable(startDay + ' ' + startMonth) + ' ';
      result += this.toDate + ' ' + format(end);
    } else {
      result = this.fromDate + ' ' + format(start) + ' ';
      result += this.toDate + ' ' + format(end);
    }
    return result;
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

  shortDateTime(val, separator = ' ') {
    if (val == null) return undefined;
    return this.shortDate(val) + separator + this.shortTime(val);
  },

  mediumDateTime(val, separator = ' ') {
    if (val == null) return undefined;
    return this.mediumDate(val) + separator + this.mediumTime(val);
  },

  dateTime(val, separator = ' ') {
    return this.mediumDateTime(val, separator);
  },

  longDateTime(val, separator = ' ') {
    if (val == null) return undefined;
    return this.longDate(val) + separator + this.longTime(val);
  },

  fullDateTime(val, separator = ' ') {
    if (val == null) return undefined;
    return this.fullDate(val) + separator + this.fullTime(val);
  },

  makeSpacesUnbreakable(str) {
    return str.replace(/ /g, '\xa0');
  },

  getText(obj) {
    for (let code in obj) {
      if (obj.hasOwnProperty(code)) {
        if (this.code.startsWith(code)) return obj[code];
      }
    }
    return '';
  }
});

module.exports = Common;
