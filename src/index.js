'use strict';

let _ = require('lodash');
let KindaObject = require('kinda-object');
let Locale = require('./locales');
let Common = require('./locales/common');
let EnGB = require('./locales/en-gb');
let EnUS = require('./locales/en-us');
let FrFR = require('./locales/fr-fr');

let KindaLocalizer = KindaObject.extend('KindaLocalizer', function() {
  this.creator = function(localeClasses = [EnGB]) {
    this.localeClasses = [];
    for (let localeClass of localeClasses) {
      this.addLocaleClass(localeClass);
    }
  };

  this.addLocaleClass = function(localeClass) {
    this.localeClasses.push(localeClass);
  };

  this.findLocaleClass = _.memoize(function(codes) {
    // TODO: make a smarter locale resolution...
    if (!_.isArray(codes)) codes = [codes];
    let localeClass;
    let code = codes[0]; // TODO: should consider every items in the array
    if (code) {
      localeClass = _.find(this.localeClasses, localeClass => {
        return _.startsWith(localeClass.code, code);
      });
    }
    if (!localeClass) localeClass = this.localeClasses[0];
    return localeClass;
  });

  this.createLocale = function(codes, definition) {
    if (!this._cachedLocales) this._cachedLocales = [];
    let cachedLocale = _.find(this._cachedLocales, function(cachedLocale) {
      return _.isEqual(cachedLocale.codes, codes) && _.isEqual(cachedLocale.definition, definition);
    });
    if (cachedLocale) return cachedLocale.locale;

    let localeClass = this.findLocaleClass(codes);
    if (!localeClass) throw new Error('locale class not found');
    let locale = localeClass.create(definition);

    cachedLocale = { codes, definition, locale };
    this._cachedLocales.push(cachedLocale);

    return locale;
  };
});

KindaLocalizer.Locale = Locale;
KindaLocalizer.Common = Common;
KindaLocalizer.EnGB = EnGB;
KindaLocalizer.EnUS = EnUS;
KindaLocalizer.FrFR = FrFR;

module.exports = KindaLocalizer;
