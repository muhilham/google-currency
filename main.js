const cheerio = require('cheerio')
const request = require('superagent');

function converter(options) {
  return new Promise(function(resolve, reject) {
    const source = 'https://finance.google.com/finance/converter'
    const queryString = {
      a: options.amount,
      from: options.from,
      to: options.to
    }
    request
      .get(source)
      .query(queryString)
      .end(function(error, response){
        const $ = cheerio.load(response.text, {normalizeWhitespace: true})
        const fromResult = $( "select[name='from']" ).val()
        const toResult = $( "select[name='to']" ).val()
        const amountResult = $( "input[name='a']" ).val()
        const converted = $('#currency_converter_result .bld').text()

        if (!error && response.statusCode == 200) {
          resolve({
            from: fromResult,
            to: toResult,
            amount: parseFloat(amountResult),
            converted: parseFloat(converted) || parseFloat(amountResult),
            url: response.req.url
          })
        } else {
          reject(error);
        }
      })
  })
}

module.exports = converter
