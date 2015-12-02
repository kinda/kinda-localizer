'use strict';

// ./node_modules/.bin/babel-node example.js

let KindaLocalizer = require('./src');

let EnGB = KindaLocalizer.EnGB.extend('EnGB', {
  hello(name) {
    return `Hello Sir ${name}!`;
  }
});

let EnUS = KindaLocalizer.EnUS.extend('EnUS', {
  hello(name) {
    return `Hello ${name}!`;
  }
});

let FrFR = KindaLocalizer.FrFR.extend('FrFR', {
  hello(name) {
    return `Bonjour ${name} !`;
  }
});

let localizer = KindaLocalizer.create([EnGB, EnUS, FrFR]);

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
  console.log(locale.currency(2));
  console.log(locale.currency(-0.5));
  console.log(locale.currency(1234.5678));

  console.log();
  console.log(locale.shortDate('2015-12-25T12:33:05'));
  console.log(locale.mediumDate('2015-12-25T12:33:05'));
  console.log(locale.longDate('2015-12-25T12:33:05'));
  console.log(locale.fullDate('2015-12-25T12:33:05'));

  console.log();
  console.log(locale.dateRange('2015-12-25', '2015-12-25'));
  console.log(locale.dateRange('2015-12-25', '2015-12-30'));
  console.log(locale.dateRange('2015-11-29', '2015-12-05'));
  console.log(locale.dateRange('2015-12-25', '2016-01-03'));

  console.log();
  console.log(locale.shortTime(new Date()));
  console.log(locale.mediumTime(new Date()));
  console.log(locale.longTime(new Date()));

  console.log();
  console.log('Local:', locale.longTime(new Date()));
  console.log('Paris:', locale.longTime(new Date(), 'Europe/Paris'));
  console.log('Tokyo:', locale.longTime(new Date(), 'Asia/Tokyo'));
  console.log('New York:', locale.longTime(new Date(), 'America/New_York'));

  console.log();
  console.log(locale.hello('Manu'));
};

display(localizer.createLocale('en'));
console.log();
display(localizer.createLocale('en-US'));
console.log();
display(localizer.createLocale('fr'));
