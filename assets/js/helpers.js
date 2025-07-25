const { SafeString } = require('handlebars');

     module.exports = function (Handlebars) {
         Handlebars.registerHelper('eq', function (value1, value2, options) {
             return value1 === value2 ? options.fn(this) : options.inverse(this);
         });
     };