'use strict';

let _ = require('lodash');
let KindaObject = require('kinda-object');
let Locale = require('./locale');

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
    let code = codes[0]; // TODO: should consider every items in the array
    if (!code) throw new Error('locale code is missing');
    let locale = _.find(this.locales, 'code', code);
    if (!locale) throw new Error(`locale '${code}' not found`);
    return locale;
  });
});

KindaLocalizer.Locale = Locale;

module.exports = KindaLocalizer;
