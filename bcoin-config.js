module.exports = {
  // Network
  prefix: '/Volumes/DylansBackup/.bcoin/regtest',
  network: 'regtest',
  db: 'leveldb',
  useWorkers: true,

  // Chain
  coinCache: 30000000,
  query: true,
  prune: false,
  checkpoints: true,
  entryCache: 5000,

  // Mempool
  mempoolSize: 200000000,
  limitFree: true,
  limitFreeRelay: 15,
  rejectAbsurdFees: true,
  replaceByFee: false,
  persistentMempool: false,

  // Pool
  selfish: false,
  compact: true,
  bip37: false,
  bip151: true,
  listen: true,
  maxOutbound: 8,
  maxInbound: 30,

  // Logs
  logLevel: 'debug',
  logFile: true,

  // HTTP
  apiKey: 'bikeshed',
  httpHost: '::',
  port: 48333,
  publicPort: 48444,

};

