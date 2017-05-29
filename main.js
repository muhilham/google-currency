let cheerio = require('cheerio')

const request = require('request');


function converter(options) {
  const from = options.from
  const to = options.to
  const amount = options.amount
  return new Promise(function(resolve, reject) {
    const url = 'https://www.google.com/finance/converter?a='+ amount +'&from='+ from +'&to=' + to
    request(url, function (error, response, body) {
      const $ = cheerio.load(body, {normalizeWhitespace: true})
      const fromResult = $( "select[name='from']" ).val()
      const toResult = $( "select[name='to']" ).val()
      const amountResult = $( "input[name='a']" ).val()
      const converted = $('#currency_converter_result .bld').text()
      if (!error && response.statusCode == 200) {
        resolve({
          from: fromResult,
          to: toResult,
          amount: amount,
          converted: parseFloat(converted),
          url: url
        })
      } else {
        reject(error);
      }
    })
  })
}

module.exports = converter
