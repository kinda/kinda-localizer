'use strict';

let _ = require('lodash');
let KindaObject = require('kinda-object');
let Locale = require('./locales');
let Common = require('./locales/common');
let EnGB = require('./locales/en-gb');
let EnUS = require('./locales/en-us');
let FrFR = require('./locales/fr-fr');

let KindaLocalizer = KindaObject.extend('KindaLocalizer', function() {
  this.creator = function(options = {}) {
    if (!options.locales) options.locales = [EnGB.create()];
    this.locales = [];
    for (let locale of options.locales) {
      this.addLocale(locale);
    }
  };

  this.addLocale = function(locale) {
    this.locales.push(locale);
  };

  this.getLocale = _.memoize(function(codes) {
    // TODO: make a smarter locale resolution...
    if (!_.isArray(codes)) codes = [codes];
    let locale;
    let code = codes[0]; // TODO: should consider every items in the array
    if (code) {
      locale = _.find(this.locales, loc => {
        return _.startsWith(loc.code, code);
      });
    }
    if (!locale) locale = this.locales[0];
    if (!locale) throw new Error('locale not found');
    return locale;
  });
});

KindaLocalizer.Locale = Locale;
KindaLocalizer.Common = Common;
KindaLocalizer.EnGB = EnGB;
KindaLocalizer.EnUS = EnUS;
KindaLocalizer.FrFR = FrFR;

module.exports = KindaLocalizer;
