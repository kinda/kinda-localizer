'use strict';

let _ = require('lodash');
let KindaObject = require('kinda-object');
let Locale = require('./locales');
let Common = require('./locales/common');
let English = require('./locales/english');
let French = require('./locales/french');

let KindaLocalizer = KindaObject.extend('KindaLocalizer', function() {
  this.creator = function(options = {}) {
    this.locales = [];
    if (options.locales) {
      for (let locale of options.locales) {
        this.addLocale(locale);
      }
    }
  };

  this.addLocale = function(locale) {
    this.locales.push(locale);
  };

  this.getLocale = _.memoize(function(codes) {
    // TODO: make a smarter locale code resolution...
    if (!_.isArray(codes)) codes = [codes];
    let locale;
    let code = codes[0]; // TODO: should consider every items in the array
    if (code) locale = _.find(this.locales, 'code', code);
    if (!locale) locale = this.locales[0];
    if (!locale) throw new Error('locale not found');
    return locale;
  });
});

KindaLocalizer.Locale = Locale;
KindaLocalizer.Common = Common;
KindaLocalizer.English = English;
KindaLocalizer.French = French;

module.exports = KindaLocalizer;
