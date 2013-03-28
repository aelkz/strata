assert = require('assert');
strata = require('../lib');
mock = strata.mock;
utils = strata.utils;

// These globals hold the result of the last call.
status = null;
headers = null;
body = null;

call = function (app, env, callback, returnBuffer) {
  function responseHandler(err, s, h, b) {
    status = s, headers = h, body = b;
    callback(err);
  }

  mock.call(app, env, responseHandler, returnBuffer);
};

checkStatus = function (code) {
  it('returns ' + code, function () {
    assert.equal(status, code);
  });
};

checkHeader = function (name, value) {
  it('returns the proper ' + name + ' header', function () {
    assert.equal(headers[name], value);
  });
};

assert.match = function (string, pattern, message) {
  assert(string.match(pattern), message);
};

assert.empty = function (object, message) {
  assert(utils.isEmptyObject(object), message);
};
