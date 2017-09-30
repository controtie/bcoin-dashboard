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


class MempoolStream {
  constructor(props) {
    this.ws = props;
    this.ws.send(WSResponse('text', 'Constructing new MempoolStream'));
  }
  async open() {
    this.ws.send(WSResponse('text', 'Opening MempoolStream'));

    await pool.open();
    await pool.connect();
    pool.startSync();

    this.ws.send(WSResponse('text', 'MempoolStream ready'));

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

