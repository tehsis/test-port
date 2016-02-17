'use strict';

const net = require('net');

module.exports = function test_port (port, host, cb) {
  cb = cb || host;
  host = typeof host === 'string' ? host : undefined;

  if ( typeof cb !== 'function' ) {
    throw new Error('You must provide a callback');
  }

  let tester = net.createConnection({port, host});

  tester.on('error', () => {
    tester.destroy();
    cb(false);
  });

  tester.on('timeout', () => {
    tester.destroy();
    cb(false);
  });

  tester.setTimeout(2000);

  tester.on('connect', () => {
    tester.destroy();
    cb(true);
  });
};

