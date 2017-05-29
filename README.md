Node.js - google
=====================


This module allows you to convert currency based on google finance converter by scraping the results. It does NOT use the Google API. **PLEASE DO NOT ABUSE THIS.**

This is not sponsored, supported, or affiliated with Google Inc.


Installation
------------

    npm install --save google-currency


API Example
-------

This prints out the value from USD to IDR.

```js
const converter = require('google-currency')

const options = {
  from: "USD",
  to: "IDR",
  amount: 1
}
converter(options).then(value => {
  console.log(value) // Return object
})
```
