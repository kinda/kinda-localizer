'use strict';

let _ = require('lodash');
let _numeral = require('numeral');
let _moment = require('moment-timezone');
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

  formatMoment(val, format, timeZone) {
    if (val == null) return undefined;
    val = this.moment(val);
    if (timeZone) val = val.tz(timeZone);
    val = val.format(format);
    val = this.makeSpacesUnbreakable(val);
    return val;
  },

  shortDate(val, timeZone) {
    return this.formatMoment(val, this.shortDateFormat, timeZone);
  },

  mediumDate(val, timeZone) {
    return this.formatMoment(val, this.mediumDateFormat, timeZone);
  },

  date(val, timeZone) {
    return this.mediumDate(val, timeZone);
  },

  longDate(val, timeZone) {
    return this.formatMoment(val, this.longDateFormat, timeZone);
  },

  fullDate(val, timeZone) {
    return this.formatMoment(val, this.fullDateFormat, timeZone);
  },

  dateRange(start, end, timeZone) {
    let result;

    let startDay = this.formatMoment(start, 'D', timeZone);
    let startMonth = this.formatMoment(start, 'MMMM', timeZone);
    let startYear = this.formatMoment(start, 'YYYY', timeZone);
    let endDay = this.formatMoment(end, 'D', timeZone);
    let endMonth = this.formatMoment(end, 'MMMM', timeZone);
    let endYear = this.formatMoment(end, 'YYYY', timeZone);

    let format = (date) => this.formatMoment(date, 'D MMMM YYYY', timeZone);

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

  shortTime(val, timeZone) {
    return this.formatMoment(val, this.shortTimeFormat, timeZone);
  },

  mediumTime(val, timeZone) {
    return this.formatMoment(val, this.mediumTimeFormat, timeZone);
  },

  time(val, timeZone) {
    return this.mediumTime(val, timeZone);
  },

  longTime(val, timeZone) {
    return this.formatMoment(val, this.longTimeFormat, timeZone);
  },

  fullTime(val, timeZone) {
    return this.longTime(val, timeZone);
  },

  shortDateTime(val, timeZone, separator = ' ') {
    if (val == null) return undefined;
    return this.shortDate(val, timeZone) + separator + this.shortTime(val, timeZone);
  },

  mediumDateTime(val, timeZone, separator = ' ') {
    if (val == null) return undefined;
    return this.mediumDate(val, timeZone) + separator + this.mediumTime(val, timeZone);
  },

  dateTime(val, timeZone, separator = ' ') {
    return this.mediumDateTime(val, timeZone, separator);
  },

  longDateTime(val, timeZone, separator = ' ') {
    if (val == null) return undefined;
    return this.longDate(val, timeZone) + separator + this.longTime(val, timeZone);
  },

  fullDateTime(val, timeZone, separator = ' ') {
    if (val == null) return undefined;
    return this.fullDate(val, timeZone) + separator + this.fullTime(val, timeZone);
  },
  
  parseDate(str) { // <------------------
    if (!str) return undefined;
    if (!_.isString(str)) throw new Error('invalid input');
    let date = this.moment(str, this.mediumDateFormat, true);
    if (date.isValid()) return date.toDate();
    date = this.moment(str, this.flexibleDateFormatForParsing, true);
    if (date.isValid()) return date.toDate();
    return undefined;
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
