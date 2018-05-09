var Converter = require('./converter.js');

var converter = new Converter(26.2, 26.8, 10);

console.log(converter.buyUs(1000));
console.log(converter.sellUs(1000));