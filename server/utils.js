'use strict'
const assert = require('assert');

const WSResponse = (type, data) => {
  console.log(
    `Send Data:
    Type: ${type}
    Data: ${data}`
  );
  return JSON.stringify({ type, data });
};

const rhash = (data) => {
  // reverses byte order of 256 bit input
  // taken from bcoin/utils/util.js
  let out = '';
  let i;

  assert(typeof data === 'string');

  for (i = 0; i < data.length; i += 2)
    out = data.slice(i, i + 2) + out;
  return out;
}

const bcoindashboard = {};
bcoindashboard.define = function define(name, path) {
  let cache;
  Object.defineProperty(bcoindashboard, name, {
    get() {
      if (!cache)
        cache = require(path);
      return cache;
    }
  });
};


module.exports = {
  WSResponse,
  bcoindashboard,
  rhash,
};
