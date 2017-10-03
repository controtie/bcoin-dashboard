'use strict';

const WebSocket = require('ws');
const config = require('../setup/setupUtils').getConfig();
const Mempool = require('./mempool');
const ChainStream = require('./blockchain').ChainStream;

const wss = new WebSocket.Server({ port: 8080 });
wss.on('connection', async (ws) => {
  console.log('new websocket connection opened');
  const chain = ChainStream(ws);
  await chain.open();
  await chain.listen();

  const mempool = Mempool(ws);
  await mempool.open();
  console.log('MempoolStream setup complete');

  ws.on('message', (message) => {
    const msg = JSON.parse(message);
    if (msg.type === 'block-hash') {
      chain.getBlock(msg.data);
    }
  });
});

module.exports = config;

