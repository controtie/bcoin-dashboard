'use strict';

const bcoin = require('bcoin');
const Chain = bcoin.chain;
const config = require('../setup/setupUtils').getConfig();
const WSResponse = require('./utils').WSResponse;
const rhash = require('./utils').rhash;

const chain = new Chain({
  db: config.db,
  location: config.prefix + '/chain',
  network: config.network,
});

const ChainStream = (ws) => {
  const chainstream = Object.create(ChainStreamMethods);
  chainstream.ws = ws;
  chainstream.chain = chain;
  return chainstream;
}

const ChainStreamMethods = {};

ChainStreamMethods.open = async function() {
  await chain.open();
  this.ws.send(WSResponse('text', `Current chain tip at ${chain.tip.height}`));

  let latestBlocks = await this.getLatestBlocks(chain.tip.height);
  this.ws.send(WSResponse('block', latestBlocks));
}

ChainStreamMethods.getLatestBlocks = async function(currentHeight) {
  const blocks = []; // blocks are stored in 'ChainDB' as 'ChainEntry's
  if (currentHeight > 5) {
    await async function() {
      let retrieveBlockHeight = currentHeight - 10;
      while (retrieveBlockHeight <= currentHeight) {
        let entry = await chain.db.getEntry(retrieveBlockHeight);
        blocks.push(entry);
        retrieveBlockHeight++;
      }
    }();
  }
  return blocks;
}

ChainStreamMethods.listen = function() {
  this.ws.send(WSResponse('text', 'Listening for new blocks'));
  this.chain.on('block', (block) => {
    let response = WSResponse('block', block)
    this.ws.send(response);
  });
}

ChainStreamMethods.getBlock = async function(hash) {
  const reversedHash = rhash(hash);
  const block = await this.chain.db.getBlock(reversedHash);
  const blockHeight = await this.chain.db.getHeight(reversedHash);
  const blockWithHeight =
    Object.assign({}, JSON.parse(JSON.stringify(block)), { height: blockHeight });
  this.ws.send(WSResponse('block-detail', blockWithHeight));
}

module.exports = {
  ChainStream,
  Chain: chain,
}

/*
 * serve from cache so chain is shared across
 */
