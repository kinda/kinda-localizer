'use strict';

let _ = require('lodash');
let KindaObject = require('kinda-object');

let Locale = KindaObject.extend('Locale', function() {
  this.creator = function(definition) {
    _.assign(this, definition);
  };
});

module.exports = Locale;
