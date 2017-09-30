'use strict'

const WSResponse = (type, data) => {
  console.log(
    `Send Data:
    Type: ${type}
    Data: ${data}`
  );
  return JSON.stringify({ type, data });
};

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
};
