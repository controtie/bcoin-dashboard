'use strict';

const bcoin = require('bcoin').set('testnet');
const config = require('../setup/setupUtils').getConfig();

const Chain = bcoin.chain;
const Mempool = bcoin.mempool;
const Pool = bcoin.pool;

const prefix = '/Volumes/DylansBackup/.bcoin/testnet';
const chain = new Chain({
  db: 'leveldb',
  location: prefix + '/chain',
  network: 'testnet',
});
const mempool = new Mempool({ chain });

const pool = new Pool({
  chain,
  mempool,
  maxPeers: 8,
});

const WSResponse = (type, data) => {
  return JSON.stringify({ type, data });
}

class MempoolStream {
  constructor(props) {
    console.log('constructing new MempoolStream');
    this.ws = props;
  }
  async open() {
    console.log('opening MempoolStream');
    this.ws.send(WSResponse('text', 'Opening MempoolStream'));

    await pool.open();
    await pool.connect();
    pool.startSync();

    console.log('MempoolStream ready');
    this.ws.send(WSResponse('text', 'MempoolStream ready'));

    chain.on('block', (block) => {
      console.log('Added block to blockchain:');
      console.log(block);

      let response = WSResponse('block', block);
      this.ws.send(response, (err) => {
        if (err) {
          console.log('ERROR BLOCK:', err);
        }
      });
    });

    mempool.on('tx', (tx) => {
      console.log('MEMPOOL');
      console.log(tx);

      let response = WSResponse('mempool', tx);
      this.ws.send(response, (err) => {
        if (err) {
          console.log('ERROR MEMPOOL:', err);
        }
      });
    });

    return;
  }
}

module.exports = MempoolStream;

