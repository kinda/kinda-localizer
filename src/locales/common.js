'use strict';

let _ = require('lodash');
let _numeral = require('numeral');
let _moment = require('moment-timezone');
let Locale = require('./');

let Common = Locale.extend('Common', {
  get numeral() {
    let code = this.class.code;
    if (code === 'en-US') code = 'en';
    _numeral.language(code);
    return _numeral;
  },

  formatNumber(val, format) {
    if (val == null) return undefined;
    val = this.numeral(val).format(format);
    val = this.makeSpacesUnbreakable(val);
    return val;
  },

  parseNumber(str) {
    if (!str) return undefined;
    if (!_.isString(str)) throw new Error('invalid input');
    return this.numeral().unformat(str);
  },

  number(val) {
    return this.formatNumber(val, '0,0.[000]');
  },

  percent(val) {
    return this.formatNumber(val, this.percentFormat);
  },

  currency(val, symbol = this.currencySymbol) {
    val = this.formatNumber(val, this.currencyFormat);
    if (val == null) return undefined;
    let numeralSymbol = this.numeral.languageData().currency.symbol;
    val = val.replace(numeralSymbol, symbol);
    return val;
  },

  euro(val) {
    return this.currency(val, '€');
  },

  _createMoment(date, timeZone = this.timeZone) {
    let moment = timeZone ? _moment.tz(date, timeZone) : _moment(date);
    return moment.locale(this.class.code);
  },

  _createMomentFromString(str, format, timeZone = this.timeZone) {
    let moment = (
      timeZone ?
      _moment.tz(str, format, true, timeZone) :
      _moment(str, format, true)
    );
    return moment.locale(this.class.code);
  },

  formatDate(val, format, timeZone) {
    if (val == null) return undefined;
    let moment = this._createMoment(val, timeZone);
    let str = moment.format(format);
    str = this.makeSpacesUnbreakable(str);
    return str;
  },

  parseDate(str, timeZone) {
    if (!str) return undefined;
    if (!_.isString(str)) throw new Error('invalid input');
    let moment = this._createMomentFromString(str, this.mediumDateFormat, timeZone);
    if (moment.isValid()) return moment.toDate();
    moment = this._createMomentFromString(str, this.flexibleDateFormatForParsing, timeZone);
    if (moment.isValid()) return moment.toDate();
    return undefined;
  },

  shortDate(val, timeZone) {
    return this.formatDate(val, this.shortDateFormat, timeZone);
  },

  mediumDate(val, timeZone) {
    return this.formatDate(val, this.mediumDateFormat, timeZone);
  },

  date(val, timeZone) {
    return this.mediumDate(val, timeZone);
  },

  longDate(val, timeZone) {
    return this.formatDate(val, this.longDateFormat, timeZone);
  },

  fullDate(val, timeZone) {
    return this.formatDate(val, this.fullDateFormat, timeZone);
  },

  dateRange(start, end, timeZone) {
    let result;

    let startDay = this.formatDate(start, 'D', timeZone);
    let startMonth = this.formatDate(start, 'MMMM', timeZone);
    let startYear = this.formatDate(start, 'YYYY', timeZone);
    let endDay = this.formatDate(end, 'D', timeZone);
    let endMonth = this.formatDate(end, 'MMMM', timeZone);
    let endYear = this.formatDate(end, 'YYYY', timeZone);

    let format = (date) => this.formatDate(date, 'D MMMM YYYY', timeZone);

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
    return this.formatDate(val, this.shortTimeFormat, timeZone);
  },

  mediumTime(val, timeZone) {
    return this.formatDate(val, this.mediumTimeFormat, timeZone);
  },

  time(val, timeZone) {
    return this.mediumTime(val, timeZone);
  },

  longTime(val, timeZone) {
    return this.formatDate(val, this.longTimeFormat, timeZone);
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

  makeSpacesUnbreakable(str) {
    return str.replace(/ /g, '\xa0');
  },

  getText(obj) {
    for (let code in obj) {
      if (obj.hasOwnProperty(code)) {
        if (this.class.code.startsWith(code)) return obj[code];
      }
    }
    return '';
  }
});

module.exports = Common;
