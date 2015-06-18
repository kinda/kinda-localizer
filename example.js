'use strict';

// ./node_modules/.bin/babel-node example.js

let KindaLocalizer = require('./src');

let English = KindaLocalizer.English.extend('English', {
  hello(name) {
    return `Hello ${name}!`;
  }
});

let French = KindaLocalizer.French.extend('French', {
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
