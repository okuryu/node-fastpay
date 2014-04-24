# node-fastpay

[![NPM version](https://badge.fury.io/js/fastpay.svg)](http://badge.fury.io/js/fastpay)
[![Build Status](https://travis-ci.org/okuryu/node-fastpay.svg?branch=master)](https://travis-ci.org/okuryu/node-fastpay)
[![Dependency Status](https://gemnasium.com/okuryu/node-fastpay.svg)](https://gemnasium.com/okuryu/node-fastpay)
[![Coverage Status](https://coveralls.io/repos/okuryu/node-fastpay/badge.png?branch=master)](https://img.shields.io/coveralls/okuryu/node-fastpay.svg)

FastPay for Node.js.

## Getting started

Install to using NPM.

```
$ npm install fastpay
```

All functions of `fastpay` object passes the data via callbacks.
Callbacks has the error and response data via the [request](https://github.com/mikeal/request) module.

```js
var fastpay = require("fastpay");

fastpay("YOUR_API_KEY", function (err, res, body) {
    if (!err && res.statusCode === 200) {
        console.log(body);
    }
});
```

## Create a charge

```js
fastpay("YOUR_API_KEY").create({
    amount: 1000,
    card: "YOUR_CARD_ID"
}, function (err, res, body) {
    if (!err && res.statusCode === 200) {
        console.log(body);
    }
});
```

## Retrieve a charge

```js
fastpay("YOUR_API_KEY").retrieve("YOUR_CHARGE_ID", function (err, res, body) {
    if (!err && res.statusCode === 200) {
        console.log(body);
    }
});
```

## Refund a charge

```js
fastpay("YOUR_API_KEY").refund("YOUR_CHARGE_ID", function (err, res, body) {
    if (!err && res.statusCode === 200) {
        console.log(body);
    }
});
```

## Capture a charge

```js
fastpay("YOUR_API_KEY").capture("YOUR_CHARGE_ID", function (err, res, body) {
    if (!err && res.statusCode === 200) {
        console.log(body);
    }
});
```

## Retrieve all charge

```js
fastpay("YOUR_API_KEY").all({
    count: 1
}, function (err, res, body) {
    if (!err && res.statusCode === 200) {
        console.log(body);
    }
});
```

## More details to use FastPay

All the stuff in [FastPay official documents](https://fastpay.yahoo.co.jp/docs).

## Testing

`npm test` runs liting and testing scripts.

```
$ npm install
$ npm test
```

Finally the code coverage report will be generated.

## Contributing

See the [CONTRIBUTING.md](CONTRIBUTING.md).

## Author

| ![](https://s.gravatar.com/avatar/533a232628640bc2635e6d6e0fcb2528?s=80) |
| --- |
| [Ryuichi Okumura](http://www.okuryu.com/) |

## License

This module is available under the [BSD license](LICENSE).

The [request](https://github.com/mikeal/request) module is available under the Apache License 2.0.
