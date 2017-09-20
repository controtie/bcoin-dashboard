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

class MempoolStream {
  constructor(props) {
    console.log('initializing new mempool stream');
    this.ws = props;
  }
  async open() {
    console.log('opening stream');
    this.ws.send('new mempool stream initialized');
    console.log('sent stuff');
    /*
    (async function() {
      console.log('opening pool');
      await pool.open();

      console.log('connecting pool');
      await pool.connect();

      console.log('syncing');
      pool.startSync();

      console.log('sync complete! listening for updates');
      chain.on('block', (block) => {
        console.log('Added block to blockchain:');
        console.log(block);
      });

      mempool.on('tx', (tx) => {
        console.log('Saw transaction:');
        console.log(tx.rhash);
      });

      pool.on('tx', (tx) => {
        console.log('Saw transaction:');
        console.log(tx.rhash);
      });
    })().catch((err) => {
      console.log(err.stack);
      process.exit(1);
    });
    */
  }
}

module.exports = MempoolStream;

/*
(async function() {
  console.log('opening pool');
  await pool.open();

  console.log('connecting pool');
  await pool.connect();

  console.log('syncing');
  pool.startSync();

  console.log('sync complete! listening for updates');
  chain.on('block', (block) => {
    console.log('Added block to blockchain:');
    console.log(block);
  });

  mempool.on('tx', (tx) => {
    console.log('Saw transaction:');
    console.log(tx.rhash);
  });

  pool.on('tx', (tx) => {
    console.log('Saw transaction:');
    console.log(tx.rhash);
  });
})().catch((err) => {
  console.log(err.stack);
  process.exit(1);
});

*/
