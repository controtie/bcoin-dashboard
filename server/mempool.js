'use strict';

const bcoin = require('bcoin');
const config = require('../setup/setupUtils').getConfig();
const WSResponse = require('./utils').WSResponse;

const Mempool = bcoin.mempool;
const Pool = bcoin.pool;

const chain = require('./blockchain').Chain;
const mempool = new Mempool({ chain });

const pool = new Pool({
  chain,
  mempool,
  maxPeers: 8,
  port: config.port,
  publicPort: config.publicPort,
});

const MempoolStream = (ws) => {
  const mempoolstream = Object.create(MempoolStreamMethods);
  mempoolstream.ws = ws;
  mempoolstream.mempool = mempool;
  return mempoolstream;
}

const MempoolStreamMethods = {};

MempoolStreamMethods.open = async function() {
  this.ws.send(WSResponse('text', 'Opening MempoolStream'));

  await pool.open();
  await pool.connect();
  pool.startSync();

  mempool.on('tx', (tx) => {
    let response = WSResponse('mempool', tx);
    console.log('saw new tx', tx);
    this.ws.send(response, (err) => {
      if (err) {
        console.log('ERROR MEMPOOL:', err);
      }
    });
  });
  return;
}

module.exports = MempoolStream;

