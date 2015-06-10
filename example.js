'use strict';

// ./node_modules/.bin/babel-node example.js

let _ = require('lodash');
let _numeral = require('numeral');
_numeral.language('fr', require('numeral/languages/fr'));
let _moment = require('moment');
let KindaLocalizer = require('./src');

let Common = KindaLocalizer.Locale.extend('Common', {
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

let English = Common.extend('English', {
  code: 'en',

  hello(name) {
    return `Hello ${name}!`;
  }
});

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
  },

  hello(name) {
    return `Bonjour ${name} !`;
  }
});

let localizer = KindaLocalizer.create({
  locales: [
    English.create(),
    French.create()
  ]
});

let display = function(locale) {
  console.log(`=== ${locale.class.name} ===`);

  console.log();
  console.log(locale.number(25));
  console.log(locale.number(-88.9));
  console.log(locale.number(1234.5678));

  console.log();
  console.log(locale.percent(0.25));
  console.log(locale.percent(0.12345678));

  console.log();
  console.log(locale.euro(2));
  console.log(locale.euro(-0.5));
  console.log(locale.euro(1234.5678));

  console.log();
  console.log(locale.shortDate('2015-12-25T12:33:05'));
  console.log(locale.mediumDate('2015-12-25T12:33:05'));
  console.log(locale.longDate('2015-12-25T12:33:05'));
  console.log(locale.fullDate('2015-12-25T12:33:05'));

  console.log();
  console.log(locale.shortTime());
  console.log(locale.mediumTime());
  console.log(locale.longTime());

  console.log();
  console.log(locale.hello('Manu'));
};

display(localizer.getLocale('en'));
console.log();
display(localizer.getLocale('fr'));
